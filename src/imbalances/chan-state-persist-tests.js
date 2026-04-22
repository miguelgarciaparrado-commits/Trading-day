// chan-state-persist-tests.js — tests for channel state machine localStorage persistence
// Run: node src/imbalances/chan-state-persist-tests.js
//
// Simulates the startAlert() restoration logic and the save-on-closed-candle logic
// without a browser. Uses a mock localStorage to verify that chan_state, chan_type
// and all related fields survive a page reload within the 3-interval staleness window.

var passed = 0;
var failed = 0;

function assert(label, actual, expected) {
  var ok = actual === expected;
  if (ok) {
    console.log("  ✅ " + label);
    passed++;
  } else {
    console.error("  ❌ " + label + " — expected " + JSON.stringify(expected) + " got " + JSON.stringify(actual));
    failed++;
  }
}

// ── Mock localStorage ─────────────────────────────────────────────────────────
var _store = {};
var mockLS = {
  getItem: function(k) { return Object.prototype.hasOwnProperty.call(_store, k) ? _store[k] : null; },
  setItem: function(k, v) { _store[k] = v; },
  clear: function() { _store = {}; }
};

// ── Inline the SAVE logic (mirrors WS handler after channel block) ────────────
function saveChanState(ak, ref) {
  try {
    var czSave = {};
    var czSaveStr = mockLS.getItem("td-alert-zones");
    if (czSaveStr) czSave = JSON.parse(czSaveStr);
    czSave[ak + "chan_type"]           = ref[ak + "chan_type"];
    czSave[ak + "chan_state"]          = ref[ak + "chan_state"];
    czSave[ak + "chan_break_dir"]      = ref[ak + "chan_break_dir"];
    czSave[ak + "chan_break_line"]     = ref[ak + "chan_break_line"] || 0;
    czSave[ak + "chan_break_price"]    = ref[ak + "chan_break_price"] || 0;
    czSave[ak + "chan_confirm_ts"]     = ref[ak + "chan_confirm_ts"] || 0;
    czSave[ak + "chan_atr_at_break"]   = ref[ak + "chan_atr_at_break"] || 0;
    czSave[ak + "chan_height_at_break"]= ref[ak + "chan_height_at_break"] || 0;
    czSave[ak + "chan_retest_done"]    = ref[ak + "chan_retest_done"] || false;
    czSave[ak + "chan_break_vol_ok"]   = ref[ak + "chan_break_vol_ok"] || false;
    czSave[ak + "chan_last_updated"]   = Date.now();
    mockLS.setItem("td-alert-zones", JSON.stringify(czSave));
  } catch(e) {}
}

// ── Inline the RESTORE logic (mirrors startAlert() restoration block) ─────────
function restoreChanState(ak, ref, intervalMs, nowOverride) {
  var now = nowOverride !== undefined ? nowOverride : Date.now();
  try {
    var alZs = JSON.parse(mockLS.getItem("td-alert-zones") || "{}");
    var chanSavedTs = alZs[ak + "chan_last_updated"] || 0;
    if ((now - chanSavedTs) < intervalMs * 3) {
      ref[ak + "chan_type"]            = alZs[ak + "chan_type"] || null;
      ref[ak + "chan_state"]           = alZs[ak + "chan_state"] || null;
      ref[ak + "chan_break_dir"]       = alZs[ak + "chan_break_dir"] || null;
      ref[ak + "chan_break_line"]      = alZs[ak + "chan_break_line"] || 0;
      ref[ak + "chan_break_price"]     = alZs[ak + "chan_break_price"] || 0;
      ref[ak + "chan_confirm_ts"]      = alZs[ak + "chan_confirm_ts"] || 0;
      ref[ak + "chan_atr_at_break"]    = alZs[ak + "chan_atr_at_break"] || 0;
      ref[ak + "chan_height_at_break"] = alZs[ak + "chan_height_at_break"] || 0;
      ref[ak + "chan_retest_done"]     = alZs[ak + "chan_retest_done"] || false;
      ref[ak + "chan_break_vol_ok"]    = alZs[ak + "chan_break_vol_ok"] || false;
    }
    // else: stale — keep in-memory defaults (null/0/false)
  } catch(e) {}
}

// ── Section 1: Fresh state → no restoration (empty localStorage) ──────────────
console.log("── Section 1: Fresh start (empty localStorage) ──");
mockLS.clear();
var ak = "42_";
var ref = {};
// Defaults that startAlert() sets
ref[ak + "chan_type"]            = null;
ref[ak + "chan_state"]           = null;
ref[ak + "chan_break_dir"]       = null;
ref[ak + "chan_break_line"]      = 0;
ref[ak + "chan_break_price"]     = 0;
ref[ak + "chan_confirm_ts"]      = 0;
ref[ak + "chan_atr_at_break"]    = 0;
ref[ak + "chan_height_at_break"] = 0;
ref[ak + "chan_retest_done"]     = false;
ref[ak + "chan_break_vol_ok"]    = false;
restoreChanState(ak, ref, 3600000);
assert("fresh: chan_type = null",  ref[ak + "chan_type"],  null);
assert("fresh: chan_state = null", ref[ak + "chan_state"], null);

