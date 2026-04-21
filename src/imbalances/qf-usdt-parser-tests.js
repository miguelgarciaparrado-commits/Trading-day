// qf-usdt-parser-tests.js — regression tests for USDT/₮ spaced format
// Run: node src/imbalances/qf-usdt-parser-tests.js
//
// Root cause: Quantfury PDFs emit USDT amounts with SPACES between symbol/number:
//   "Total + ₮ 1,946.84"  (not "Total +₮1946.84")
//   "+ ₮ 1.71"  in row P&L column
//   "₮ 280.00"  in position size column
// Original regex assumed no spaces → all USDT trades parsed as pnl=null→0.

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
    console.error("  ❌ " + label + " — expected " + JSON.stringify(expected) + " got " + JSON.stringify(actual));
    failed++;
  }
}

// ── Inline the FIXED parser logic ────────────────────────────────────────────
function qfParseAmount(str) {
  if (!str && str !== 0) return null;
  var s = String(str).trim();
  var neg = s.indexOf("-") >= 0;
  var cleaned = s.replace(/[^0-9.]/g, "");
  var n = parseFloat(cleaned);
  return isNaN(n) ? null : (neg ? -n : n);
}

var QF_ACTIONS = ["COMPRAR (abrir)","VENDER (abrir)","COMPRAR (añadir)","VENDER (añadir)","COMPRAR (reducir)","VENDER (reducir)","COMPRAR (cerrar)","VENDER (cerrar)"];
function qfDetectAction(text) {
  for (var i = 0; i < QF_ACTIONS.length; i++) { if (text.indexOf(QF_ACTIONS[i]) >= 0) return QF_ACTIONS[i]; }
  return null;
}

function qfParseDataRow(text) {
  var action = qfDetectAction(text);
  if (!action) return null;
  var ai = text.indexOf(action);
  var before = text.substring(0, ai).trim();
  var after = text.substring(ai + action.length).trim();
  var dm = before.match(/(\d{2}\/\d{2}\/\d{4}\s+\d{1,2}:\d{2}:\d{2}\s+[AP]M\s+UTC)/);
  var symbol = "", datetime = "";
  if (dm) { var di = before.indexOf(dm[1]); symbol = before.substring(0, di).trim(); datetime = dm[1]; }
  else { symbol = before; }
  var pnl = null;
  var pnlM = after.match(/([+\-]\s*\S?\s*[\d,]+\.?\d*)$/);
  if (!pnlM) pnlM = after.match(/([+\-][\d,]+\.?\d*)$/);
  if (pnlM) { pnl = qfParseAmount(pnlM[1]); after = after.substring(0, after.length - pnlM[1].length).trim(); }
  var value = null;
  var valM = after.match(/([^\d\s+\-]\s*[\d,]+\.?\d*)$/);
  if (valM) { value = qfParseAmount(valM[1]); after = after.substring(0, after.length - valM[1].length).trim(); }
  var price = null, quantity = null, unit = null;
  var restM = after.match(/^(\$?[\d,]+\.?\d*)\s*(.*)$/);
  if (restM) {
    price = qfParseAmount(restM[1]);
    var qtyPart = restM[2].trim();
    if (qtyPart) {
      var qtyM = qtyPart.match(/^([\d,]+\.?\d*)\s+(.+)$/);
      if (qtyM) { quantity = parseFloat(qtyM[1].replace(/,/g, "")); unit = qtyM[2].trim(); }
      else { unit = qtyPart; }
    }
  }
  return { symbol: symbol, datetime: datetime, action: action, price: price, quantity: quantity, unit: unit, value: value, pnl: pnl };
}

function parseTotal(t) {
  var tm = t.match(/Total\s+([+\-]?\s*\S?\s*[\d,]+\.?\d*)/);
  return tm ? qfParseAmount(tm[1]) : null;
}

// ── Section 1: qfParseAmount handles all currency formats ─────────────────
console.log("── qfParseAmount ──");
// USD (no spaces)
assert("USD positive",      qfParseAmount("+$57.95"),     57.95);
assert("USD negative",      qfParseAmount("-$282.07"),    -282.07);
assert("USD no sign",       qfParseAmount("$210.01"),     210.01);
// EUR
assert("EUR negative",      qfParseAmount("-€85.03"),     -85.03);
// USDT spaced format — THE ACTUAL FORMAT IN PDF
assert("USDT + spaced",     qfParseAmount("+ ₮ 1.71"),    1.71);
assert("USDT - spaced",     qfParseAmount("- ₮ 1,946.84"), -1946.84);
assert("USDT - big",        qfParseAmount("- ₮ 1,112.46"), -1112.46);
assert("USDT no sign",      qfParseAmount("₮ 280.00"),    280);
assert("USDT size spaced",  qfParseAmount("₮ 13,530.00"), 13530);
// Null/zero guards
assert("empty → null",      qfParseAmount(""),            null);
assert("null → null",       qfParseAmount(null),          null);
assert("zero",              qfParseAmount("₮ 0.00"),      0);

