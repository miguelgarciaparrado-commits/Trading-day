// tp-cascade-tests.js — Unit tests for TP cascade by timeframe
// Run: node src/imbalances/tp-cascade-tests.js
//
// Verifies: the TF menor of a multi-TF confluence dictates the TP range,
// so a 1H+1D confluence never emits a 1D-scale TP target.

// ─── FUNCTIONS UNDER TEST (lifted from trading-diary.jsx) ───

var TF_LIST_ORD=["1h","4h","1d","1w"];

function getLowestTf(tfConfs, interval) {
  for (var i = 0; i < TF_LIST_ORD.length; i++) {
    var k = TF_LIST_ORD[i];
    if (tfConfs.some(function(c){ return c.tf === k; })) return k;
  }
  return interval;
}

var TP_RANGES={"1h":{min:0.008,max:0.025},"4h":{min:0.020,max:0.05},"1d":{min:0.040,max:0.10},"1w":{min:0.080,max:0.25}};

function getTpRange(lowestTf) {
  return TP_RANGES[lowestTf] || {min:0.008, max:0.05};
}

// Simulate the TP selection logic: given a list of {price} candidates,
// return the first that fits in the range and has ratio >= 1.5, else null.
function selectTp(cands, entry, isLong, riskAmt, tpMin, tpMax) {
  for (var i = 0; i < cands.length; i++) {
    var c = cands[i];
    var pct = Math.abs(c.price - entry) / (entry || 1);
    var inRange = pct >= tpMin && pct <= tpMax;
    var dirOk = isLong ? c.price > entry : c.price < entry;
    var ratioOk = riskAmt > 0 && Math.abs(c.price - entry) / riskAmt >= 1.5;
    if (inRange && dirOk && ratioOk) return c;
  }
  return null;
}

// ─── TEST HELPERS ───

var passed = 0, failed = 0;

function assert(cond, label) {
  if (cond) { passed++; console.log("  ✅ " + label); }
  else       { failed++; console.log("  ❌ " + label); }
}
function assertEq(actual, expected, label) {
  var ok = actual === expected;
  if (ok) { passed++; console.log("  ✅ " + label + " (= " + actual + ")"); }
  else    { failed++; console.log("  ❌ " + label + " — expected " + expected + ", got " + actual); }
}

// ─── TEST 1: lowestTf derivation ───

console.log("\nTEST 1 — lowestTf selection");

assertEq(getLowestTf([{tf:"1h"},{tf:"1d"}], "1h"), "1h",
  "1H+1D confluence → lowestTf = 1h");
assertEq(getLowestTf([{tf:"4h"},{tf:"1w"}], "4h"), "4h",
  "4H+1W confluence → lowestTf = 4h");
assertEq(getLowestTf([{tf:"1d"},{tf:"1w"}], "1d"), "1d",
  "1D+1W confluence → lowestTf = 1d");
assertEq(getLowestTf([], "1h"), "1h",
  "No confluent TFs → fallback to interval");
assertEq(getLowestTf([{tf:"1h"},{tf:"4h"},{tf:"1d"}], "4h"), "1h",
  "1H+4H+1D triple confluence → lowestTf = 1h");

// ─── TEST 2: TP range table ───

console.log("\nTEST 2 — TP range table");

assertEq(getTpRange("1h").min, 0.008,  "1H min = 0.8%");
assertEq(getTpRange("1h").max, 0.025,  "1H max = 2.5%");
assertEq(getTpRange("4h").min, 0.020,  "4H min = 2.0%");
assertEq(getTpRange("4h").max, 0.05,   "4H max = 5.0%");
assertEq(getTpRange("1d").min, 0.040,  "1D min = 4.0%");
assertEq(getTpRange("1d").max, 0.10,   "1D max = 10.0%");
assertEq(getTpRange("1w").min, 0.080,  "1W min = 8.0%");
assertEq(getTpRange("1w").max, 0.25,   "1W max = 25.0%");

// ─── TEST 3: Confluencia 1H+1D — FVG 1D at +6% rejected, 1H-range TP picked ───
// Scenario: 1D interval alert, 1H+1D confluence fires.
// lowestTf = 1h → tpRange = 0.8–2.5%.
// A 1D FVG at 6% (valid under old 1D cap of 10%) must be rejected.
// A 1H FVG at 2.0% (R/R ≈ 2.0) must be picked.

console.log("\nTEST 3 — 1H+1D confluence: FVG at +6% rejected, TP capped to 1H range (0.8–2.5%)");

var entry3 = 81118;
var isLong3 = false; // short signal
var riskAmt3 = 81118 * 0.01; // 1% SL → $811
var lowestTf3 = getLowestTf([{tf:"1h"},{tf:"1d"}], "1d");
var range3 = getTpRange(lowestTf3);

