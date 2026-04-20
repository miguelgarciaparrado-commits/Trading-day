-- add_push_subscriptions.sql — Web Push subscription storage
-- Status: TO EXECUTE once (paste into Supabase SQL editor, review, run).
--
-- This table stores one row per device that has opted into push notifications.
-- Rows are inserted when the user clicks "Activar notificaciones push" and the
-- browser grants permission. The Edge Function `send-push` iterates all rows
-- for the user_id and POSTs to each endpoint via the Web Push protocol.

CREATE TABLE IF NOT EXISTS public.push_subscriptions (
  id           BIGSERIAL     PRIMARY KEY,
  user_id      TEXT          NOT NULL,
  endpoint     TEXT          NOT NULL UNIQUE,
  p256dh       TEXT          NOT NULL,
  auth         TEXT          NOT NULL,
  user_agent   TEXT,
  created_at   TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  last_seen_at TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  is_active    BOOLEAN       NOT NULL DEFAULT TRUE,
  failure_count INTEGER      NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_push_subs_user_active
  ON public.push_subscriptions (user_id, is_active);

-- Row Level Security: keep it simple for the single-user app.
-- For multi-user later, tighten: users can only see their own rows.
ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;

-- Permissive policy for the single-user phase — service role handles writes
-- from the Edge Function, anon key handles inserts from the PWA.
DROP POLICY IF EXISTS push_subs_all ON public.push_subscriptions;
CREATE POLICY push_subs_all ON public.push_subscriptions
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- When a subscription returns 404/410 from the push server, mark it inactive
-- instead of deleting, so we keep historical diagnostics.
COMMENT ON COLUMN public.push_subscriptions.is_active IS
  'false when push server returned 404/410 (subscription expired). Edge function filters WHERE is_active = true.';

COMMENT ON COLUMN public.push_subscriptions.failure_count IS
  'Incremented on any push delivery failure. When >= 3 and is_active = false, safe to purge.';