// ── Section 2: Total line regex — real strings from diagnostic tool ────────
console.log("\n── Total line parsing (real PDF rows) ──");
// These exact strings were extracted from the PDF by pdfjs-dist:
assert("Total +$57.95",             parseTotal("Total +$57.95"),              57.95);
assert("Total -$29.61",             parseTotal("Total -$29.61"),              -29.61);
assert("Total -€85.03",             parseTotal("Total -€85.03"),             -85.03);
assert("Total $0.00",               parseTotal("Total $0.00"),                0);
// USDT spaced — previously ALL returned null:
assert("Total + ₮ 3.52",            parseTotal("Total + ₮ 3.52"),             3.52);
assert("Total - ₮ 31.06",           parseTotal("Total - ₮ 31.06"),           -31.06);
assert("Total + ₮ 251.45",          parseTotal("Total + ₮ 251.45"),           251.45);
assert("Total - ₮ 1,112.46",        parseTotal("Total - ₮ 1,112.46"),        -1112.46);
assert("Total - ₮ 995.59",          parseTotal("Total - ₮ 995.59"),          -995.59);
assert("Total ₮ 0.00",              parseTotal("Total ₮ 0.00"),               0);
// The 4 critical Oct 10 trades:
assert("Oct10 POL  - ₮ 1,468.02",  parseTotal("Total - ₮ 1,468.02"),        -1468.02);
assert("Oct10 LINK - ₮ 1,431.42",  parseTotal("Total - ₮ 1,431.42"),        -1431.42);
assert("Oct10 ETH  - ₮ 1,946.84",  parseTotal("Total - ₮ 1,946.84"),        -1946.84);
assert("Oct10 SUI  - ₮ 1,445.22",  parseTotal("Total - ₮ 1,445.22"),        -1445.22);

// ── Section 3: Full row P&L extraction — real PDF cerrar rows ─────────────
console.log("\n── Row P&L extraction (real PDF cerrar rows) ──");
// USD row (must still work)
var r1 = qfParseDataRow("NVDA 21/05/2025 1:53:46 PM UTC VENDER (cerrar) $134.38 1.9940 acciones $210.01 +$57.95");
assert("USD row pnl = 57.95",  r1 && r1.pnl, 57.95);
assert("USD row value = 210",  r1 && r1.value, 210.01);

// USDT rows with spaced format (real rows from PDF):
var r2 = qfParseDataRow("RENDER/USDT 23/12/2024 7:27:30 PM UTC VENDER (cerrar) 7.245 38.88348840 RENDER ₮ 280.00 + ₮ 1.71");
assert("RENDER pnl = 1.71",     r2 && r2.pnl,   1.71);
assert("RENDER value = 280",    r2 && r2.value,  280);

var r3 = qfParseDataRow("LINK/USDT 05/03/2025 9:54:24 AM UTC VENDER (cerrar) 16.080 60.81348189 LINK ₮ 900.00 + ₮ 77.88");
assert("LINK pnl = 77.88",      r3 && r3.pnl,   77.88);
assert("LINK value = 900",      r3 && r3.value,  900);

// Oct 10 ETH/USDT cerrar row (biggest loss, from diagnostic output):
var r4 = qfParseDataRow("ETH/USDT 10/10/2025 9:22:20 PM UTC VENDER (cerrar) 3,507.30 3.30258653 ETH ₮ 13,530.00 - ₮ 1,946.84");
assert("ETH pnl = -1946.84",    r4 && r4.pnl,   -1946.84);
assert("ETH value = 13530",     r4 && r4.value,  13530);

var r5 = qfParseDataRow("POL/USDT 10/10/2025 9:22:20 PM UTC VENDER (cerrar) 0.1247 11,586.35104716 POL ₮ 2,850.00 - ₮ 1,405.18");
assert("POL pnl = -1405.18",    r5 && r5.pnl,   -1405.18);

var r6 = qfParseDataRow("LINK/USDT 10/10/2025 9:22:20 PM UTC VENDER (cerrar) 11.520 136.16162248 LINK ₮ 3,000.00 - ₮ 1,431.42");
assert("LINK10 pnl = -1431.42", r6 && r6.pnl,   -1431.42);

var r7 = qfParseDataRow("SUI/USDT 10/10/2025 9:22:20 PM UTC VENDER (cerrar) 1.0847 511.45662848 SUI ₮ 2,000.00 - ₮ 1,445.22");
assert("SUI pnl = -1445.22",    r7 && r7.pnl,   -1445.22);

// ── Section 4: Oct 10 aggregate ────────────────────────────────────────────
console.log("\n── Oct 10 2025 aggregate ──");
var oct10 = [
  parseTotal("Total - ₮ 1,468.02"),  // POL
  parseTotal("Total - ₮ 1,431.42"),  // LINK
  parseTotal("Total - ₮ 1,946.84"),  // ETH
  parseTotal("Total - ₮ 1,445.22"),  // SUI
];
assert("all 4 parsed (not null)",  oct10.every(function(v){ return v !== null; }), true);
var sum = oct10.reduce(function(s,v){ return s+(v||0); }, 0);
assert("Oct10 sum ≈ -6291.50",   sum, -6291.50, 0.01);
assert("all 4 are losses",        oct10.every(function(v){ return v < 0; }), true);

// ── Section 5: ETH/USDT is the biggest loss (not BTC/USD -282.07) ──────────
console.log("\n── Biggest loss check ──");
var allLosses = [
  parseTotal("Total - ₮ 1,946.84"),  // ETH/USDT
  parseTotal("Total -$282.07"),       // BTC/USD (the OLD "biggest" loss)
  parseTotal("Total - ₮ 995.59"),     // ETH/USDT another big loss
  parseTotal("Total -$251.20"),       // BTC/USD
];
var biggest = allLosses.reduce(function(mn, v){ return v < mn ? v : mn; }, 0);
assert("Biggest loss = -1946.84 (ETH/USDT)", biggest, -1946.84);

console.log("\n" + (failed === 0
  ? "✅ All " + passed + " assertions passed."
  : "❌ " + failed + "/" + (passed + failed) + " FAILED."));
process.exit(failed > 0 ? 1 : 0);