// ── Section 2: Save "active" state → reload within 1 interval → restored ──────
console.log("\n── Section 2: Save → reload within 1 interval (fresh) ──");
mockLS.clear();
var ref2 = {};
var ak2 = "99_";
// Simulate: channel detected, state machine moved to "active"
ref2[ak2 + "chan_type"]            = "bajista";
ref2[ak2 + "chan_state"]           = "active";
ref2[ak2 + "chan_break_dir"]       = null;
ref2[ak2 + "chan_break_line"]      = 0;
ref2[ak2 + "chan_break_price"]     = 0;
ref2[ak2 + "chan_confirm_ts"]      = 0;
ref2[ak2 + "chan_atr_at_break"]    = 250;
ref2[ak2 + "chan_height_at_break"] = 1200;
ref2[ak2 + "chan_retest_done"]     = false;
ref2[ak2 + "chan_break_vol_ok"]    = false;
// Save (as WS handler does on closed candle)
saveChanState(ak2, ref2);
// Simulate page reload: start with defaults
var ref2r = {};
ref2r[ak2 + "chan_type"]  = null;
ref2r[ak2 + "chan_state"] = null;
// Restore within same interval (now = saved + 1s)
var saved2 = JSON.parse(mockLS.getItem("td-alert-zones") || "{}")[ak2 + "chan_last_updated"];
restoreChanState(ak2, ref2r, 3600000, saved2 + 1000);
assert("active: chan_type restored",  ref2r[ak2 + "chan_type"],  "bajista");
assert("active: chan_state restored", ref2r[ak2 + "chan_state"], "active");

// ── Section 3: Save "break_pending" → reload 2 intervals later → restored ─────
console.log("\n── Section 3: break_pending → 2 intervals → restored ──");
mockLS.clear();
var ref3 = {};
var ak3 = "7_";
ref3[ak3 + "chan_type"]            = "alcista";
ref3[ak3 + "chan_state"]           = "break_pending";
ref3[ak3 + "chan_break_dir"]       = "bajista";
ref3[ak3 + "chan_break_line"]      = 45000;
ref3[ak3 + "chan_break_price"]     = 44600;
ref3[ak3 + "chan_confirm_ts"]      = 0;
ref3[ak3 + "chan_atr_at_break"]    = 800;
ref3[ak3 + "chan_height_at_break"] = 3200;
ref3[ak3 + "chan_retest_done"]     = false;
ref3[ak3 + "chan_break_vol_ok"]    = true;
saveChanState(ak3, ref3);
var saved3 = JSON.parse(mockLS.getItem("td-alert-zones") || "{}")[ak3 + "chan_last_updated"];
// Reload 2 intervals later (still within 3× window for 4h: 3×4h=12h, reload after 8h)
var intervalMs4h = 14400000;
var ref3r = { [ak3+"chan_type"]:null, [ak3+"chan_state"]:null, [ak3+"chan_break_dir"]:null, [ak3+"chan_break_line"]:0, [ak3+"chan_break_price"]:0, [ak3+"chan_confirm_ts"]:0, [ak3+"chan_atr_at_break"]:0, [ak3+"chan_height_at_break"]:0, [ak3+"chan_retest_done"]:false, [ak3+"chan_break_vol_ok"]:false };
restoreChanState(ak3, ref3r, intervalMs4h, saved3 + intervalMs4h * 2);
assert("break_pending: chan_state restored",     ref3r[ak3 + "chan_state"],         "break_pending");
assert("break_pending: chan_break_dir restored", ref3r[ak3 + "chan_break_dir"],     "bajista");
assert("break_pending: chan_break_line restored",ref3r[ak3 + "chan_break_line"],    45000);
assert("break_pending: chan_break_vol_ok true",  ref3r[ak3 + "chan_break_vol_ok"],  true);
assert("break_pending: chan_atr_at_break",        ref3r[ak3 + "chan_atr_at_break"],  800);

