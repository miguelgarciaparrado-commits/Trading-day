// qf-usdt-parser-tests.js — verifies ₮ (USDT) amounts parse correctly
// Run: node src/imbalances/qf-usdt-parser-tests.js

var passed = 0;
var failed = 0;

function assert(label, actual, expected, epsilon) {
  epsilon = epsilon || 0;
  var ok = epsilon > 0
    ? Math.abs(actual - expected) <= epsilon
    : actual === expected;
  if (ok) {
    console.log("  ✅ " + label);
    passed++;
  } else {
    console.error("  ❌ " + label + " — expected " + expected + " got " + actual);
    failed++;
  }
}

// Inline the parser logic (no DOM dependency)
function qfParseAmount(str) {
  if (!str && str !== 0) return null;
  var s = String(str).trim();
  var neg = s.charAt(0) === "-";
  var cleaned = s.replace(/[+\-₸₮\$€,\s]/g, "");
  var n = parseFloat(cleaned);
  return isNaN(n) ? null : (neg ? -n : n);
}

console.log("── qfParseAmount ──");
assert("positive ₮ amount",          qfParseAmount("₮1,468"),        1468);
assert("negative ₮ amount prefix",   qfParseAmount("-₮1,468.02"),    -1468.02);
assert("negative ₮ amount +sign",    qfParseAmount("-₮1,431.42"),    -1431.42);
assert("positive ₸ still works",     qfParseAmount("₸500.00"),       500);
assert("dollar still works",         qfParseAmount("$123.45"),       123.45);
assert("negative dollar",            qfParseAmount("-$282.07"),      -282.07);
assert("null on empty",              qfParseAmount(""),              null);
assert("null on null",               qfParseAmount(null),            null);

// Simulate the 4 trades on 10/10/2025
console.log("\n── October 2025 aggregate (10/10/2025 trades) ──");
var oct10Pnls = [
  qfParseAmount("-₮1,468.02"),  // POL/USDT
  qfParseAmount("-₮1,431.42"),  // LINK/USDT
  qfParseAmount("-₮1,946.84"),  // ETH/USDT
  qfParseAmount("-₮1,445.22"),  // SUI/USDT
];

var allParsed = oct10Pnls.every(function(v) { return v !== null; });
assert("all 4 USDT P&Ls parse (not null)", allParsed, true);

var sum = oct10Pnls.reduce(function(s, v) { return s + (v || 0); }, 0);
assert("sum ≈ -6291.50", sum, -6291.50, 0.01);

// Ensure they are counted as losses (not zero) in win-rate logic
var losses = oct10Pnls.filter(function(v) { return v !== null && v < 0; });
assert("all 4 counted as losses", losses.length, 4);

// Total line regex
console.log("\n── Total row regex ──");
var totalPattern = /Total\s+([+\-]?[₸₮\$€]?[\d,]+\.?\d*)/;
var m1 = "Total -₮6,291.50".match(totalPattern);
assert("Total ₮ line matches",  m1 !== null, true);
assert("Total ₮ value parses",  m1 ? qfParseAmount(m1[1]) : null, -6291.50, 0.01);

var m2 = "Total -$282.07".match(totalPattern);
assert("Total $ line still matches", m2 !== null, true);

// pnl regex
console.log("\n── P&L end-of-row regex ──");
var pnlPattern1 = /([+\-][₸₮\$€][\d,]+\.?\d*)$/;
var pnlPattern2 = /([+\-][\d,]+\.?\d*[₸₮\$€]?)$/;
var row1 = "some data -₮1,468.02";
var pm1 = row1.match(pnlPattern1);
assert("₮ pnl regex pattern1 matches",  pm1 !== null, true);
assert("₮ pnl value parses correctly",  pm1 ? qfParseAmount(pm1[1]) : null, -1468.02, 0.01);

var row2 = "some data -$282.07";
var pm2 = row2.match(pnlPattern1);
assert("$ pnl regex pattern1 still matches", pm2 !== null, true);

// value (position size) regex
console.log("\n── Value (position size) regex ──");
var valPattern = /([₸₮\$€][\d,]+\.?\d*)$/;
var v1 = "some data ₮2,850.00";
var vm1 = v1.match(valPattern);
assert("₮ value regex matches",   vm1 !== null, true);
assert("₮ value parses",          vm1 ? qfParseAmount(vm1[1]) : null, 2850);

console.log("\n" + (failed === 0 ? "✅ All " + passed + " assertions passed." : "❌ " + failed + "/" + (passed + failed) + " FAILED."));
process.exit(failed > 0 ? 1 : 0);
