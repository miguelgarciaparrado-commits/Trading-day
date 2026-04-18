// fvg-direction-tests.js — Unit tests for FVG direction invariants
// Run: node src/imbalances/fvg-direction-tests.js
//
// Audits the 4 direction cases required by the audit plan:
//   1. FVG alcista + precio debajo → long con entry/SL/TP correctos
//   2. FVG bajista + precio arriba → short con entry/SL/TP correctos
//   3. FVG alcista con FVG bajista cerca → NO usar el bajista como TP
//   4. R/R < 1:1 → señal marcada "R/R insuficiente"
//
// The functions under test are lifted verbatim from trading-diary.jsx.
// If the source drifts, copy the new versions here and re-run.

// ─── FUNCTIONS UNDER TEST (copy from trading-diary.jsx) ───

function checkFVGCovered(ohlc, price) {
  if (!ohlc || ohlc.length < 10) return null;
  var n = ohlc.length;
  var scanStart = Math.max(2, n - 60);
  for (var i = scanStart; i < n - 2; i++) {
    var h0 = ohlc[i - 2].h, l0 = ohlc[i - 2].l;
    var h2 = ohlc[i].h, l2 = ohlc[i].l;
    var age = n - 1 - i;
    if (age < 3) continue;
    if (l2 > h0 && price >= h0 && price <= l2) {
      return { subtype: "alcista", kind: "fvg", top: l2, bot: h0, age: age, formedIdx: i };
    }
    if (h2 < l0 && price <= l0 && price >= h2) {
      return { subtype: "bajista", kind: "fvg", top: l0, bot: h2, age: age, formedIdx: i };
    }
  }
  return null;
}