assertEq(lowestTf3, "1h", "1H+1D with interval=1d → lowestTf = 1h");
assertEq(range3.max, 0.025, "lowestTf=1h → tpMax = 2.5%");

// 1D FVG at 6% below entry (short): $76,251
var tp1dFvg = Math.round(entry3 * (1 - 0.06)); // ~$76,251
var pct1dFvg = Math.abs(tp1dFvg - entry3) / entry3; // ~6%
assert(pct1dFvg > range3.max, "1D FVG at +6% exceeds 1H max (2.5%) → correctly rejected");
assert(pct1dFvg <= getTpRange("1d").max, "1D FVG at +6% within 1D range (≤10%) — the old (broken) behavior");

// 1H FVG at 2.0% below entry: R/R = 2.0/1.0 = 2.0 ≥ 1.5 ✓
var tp1hFvg = Math.round(entry3 * (1 - 0.02)); // ~$79,496
var sel3 = selectTp([{price:tp1dFvg},{price:tp1hFvg}], entry3, isLong3, riskAmt3, range3.min, range3.max);
assert(sel3 !== null, "selectTp picks 1H-range FVG, ignores 1D FVG");
assert(sel3 && sel3.price === tp1hFvg, "selected TP is 1H candidate, not 1D one");

// ─── TEST 4: Confluencia 4H+1W — FVG 1W at +15% rejected, 4H range TP picked ───

console.log("\nTEST 4 — 4H+1W confluence: FVG at +15% rejected, TP in 4H range (2–5%)");

var entry4 = 50000;
var isLong4 = true;
var riskAmt4 = 50000 * 0.015; // 1.5% SL → $750
var lowestTf4 = getLowestTf([{tf:"4h"},{tf:"1w"}], "4h");
var range4 = getTpRange(lowestTf4);

assertEq(lowestTf4, "4h", "4H+1W → lowestTf = 4h");
assertEq(range4.max, 0.05, "4H max = 5%");

// 1W FVG at +15%: $57,500
var tp1wFvg = 57500;
var pct1wFvg = (tp1wFvg - entry4) / entry4; // 0.15
assert(pct1wFvg > range4.max, "1W FVG at +15% exceeds 4H max (5%) → rejected");
assert(pct1wFvg <= getTpRange("1w").max, "1W FVG within 1W range (≤25%) — old (broken) behavior");

// 4H FVG at +3%: $51,500 — R/R = 1500/750 = 2.0 ≥ 1.5 ✓
var tp4hFvg = 51500;
var sel4 = selectTp([{price:tp1wFvg},{price:tp4hFvg}], entry4, isLong4, riskAmt4, range4.min, range4.max);
assert(sel4 !== null, "selectTp returns 4H-range FVG, ignores 1W FVG");
assert(sel4 && sel4.price === tp4hFvg, "selected TP is the 4H candidate");

// ─── TEST 5: Sin FVG/swing en rango válido → tpManualTarget ───

console.log("\nTEST 5 — No valid FVG/swing in range → selectTp returns null (tpManualTarget)");

var entry5 = 100;
var riskAmt5 = 1.0;  // $1 SL
var range5 = getTpRange("1h"); // {min:0.008, max:0.025}

// Candidates all outside 1H range
var candsAboveMax = [{price:103.5}]; // +3.5% > 2.5% max
assert(selectTp(candsAboveMax, entry5, true, riskAmt5, range5.min, range5.max) === null,
  "+3.5% exceeds 1H max (2.5%) → null");

var candsBelowMin = [{price:100.5}]; // +0.5% < 0.8% min
assert(selectTp(candsBelowMin, entry5, true, riskAmt5, range5.min, range5.max) === null,
  "+0.5% below 1H min (0.8%) → null");

// Candidate in range but R/R too low: +1.5%, R/R = 1.5/1.0 = 1.5 — exactly 1.5 → should pass
var candExactRR = [{price:101.5}]; // +1.5%, R/R = 1.5
assert(selectTp(candExactRR, entry5, true, riskAmt5, range5.min, range5.max) !== null,
  "+1.5% in range, R/R exactly 1.5 → picked");

// R/R just below 1.5: +1.4%
var candLowRR = [{price:101.4}]; // R/R = 1.4
assert(selectTp(candLowRR, entry5, true, riskAmt5, range5.min, range5.max) === null,
  "+1.4% in range but R/R 1.4 < 1.5 → null");

// All out of range → manual target scenario
var allOutOfRange = [{price:103},{price:106},{price:100.4}];
assert(selectTp(allOutOfRange, entry5, true, riskAmt5, range5.min, range5.max) === null,
  "All candidates out of range → null → tpManualTarget triggered");

// ─── SUMMARY ───

console.log("\n" + "=".repeat(60));
console.log("Passed: " + passed + " · Failed: " + failed);
console.log("=".repeat(60));
if (failed > 0) process.exit(1);
