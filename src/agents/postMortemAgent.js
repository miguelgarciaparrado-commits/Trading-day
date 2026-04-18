// postMortemAgent.js — Trading Auditor v1
// Evaluates a closed trade against 5 discipline rules via Claude.
// Reads API key from localStorage("td-anthropic-key").
// Returns {score, rules:[{id,name,status,evidence}], summary} or {error:"..."}.

var AUDIT_SYSTEM_PROMPT = [
  "Eres un auditor de disciplina de trading. Evalúas operaciones cerradas según 5 reglas estrictas de gestión de riesgo.",
  "",
  "REGLAS A EVALUAR:",
  "R1 – Stop Loss es Ley: el SL debe estar definido en la apertura (sl_initial presente) y no puede ampliarse.",
  "  Un SL reducido (acercado a la entrada) es aceptable. Si sl_modifications contiene entradas donde el SL se alejó de la entrada, es fail.",
  "R2 – El apalancamiento no es inversión: la operación debe cerrarse antes de las 72h (para futuros).",
  "  Objetivo concreto, no hold indefinido. Si la duración supera 72h, es fail.",
  "R3 – Sin ego: si la operación se cerró por SL (result < 0 y note contiene 'SL'),",
  "  no debe haberse reabierto el mismo activo en los siguientes 15 min (reopen_after_sl === false o ausente).",
  "R4 – Trailing estructural: si hay sl_modifications con más de 0 entradas,",
  "  los ajustes deben ir en la dirección correcta (acercando el SL a la entrada).",
  "  Long: SL debe subir con cada modificación. Short: SL debe bajar con cada modificación.",
  "  No penalices si no hay modificaciones.",
  "R5 – Tesis técnica: debe existir thesis_text con al menos 20 caracteres descriptivos.",
  "",
  "SALIDA — responde SOLO con JSON válido, sin markdown, sin explicaciones:",
  "{",
  '  "score": <0..5 entero>,',
  '  "rules": [',
  '    {"id":"R1","name":"SL es Ley","status":"pass"|"fail"|"na","evidence":"<frase corta>"},',
  '    {"id":"R2","name":"Sin hold indefinido","status":"pass"|"fail"|"na","evidence":"<frase corta>"},',
  '    {"id":"R3","name":"Sin ego","status":"pass"|"fail"|"na","evidence":"<frase corta>"},',
  '    {"id":"R4","name":"Trailing estructural","status":"pass"|"fail"|"na","evidence":"<frase corta>"},',
  '    {"id":"R5","name":"Tesis técnica","status":"pass"|"fail"|"na","evidence":"<frase corta>"}',
  '  ],',
  '  "summary": "<2-3 frases en español resumiendo el audit>"',
  "}",
  "",
  "score = número de reglas con status \"pass\".",
  "Usa \"na\" cuando no hay datos suficientes para evaluar (no penaliza)."
].join("\n");

async function auditTrade(trade, marketContextAtOpen) {
  var apiKey = "";
  try { apiKey = localStorage.getItem("td-anthropic-key") || ""; } catch(e) {}
  if (!apiKey) return { error: "No API key configured" };

  var tradeJson = "";
  try { tradeJson = JSON.stringify(trade, null, 2); } catch(e) { tradeJson = String(trade); }

  var contextSection = "";
  if (marketContextAtOpen) {
    try { contextSection = "\n\nCONTEXTO DE MERCADO EN APERTURA:\n" + JSON.stringify(marketContextAtOpen, null, 2); } catch(e) {}
  }

  var userMsg = "Audita esta operación cerrada:\n\n" + tradeJson + contextSection;

  var response;
  try {
    response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        system: AUDIT_SYSTEM_PROMPT,
        messages: [{ role: "user", content: userMsg }]
      })
    });
  } catch(e) {
    return { error: "Network error: " + (e && e.message || String(e)) };
  }

  if (!response.ok) {
    var errData = {};
    try { errData = await response.json(); } catch(e) {}
    return { error: "API " + response.status + ((errData.error && errData.error.message) ? " — " + errData.error.message : "") };
  }

  var data = {};
  try { data = await response.json(); } catch(e) {
    return { error: "Failed to parse API response" };
  }

  var raw = (data.content && data.content[0] && data.content[0].text) ? data.content[0].text.trim() : "";

  // Strip markdown code fences if present
  raw = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();

  try {
    return JSON.parse(raw);
  } catch(e) {
    return { error: "JSON parse failed: " + raw.slice(0, 120) };
  }
}
