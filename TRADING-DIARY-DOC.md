# Trading Diary — Documentación del Proyecto

**Trader:** Miguel Garcia Parrado
**Plataforma:** Quantfury (desde noviembre 2024)
**URL producción:** `https://tradingday.netlify.app`
**Base de datos:** Supabase — `https://ifqftuqkdgsepvtqwefp.supabase.co`

---

## Descripción

Aplicación web de trading journal personalizada, construida como un único fichero HTML autocontenido (~433 KB). Permite registrar y analizar operaciones de trading, monitorizar indicadores técnicos en tiempo real, recibir alertas push y obtener análisis de IA sobre el mercado y coaching psicológico.

---

## Stack Técnico

| Componente | Tecnología |
|---|---|
| Frontend | React 18 (UMD, sin bundler) |
| Lenguaje fuente | JSX (compilado con TypeScript API via `build.js`) |
| Estilos | CSS-in-JS inline |
| Datos mercado | Binance REST API + WebSocket |
| Base de datos | Supabase (PostgreSQL) |
| Almacenamiento local | localStorage (backup offline) |
| IA | Anthropic API — claude-sonnet-4-6 |
| Hosting | Netlify / Vercel |

### Compilación

```bash
node build.js                    # JSX → trading-diary.html
cp trading-diary.html index.html # index.html es el root URL
```

El build usa TypeScript API internamente: `jsx: React, target: ES2020, module: None`. Post-proceso elimina comas huérfanas (bug TypeScript con `<`/`>` en JSX) y artefactos de módulos.

---

## Arquitectura de Datos

### Sincronización

```
localStorage ←→ App ←→ Supabase (tabla: trading_data)
```

- Cada cambio guarda en localStorage inmediatamente (backup offline)
- 600ms después sincroniza con Supabase via POST con `Prefer: resolution=merge-duplicates`
- Al cargar, Supabase tiene prioridad sobre localStorage

### Payload guardado (`td-user`)

```json
{
  "pr":       { "SOL": 91.33, "BTC": 84000, "ETH": 2000, ... },
  "pos":      [ ...posiciones abiertas ],
  "pats":     [ ...patrones chartistas ],
  "jnl":      [ ...entradas reflexión IA ],
  "ps":       { "slOk": 14, "slBroken": 2, "slBreakeven": 1, ... },
  "xhist":    [ ...cierres hechos via app ],
  "horarios": [ ...registros patrones horarios ],
  "ethClosed": false
}
```

### Otras claves localStorage

| Clave | Contenido |
|---|---|
| `td-alerts-v2` | Configuración de alertas activas |
| `td-anthropic-key` | Clave API Anthropic |
| `td-tg-token` / `td-tg-chatid` | Telegram bot |
| `td-chat-msgs` | Historial chat IA |
| `td-ai-profile` | Análisis de perfil generado |
| `td-ai-profile-traits` | Rasgos psicológicos detectados por IA |
| `td-pattern-fb` | Feedback de precisión por tipo de patrón |

---

## Análisis del Historial Quantfury (PDF 26/03/2026)

> Fuente: `Informe de Historial de Trading 26.03.2026.pdf`
> Período: 21 nov 2024 – 26 mar 2026 (16 meses)

### Estadísticas Globales

| Métrica | Valor |
|---|---|
| Operaciones totales | 246 |
| Ganadoras | 181 (73.6% → ~74%) |
| Perdedoras | 62 |
| Breakeven | 3 |
| **Tasa ganadora** | **74%** |
| P&L total RAW | -$7,454.42 |
| Capital total desplegado | $775,153 |
| **ROI histórico** | **-0.96% ≈ -1.0%** |

**¿Qué es el ROI histórico?**
Es el resultado total dividido por el capital total desplegado a lo largo de todas las operaciones: `-7454 / 775153 = -0.96%`. Es muy bajo en porcentaje porque el denominador es enorme (BTC con posiciones de $6k–$24k). **No** es el mejor ROI alcanzado — es el retorno acumulado global.

