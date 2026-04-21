// send-push — Supabase Edge Function
// Fan-out Web Push notifications to all active subscriptions for a user.
//
// Deploy:
//   supabase functions deploy send-push --no-verify-jwt
//
// Secrets (set once):
//   supabase secrets set VAPID_PUBLIC_KEY=<public>
//   supabase secrets set VAPID_PRIVATE_KEY=<private>
//   supabase secrets set VAPID_SUBJECT=mailto:you@example.com
//   supabase secrets set SUPABASE_URL=<project url>            (auto-provided)
//   supabase secrets set SUPABASE_SERVICE_ROLE_KEY=<srk>       (auto-provided)
//
// Client calls (POST JSON):
//   {
//     "user_id": "miguel",
//     "payload": {
//       "title":  "🎯 ORDEN LONG 4H — FVG alcista",
//       "body":   "Entry $60,680 | SL $59,820 (-1.4%) | R/R 2.1:1",
//       "tag":    "fvg-4h-60680",
//       "data":   { "deepLink": "/?tab=7&id=abc123", "tradeId": "abc123" },
//       "actions":[{"action":"open_trade","title":"Abrí la orden"},
//                  {"action":"dismiss","title":"Ignorar"}]
//     }
//   }

// deno-lint-ignore-file no-explicit-any
import webpush from "https://esm.sh/web-push@3.6.7";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const VAPID_PUBLIC   = Deno.env.get("VAPID_PUBLIC_KEY")  ?? "";
const VAPID_PRIVATE  = Deno.env.get("VAPID_PRIVATE_KEY") ?? "";
const VAPID_SUBJECT  = Deno.env.get("VAPID_SUBJECT")     ?? "mailto:webpush@example.com";
const SUPA_URL       = Deno.env.get("SUPABASE_URL")              ?? "";
const SUPA_SRK       = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

const CORS = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "content-type,authorization,x-client-info,apikey",
};

function jsonResp(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS },
  });
}

if (!VAPID_PUBLIC || !VAPID_PRIVATE) {
  console.error("Missing VAPID keys — set them with `supabase secrets set`.");
}

webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC, VAPID_PRIVATE);

const supa = createClient(SUPA_URL, SUPA_SRK, {
  auth: { persistSession: false },
});

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  if (req.method !== "POST")    return jsonResp({ error: "POST only" }, 405);

  let body: any;
  try { body = await req.json(); }
  catch { return jsonResp({ error: "Invalid JSON" }, 400); }

  const userId  = String(body.user_id ?? "").trim();
  const payload = body.payload ?? null;
  if (!userId || !payload || !payload.title) {
    return jsonResp({ error: "user_id and payload.title required" }, 400);
  }

  // Fetch all active subscriptions for this user
  const { data: subs, error } = await supa
    .from("push_subscriptions")
    .select("id, endpoint, p256dh, auth")
    .eq("user_id", userId)
    .eq("is_active", true);

  if (error) return jsonResp({ error: "DB fetch failed: " + error.message }, 500);
  if (!subs || subs.length === 0) return jsonResp({ sent: 0, note: "no active subscriptions" });

  const payloadStr = JSON.stringify(payload);
  let sent = 0, failed = 0;
  const expiredIds: number[] = [];

  await Promise.all(subs.map(async (s: any) => {
    try {
      await webpush.sendNotification(
        { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } },
        payloadStr,
        { TTL: 300 }
      );
      sent++;
    } catch (e: any) {
      failed++;
      const status = e?.statusCode ?? 0;
      if (status === 404 || status === 410) expiredIds.push(s.id);
      console.error(`push failed id=${s.id} status=${status}`);
    }
  }));

  // Mark expired subscriptions inactive so next run skips them
  if (expiredIds.length > 0) {
    await supa.from("push_subscriptions")
      .update({ is_active: false, failure_count: 999 })
      .in("id", expiredIds);
  }

  return jsonResp({ sent, failed, expired: expiredIds.length });
});