// ── Section 4: Save "confirmed" → reload 4 intervals later → STALE, NOT restored
console.log("\n── Section 4: confirmed → 4 intervals → stale, NOT restored ──");
mockLS.clear();
var ref4 = {};
var ak4 = "3_";
ref4[ak4 + "chan_type"]  = "bajista";
ref4[ak4 + "chan_state"] = "confirmed";
ref4[ak4 + "chan_confirm_ts"] = Date.now() - 3600000 * 4;
ref4[ak4 + "chan_break_dir"]  = "alcista";
ref4[ak4 + "chan_break_line"] = 2000;
ref4[ak4 + "chan_break_price"]= 2050;
ref4[ak4 + "chan_atr_at_break"] = 40;
ref4[ak4 + "chan_height_at_break"] = 200;
ref4[ak4 + "chan_retest_done"] = false;
ref4[ak4 + "chan_break_vol_ok"] = true;
saveChanState(ak4, ref4);
var saved4 = JSON.parse(mockLS.getItem("td-alert-zones") || "{}")[ak4 + "chan_last_updated"];
// Reload 4 intervals after save (exceeds 3× window)
var ref4r = { [ak4+"chan_type"]:null, [ak4+"chan_state"]:null };
restoreChanState(ak4, ref4r, 3600000, saved4 + 3600000 * 4);
assert("stale: chan_type NOT restored", ref4r[ak4 + "chan_type"],  null);
assert("stale: chan_state NOT restored",ref4r[ak4 + "chan_state"], null);

// ── Section 5: Multiple alerts coexist in same td-alert-zones key ─────────────
console.log("\n── Section 5: Multiple alerts coexist in localStorage ──");
mockLS.clear();
var refA = {}, refB = {};
var akA = "1_", akB = "2_";
refA[akA + "chan_type"] = "alcista"; refA[akA + "chan_state"] = "active"; refA[akA + "chan_break_dir"] = null; refA[akA + "chan_break_line"] = 0; refA[akA + "chan_break_price"] = 0; refA[akA + "chan_confirm_ts"] = 0; refA[akA + "chan_atr_at_break"] = 100; refA[akA + "chan_height_at_break"] = 500; refA[akA + "chan_retest_done"] = false; refA[akA + "chan_break_vol_ok"] = false;
refB[akB + "chan_type"] = "bajista"; refB[akB + "chan_state"] = "retested"; refB[akB + "chan_break_dir"] = "bajista"; refB[akB + "chan_break_line"] = 30000; refB[akB + "chan_break_price"] = 29500; refB[akB + "chan_confirm_ts"] = Date.now()-100; refB[akB + "chan_atr_at_break"] = 600; refB[akB + "chan_height_at_break"] = 2800; refB[akB + "chan_retest_done"] = true; refB[akB + "chan_break_vol_ok"] = true;
saveChanState(akA, refA);
saveChanState(akB, refB);
var savedAB = JSON.parse(mockLS.getItem("td-alert-zones") || "{}");
var refAr = { [akA+"chan_type"]:null, [akA+"chan_state"]:null, [akA+"chan_retest_done"]:false };
var refBr = { [akB+"chan_type"]:null, [akB+"chan_state"]:null, [akB+"chan_retest_done"]:false };
restoreChanState(akA, refAr, 3600000, (savedAB[akA + "chan_last_updated"] || 0) + 100);
restoreChanState(akB, refBr, 3600000, (savedAB[akB + "chan_last_updated"] || 0) + 100);
assert("multi: alert A chan_type",       refAr[akA + "chan_type"],        "alcista");
assert("multi: alert A chan_state",      refAr[akA + "chan_state"],       "active");
assert("multi: alert B chan_type",       refBr[akB + "chan_type"],        "bajista");
assert("multi: alert B chan_state",      refBr[akB + "chan_state"],       "retested");
assert("multi: alert B retest_done",     refBr[akB + "chan_retest_done"], true);
assert("multi: alert B break_vol_ok",    refBr[akB + "chan_break_vol_ok"],true);

// ── Section 6: null chan_state (channel lost) survives round-trip ──────────────
console.log("\n── Section 6: null state (channel lost) round-trip ──");
mockLS.clear();
var ref6 = {}, ak6 = "5_";
ref6[ak6 + "chan_type"] = null; ref6[ak6 + "chan_state"] = null; ref6[ak6 + "chan_break_dir"] = null; ref6[ak6 + "chan_break_line"] = 0; ref6[ak6 + "chan_break_price"] = 0; ref6[ak6 + "chan_confirm_ts"] = 0; ref6[ak6 + "chan_atr_at_break"] = 0; ref6[ak6 + "chan_height_at_break"] = 0; ref6[ak6 + "chan_retest_done"] = false; ref6[ak6 + "chan_break_vol_ok"] = false;
saveChanState(ak6, ref6);
var saved6 = JSON.parse(mockLS.getItem("td-alert-zones") || "{}")[ak6 + "chan_last_updated"];
var ref6r = { [ak6+"chan_type"]:"alcista", [ak6+"chan_state"]:"active" }; // stale in-memory
restoreChanState(ak6, ref6r, 3600000, saved6 + 100);
assert("null state: chan_type overwritten to null",  ref6r[ak6 + "chan_type"],  null);
assert("null state: chan_state overwritten to null",  ref6r[ak6 + "chan_state"], null);

console.log("\n" + (failed === 0
  ? "✅ All " + passed + " assertions passed."
  : "❌ " + failed + "/" + (passed + failed) + " FAILED."));
process.exit(failed > 0 ? 1 : 0);