**¿Por qué la tasa ganadora oscila entre 73–74%?**
`hist = [...xhist, ...H0]`. El historial combina las 246 ops de Quantfury (181W = 73.6%) con las operaciones cerradas en la app (`xhist`). Si las ops recientes de la app tienen más pérdidas, la tasa combinada redondea a 73% en lugar de 74%. Es una fluctuación normal de ±1%.

### Desglose por Activo

| Activo | P&L | Ops | W/L |
|---|---|---|---|
| ETH/USDT | -$3,644 | 31 | 22W/9L |
| POL/USDT | -$1,455 | 11 | 10W/1L |
| SUI/USDT | -$1,413 | 4 | 3W/1L |
| LINK/USDT | -$1,117 | 21 | 16W/5L |
| BTC/USD | -$589 | 49 | 36W/13L |
| **BTC/USDT** | **+$852** | **47** | **41W/6L** |
| LINK/USD | +$133 | 15 | 12W/3L |
| POL/USDT | +$84 | 11 | 10W/1L |
| NVDA | +$58 | 1 | 1W/0L |
| TLT | +$80 | — | — |

### Desglose Mensual

| Mes | Ops | P&L | Resultado |
|---|---|---|---|
| Dic 2024 | 1 | +$3.52 | Verde |
| Ene 2025 | 3 | +$34.58 | Verde |
| Feb 2025 | 1 | +$2.96 | Verde |
| Mar 2025 | 4 | +$131.33 | Verde |
| Abr 2025 | 2 | -$26.11 | Rojo |
| May 2025 | 4 | +$14.21 | Verde |
| Jun 2025 | 18 | +$95.73 | Verde |
| Jul 2025 | 31 | -$433.10 | Rojo |
| Ago 2025 | 50 | -$1,428.91 | Rojo |
| Sep 2025 | 33 | +$108.84 | Verde |
| **Oct 2025** | **31** | **-$6,383.97** | **CATASTROFE** |
| Nov 2025 | 15 | +$28.71 | Verde |
| Dic 2025 | 5 | -$7.39 | Rojo |
| Ene 2026 | 9 | +$106.39 | Verde |
| Feb 2026 | 19 | +$178.98 | Verde |
| Mar 2026 | 20 | +$119.81 | Verde |

### El Evento del 10 de Octubre de 2025

En un solo día se produjeron 4 posiciones con liquidación masiva:

| Posición | Capital | Pérdida |
|---|---|---|
| ETH/USDT Long | $13,530 | -$1,946.84 |
| POL/USDT Long | $2,850 | -$1,468.02 |
| SUI/USDT Long | $2,000 | -$1,445.22 |
| LINK/USDT Long | $3,000 | -$1,431.42 |
| **TOTAL** | **$21,380** | **-$6,291.50** |

Este único día representa el **84% de las pérdidas totales**. Todas las posiciones eran Longs simultáneas, sin stop loss respetado. El objetivo de recuperación ($7,641) nace directamente de este evento.

### Fuentes de Capital y Comportamiento

- **BTC/USDT** es el activo más rentable (+$852) con el mayor número de operaciones (47) y la mejor tasa (87% ganadora).
- **ETH** en cualquier par ha sido el activo más dañino (-$3,644), principalmente por posiciones grandes mantenidas en drawdown.
- Las operaciones de **acciones/ETFs** (NVDA, TLT, MSTR, RGTI) son de menor capital pero mejor gestión de riesgo.
- Desde **Nov 2025 en adelante**, el comportamiento ha mejorado notablemente: 6 de los últimos 7 meses son verdes.

---

## Datos Históricos en Código

```javascript
const QUANTFURY_BASE = -7471.73;  // Offset histórico para h0Total
// RAW sum = -7454.42 (suma directa de las 246 ops)
// Diferencia de $17.31 por redondeos y cierres parciales
// h0Total = QUANTFURY_BASE + xhistTotal (donde xhist = ops cerradas via app)

const RAW = [ ...246 operaciones... ];
const H0 = RAW.map(r => ({id, asset, dir, cap, result, date, note}));
```