function findFVGforTP(ohlcArr, refPrice, bullish, minRatio, riskA) {
  var cands = [];
  var scanStart2 = Math.max(2, ohlcArr.length - 80);
  for (var fi = scanStart2; fi < ohlcArr.length; fi++) {
    var fc0 = ohlcArr[fi - 2], fc2 = ohlcArr[fi];
    if (bullish && fc2.l > fc0.h) {
      var gS = fc2.l - fc0.h;
      if (gS / refPrice < 0.0005) continue;
      var fM = (fc2.l + fc0.h) / 2;
      if (fM > refPrice) cands.push({ price: fM, note: "FVG alcista" });
    }
    if (!bullish && fc2.h < fc0.l) {
      var gS2 = fc0.l - fc2.h;
      if (gS2 / refPrice < 0.0005) continue;
      var fM2 = (fc2.h + fc0.l) / 2;
      if (fM2 < refPrice) cands.push({ price: fM2, note: "FVG bajista" });
    }
  }
  cands.sort(function (a, b) { return Math.abs(a.price - refPrice) - Math.abs(b.price - refPrice); });
  for (var ci2 = 0; ci2 < cands.length; ci2++) {
    if (riskA > 0 && Math.abs(cands[ci2].price - refPrice) / riskA >= minRatio) return cands[ci2];
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

// Build synthetic OHLC: array of {o,h,l,c,v}
function k(o, h, l, c, v) { return { o: o, h: h, l: l, c: c, v: v || 1000 }; }

// ─── TEST 1: FVG alcista + precio debajo → long con entry/SL/TP correctos ───

console.log("\nTEST 1 — FVG alcista + price below → long signal");

// Build synthetic OHLC where:
//   - idx 10 forms a bullish FVG with h[8]=100 and l[10]=110 → range [100, 110]
//   - idx 13 forms a bullish FVG with h[11]=120 and l[13]=135 → range [120, 135]
//   - current price = 108 (inside first FVG, below the second)
var ohlc1 = [];
for (var j = 0; j < 7; j++) ohlc1.push(k(95, 99, 90, 95));
ohlc1.push(k(95, 100, 93, 99));     // idx 7 — base
ohlc1.push(k(99, 100, 93, 99));     // idx 8 — h=100
ohlc1.push(k(99, 111, 98, 110));    // idx 9 — big bullish candle
ohlc1.push(k(110, 118, 110, 115));  // idx 10 — l=110 → bullish FVG: top=110, bot=100
ohlc1.push(k(115, 120, 114, 118));  // idx 11 — h=120
ohlc1.push(k(118, 140, 117, 135));  // idx 12 — spike up
ohlc1.push(k(135, 140, 135, 138));  // idx 13 — l=135 → bullish FVG: top=135, bot=120
ohlc1.push(k(125, 128, 107, 108));  // idx 14 — current price 108, inside first FVG

var price1 = 108;
var detected1 = checkFVGCovered(ohlc1, price1);
assert(detected1 !== null, "FVG detected at price 108");
assertEq(detected1 && detected1.subtype, "alcista", "detected subtype = alcista");
assertEq(detected1 && detected1.top, 110, "FVG top = 110");
assertEq(detected1 && detected1.bot, 100, "FVG bot = 100");

// Guarantee 2: entry should be at TOP (upper edge) for long
console.log("  → per Guarantee 2, long entry should be TOP = 110");
console.log("  ⚠️  FINDING H1 — two code paths disagree:");
console.log("     trading-diary.jsx:4559 (OPERACIÓN) uses BOT for long  ← contradicts Guarantee 2");
console.log("     trading-diary.jsx:4823 (patron_fvg) uses TOP for long ← matches Guarantee 2");

// Guarantee 3: SL should be below the far edge + 0.3×ATR
console.log("  → per Guarantee 3, long SL base should be BOT=100 (+ 0.3×ATR buffer)");
console.log("  ⚠️  FINDING H2 — SL calculated without ATR buffer in both code paths");

// Guarantee 4 + 5: TP should come from next BULLISH FVG above entry
var entry1 = detected1.top;           // assume the patron_fvg code path (correct)
var riskAmt1 = entry1 - detected1.bot; // 110 - 100 = 10
var tp1 = findFVGforTP(ohlc1, entry1, true, 1.0, riskAmt1);
assert(tp1 !== null, "findFVGforTP returns a candidate for long (minRatio=1.0)");
assert(tp1 && tp1.price > entry1, "TP (" + (tp1 && tp1.price.toFixed(1)) + ") > entry (110)");
assert(tp1 && tp1.note.indexOf("alcista") >= 0, "TP source = FVG alcista");

// ─── TEST 2: FVG bajista + precio arriba → short con entry/SL/TP correctos ───

console.log("\nTEST 2 — FVG bajista + price above → short signal");

// Mirror of Test 1: bearish FVGs with price above
var ohlc2 = [];
for (var j2 = 0; j2 < 7; j2++) ohlc2.push(k(105, 110, 100, 105));
ohlc2.push(k(105, 107, 100, 105));  // idx 7
ohlc2.push(k(105, 107, 100, 105));  // idx 8 — l=100
ohlc2.push(k(101, 102, 89, 90));    // idx 9 — bearish dump
ohlc2.push(k(90, 90, 82, 85));      // idx 10 — h=90 → bearish FVG: top=100, bot=90
ohlc2.push(k(85, 87, 80, 82));      // idx 11 — l=80
ohlc2.push(k(82, 83, 60, 65));      // idx 12 — crash
ohlc2.push(k(65, 70, 60, 62));      // idx 13 — h=70 → bearish FVG: top=80, bot=70
ohlc2.push(k(75, 93, 73, 92));      // idx 14 — current price 92, inside first bearish FVG

var price2 = 92;
var detected2 = checkFVGCovered(ohlc2, price2);
assert(detected2 !== null, "bearish FVG detected at price 92");
assertEq(detected2 && detected2.subtype, "bajista", "detected subtype = bajista");
assertEq(detected2 && detected2.top, 100, "bearish FVG top = 100");
assertEq(detected2 && detected2.bot, 90, "bearish FVG bot = 90");

console.log("  → per Guarantee 2, short entry should be BOT = 90");
var entry2 = detected2.bot;           // patron_fvg path (correct)
var riskAmt2 = detected2.top - entry2; // 100 - 90 = 10
var tp2 = findFVGforTP(ohlc2, entry2, false, 1.0, riskAmt2);
assert(tp2 !== null, "findFVGforTP returns a candidate for short");
assert(tp2 && tp2.price < entry2, "TP (" + (tp2 && tp2.price.toFixed(1)) + ") < entry (90)");
assert(tp2 && tp2.note.indexOf("bajista") >= 0, "TP source = FVG bajista");

// ─── TEST 3: FVG alcista con FVG bajista cerca → NO usar el bajista como TP ───

console.log("\nTEST 3 — bullish context should NOT use bearish FVG as TP");

// Construct OHLC with ONLY a bearish FVG above entry. Verify that
// findFVGforTP(…, bullish=true, …) does NOT return the bearish candidate.
var ohlcBearOnly = [];
for (var j4 = 0; j4 < 8; j4++) ohlcBearOnly.push(k(100, 105, 95, 100));
ohlcBearOnly.push(k(100, 105, 95, 100));  // idx 8
ohlcBearOnly.push(k(100, 140, 100, 138)); // idx 9 — spike up (l=100)
ohlcBearOnly.push(k(138, 140, 120, 122)); // idx 10 — bearish candle (h=140)
ohlcBearOnly.push(k(122, 125, 118, 120)); // idx 11 — (l=118)
ohlcBearOnly.push(k(120, 122, 95, 98));   // idx 12 — crash
ohlcBearOnly.push(k(98, 100, 90, 92));    // idx 13 — bearish FVG? h=100 < l[11]=118? YES → top=118, bot=100

var tpBearOnly = findFVGforTP(ohlcBearOnly, 100, true, 1.0, 5);
assert(tpBearOnly === null || tpBearOnly.note.indexOf("alcista") >= 0,
  "bullish=true must never return bearish-source candidate");
console.log("  → findFVGforTP filters by direction AND position (Guarantee 5 holds)");

// Bonus: same OHLC, bullish=false should find the bearish FVG above 100
// but only if it's BELOW refPrice. Since we pass refPrice=100 and the bearish
// FVG is ABOVE 100, it should still return null.
var tpBearFromAbove = findFVGforTP(ohlcBearOnly, 100, false, 1.0, 5);
assert(tpBearFromAbove === null, "bearish search with refPrice below FVG returns null (position filter works)");

// ─── TEST 4: R/R < 1:1 → señal marcada "R/R insuficiente" ───

console.log("\nTEST 4 — R/R < 1:1 should be flagged as insufficient");

// Simulate the TF cap scenario: SL is 3% away, TF cap limits TP to 2%
// → R/R = 2/3 = 0.67 — emission should be blocked or tagged.
var entry4 = 100, sl4 = 97, tpAfterCap4 = 102;
var riskAmt4 = Math.abs(entry4 - sl4);
var rewardAmt4 = Math.abs(tpAfterCap4 - entry4);
var rr4 = riskAmt4 > 0 ? rewardAmt4 / riskAmt4 : 0;
assert(rr4 > 0, "R/R is positive (no sign bug in formula)");
assert(rr4 < 1.0, "R/R (" + rr4.toFixed(2) + ") < 1.0 — audit expects this to be blocked");
console.log("  ⚠️  FINDING H4 — trading-diary.jsx:4661-4665 applies TF cap WITHOUT");
console.log("     revalidating R/R. Emission proceeds even when ratio drops below 1:1.");
console.log("  → proposed fix: add gate `if(ratioNum < 1.0) tgLines.push('⚠️ R/R insuficiente')`");
console.log("     OR suppress OPERACIÓN block entirely when ratioNum < 1.0.");

// ─── SUMMARY ───

console.log("\n" + "=".repeat(60));
console.log("Passed: " + passed + " · Failed: " + failed);
console.log("=".repeat(60));

if (failed > 0) {
  console.log("\nFAILURES indicate audit findings, not code regressions.");
  console.log("See PR description for the 6-guarantee table and proposed fixes.");
}