**Posición ETH Legado (aún abierta):**
```
1.9521 ETH — entrada media $3,621.58 — pérdida realizada -$796.09
Entries: 24/10/2025 a 02/02/2026, partial sells en mar/2026
BE price: $4,029 — TP target: $9,000
```

---

## Pestañas de la Aplicación

### 1. Resumen
KPIs en tiempo real: pérdida histórica dinámica, ETH legado, P&L posiciones activas, pérdida total, OPS totales, tasa ganadora. Segunda fila: Ratio R:R medio, ROI histórico/ETH/activas.

### 2. Posiciones
Gestión de posiciones abiertas (nueva, editar, cerrar). Incluye **PositionAdvisor**: análisis automático de ratio riesgo/beneficio con consejos de gestión (parciales, trailing stop, BE, SL breakeven).

**Modal de cierre — opciones:**
- TP alcanzado (verde)
- SL activado (rojo)
- Cierre manual (naranja)
- Salto el Breakeven — $0 (azul, peso 0.5 en disciplina SL)

### 3. Historial
Operaciones con filtros por activo, dirección (Long/Short) y orden cronológico. Estadísticas Long vs Short separadas. Las nuevas operaciones cerradas via app se añaden dinámicamente.

### 4. Patrones
Libro de patrones chartistas con contador CONFIRMÓ/FALLÓ por observación. Historial de activaciones por fecha.

### 5. Perfil
- **Score 0-100** calculado dinámicamente
- **Análisis IA** via `generateProfileSummary()` — evalúa disciplina, comportamiento, revancha, reflexión
- **GoalTracker**: progreso hacia $7,641
- **REFLEXIONES IA**: contador de sesiones de coaching en Chat (+1 pt/sesión, máx 5 pts)
- **Métricas de riesgo**: SL respetados/breakeven/eliminados, TP auto/manual, cierres prematuros

**Score breakdown:**
| Componente | Peso |
|---|---|
| Disciplina SL (slOk + slBE×0.5) | 35 pts |
| Calidad cierres (TP vs early close) | 20 pts |
| Control emocional (revenge) | base 15 pts |
| Patrones confirmados | 7 pts c/u |
| Reflexiones IA chat | 1 pt c/u (máx 5) |
| Bonus diario ligado a cierres | hasta 5 pts |

### 6. Recuperación
Tabla de escenarios de recuperación ETH por precio: cuánto queda para BE ($4,029) y TP ($9,000).

### 7. Calendario
P&L diario y mensual. Vista de mes con colores verde/rojo por resultado del día.

### 8. Horarios
Registro diario del patrón 19:30-20:00. Estadísticas por día de la semana (Lunes %, Martes %...).

### 9. Alertas
Monitor de indicadores técnicos en tiempo real via WebSocket Binance (crypto) y polling Finnhub (acciones).

**Alertas automáticas por activo:**
- RSI ≤ umbral personalizable (default 30) → sobreventa
- RSI ≥ umbral personalizable (default 70) → sobrecompra
- RSI personalizado (cualquier nivel, above/below)
- EMA 7/25 cruce dorado / muerte
- EMA 50/200 cruce dorado / muerte
- Divergencias RSI (alcista/bajista)
- Canal alcista/bajista — ruptura o toque
- FVG cubierta
- Banderín alcista/bajista (y falsos)

**Feedback de precisión:** cada alerta tiene botones ✓/✗ para puntuar si fue correcta. Las estadísticas por tipo de patrón se guardan en `td-pattern-fb`.

### 10. Chat
Coaching IA (Claude) con datos de mercado en tiempo real y modo reflexión psicológica.

**Modo análisis de mercado:**
1. Seleccionar activo y temporalidad
2. Pulsar ⚡ para cargar datos Binance (precio, RSI, EMAs, estructura, volumen)
3. Pregunta o análisis → Claude responde con contexto del trader

**Modo reflexión psicológica (automático tras cierres):**
- Claude detecta cuando el usuario quiere reflexionar sobre una operación
- Guarda `EVALUACION_TRADER:[positivo|negativo|neutro]:[descripción]` en `jnl`
- Guarda `PERFIL_TRADER:[rasgo1, rasgo2, ...]` en `td-ai-profile-traits`
- Cada sesión de reflexión suma +1 pt al score (máx 5 sesiones = 5 pts)
- El botón "Guardar en diario" solo aparece en el primer mensaje de reflexión del usuario

---

## Indicadores Técnicos

```javascript
calcRSI(closes, period=14)          // RSI con Wilder smoothing
calcEMA(closes, period)              // EMA con k = 2/(period+1)
calcEMASeries(closes, period)        // Serie completa EMA
detectCross(closes)                  // "golden" | "death" | null (EMA 7/25)
detectCross50_200(closes)            // "golden" | "death" | null (EMA 50/200)
detectRSIDivergence(ohlcArr, rsiArr) // {type:"bullish"|"bearish"} | null
detectChannelAlert(ohlc)             // Canal alcista/bajista con calidad %
detectBearishPennant(ohlc)           // Banderín bajista + falso breakdown
detectFVGs(klines, price)            // Fair Value Gaps abiertos
calcSRLevels(highs, lows, price)     // Soporte/Resistencia
```

---

## Componentes React

| Componente | Descripción |
|---|---|
| `App` | Componente principal, estado global, save/load |
| `ChatTab` | Chat IA + reflexión psicológica + datos Binance |
| `AlertasTab` | Monitor indicadores con WebSockets + feedback |
| `CalendarioTab` | P&L por día/mes |
| `HorariosTab` | Registro patrones horarios con estadísticas DOW |
| `GoalTracker` | Progreso objetivo $7,641 |
| `PositionAdvisor` | Consejos de gestión de posiciones |
| `ProfileAnalysis` | Análisis escrito automático del trader |
| `EmaDisplay` | Visualización EMA 7/25 + 50/200 en alertas |
| `ModalCloseEth` | Cierre posición ETH legado |
| `ModalCerrar` | Cierre posición (TP/SL/Manual/Breakeven) |
| `ModalPos` | Nueva / editar posición |
| `TpRows` | Métricas TP/cierres en perfil |
| `PriceField` | Input precio con clear on focus |

---

## Reglas de Trading (invariables)

1. **Stop Loss es Ley** — definido en entrada, siempre respetado
2. **Apalancamiento ≠ Inversión** — futuros: entrar, golpear, salir
3. **Sin ego** — probabilidades matemáticas
4. **Trailing Stop estructural** — mover SL solo con nuevo HH en 4H/1D
5. **No abrir sin tesis técnica**

**Estrategia principal:** cubrir ineficiencias FVG + patrones chartistas (cunas, banderines, canales)

---

## Flujo de Actualización

```bash
# 1. Editar fuente
vim trading-diary.jsx

# 2. Compilar
node build.js

# 3. Sincronizar
cp trading-diary.html index.html

# 4. Commit y push
git add trading-diary.jsx trading-diary.html index.html
git commit -m "feat: descripción"
git push -u origin <branch>
```

### Restricciones JSX (TypeScript/UMD sin Babel)

- No `?.` optional chaining → usar `(x && x.prop) || default`
- No `??` nullish coalescing → usar `|| default`
- No `async ({destructured}) =>` → usar `async function(p){ const {a}=p; }`
- No IIFEs `(()=>{})()` dentro de JSX → extraer a función nombrada
- Todos los divs deben estar balanceados en cada rama condicional

---

## Historial de Versiones

| Fecha | Cambios |
|---|---|
| Nov 2024 | Primera operación (LINK, RENDER) |
| Mar 2026 | App creada — 239 ops Quantfury |
| 23/03/2026 | 246 ops (PDF oficial), Supabase sync, Netlify deploy |
| 24/03/2026 | Chat IA, Alertas RSI+EMA, GoalTracker, PositionAdvisor, Horarios DOW |
| 25/03/2026 | Alertas configurables por activo (2 pasos: buscar → confirmar), banderín bajista, canales mejorados, feedback de patrones, SL Breakeven separado, reflexiones IA en score |
| 26/03/2026 | Eliminado diario psicológico manual (reemplazado por reflexión IA en Chat), análisis PDF historial Quantfury, fix inputs RSI en config alertas, botón Reconectar mejorado |
