# Trading Diary — Documentación del Proyecto

**Trader:** Miguel Garcia Parrado  
**Plataforma:** Quantfury (desde noviembre 2024)  
**URL producción:** `https://tradingday.netlify.app`  
**Base de datos:** Supabase — `https://ifqftuqkdgsepvtqwefp.supabase.co`

---

## Descripción

Aplicación web de trading journal personalizada, construida como un único fichero HTML autocontenido (~200 KB). Permite registrar y analizar operaciones de trading, monitorizar indicadores técnicos en tiempo real, recibir alertas push y obtener análisis de IA sobre el mercado.

---

## Stack Técnico

| Componente | Tecnología |
|---|---|
| Frontend | React 18 (UMD, sin bundler) |
| Lenguaje fuente | JSX (compilado con TypeScript API) |
| Estilos | CSS-in-JS inline |
| Datos mercado | Binance REST API + WebSocket |
| Base de datos | Supabase (PostgreSQL) |
| Almacenamiento local | localStorage (backup offline) |
| IA | Anthropic API — claude-sonnet-4-20250514 |
| Hosting | Netlify |

### Compilación

El fichero `.jsx` se compila a JavaScript estándar mediante:

```python
ts.transpileModule(code, {
  compilerOptions: { jsx: JsxEmit.React, target: ES2020, module: None }
})
```

Post-proceso obligatorio: eliminación de comas huérfanas generadas por TypeScript al interpretar operadores `<` y `>` como etiquetas JSX dentro de funciones de componentes.

---

## Arquitectura de Datos

### Sincronización

```
localStorage ←→ App ←→ Supabase (tabla: trading_data)
```

- Cada cambio guarda en localStorage inmediatamente (backup offline)
- 600ms después sincroniza con Supabase via POST con `Prefer: resolution=merge-duplicates`
- Al cargar, Supabase tiene prioridad sobre localStorage

### Estructura Supabase

```sql
CREATE TABLE trading_data (
  user_id text PRIMARY KEY,
  data jsonb
);
ALTER TABLE trading_data DISABLE ROW LEVEL SECURITY;
```

### Payload guardado

```json
{
  "pr":    { "SOL": 91.33, "BTC": 84000, "ETH": 2000, "MSTR": 300, "GOOGL": 170, "LINK": 9.20 },
  "pos":   [ ...posiciones abiertas ],
  "pats":  [ ...patrones chartistas ],
  "jnl":   [ ...entradas diario psicológico ],
  "ps":    { "slOk": 14, "slBroken": 2, ... },
  "xhist": [ ...cierres hechos via app ],
  "horarios": [ ...registros de patrones horarios ],
  "ethClosed": false
}
```

---

## Datos Históricos

- **246 operaciones** del historial oficial Quantfury (PDF 23/03/2026)
- **QUANTFURY_BASE = -$7.471,73** — pérdida total acumulada según Quantfury
- **Objetivo de recuperación: $7.641** (pérdidas de octubre 2025)
- **Posición abierta activa:** SOL/USD Short — capital $600, entrada $85.77, SL $94.40, TP $34
- **ETH Legado:** 1.9521 ETH, entrada media $3.621,58, pérdida realizada -$796.09

---

## Pestañas de la Aplicación

### 1. Resumen
KPIs en tiempo real: pérdida histórica dinámica, ETH legado, P&L posiciones activas, pérdida total, ROI histórico/ETH/activas, tasa ganadora. Botón de cierre de ETH legado con cálculo de resultado final.

### 2. Posiciones
Gestión de posiciones abiertas (nueva, editar, cerrar con precio manual). Incluye **PositionAdvisor**: análisis automático de ratio riesgo/beneficio con consejos de gestión (parciales, trailing stop, BE).

### 3. Historial
246 operaciones con filtros por activo, dirección (Long/Short) y orden. Estadísticas Long vs Short separadas. Las nuevas operaciones cerradas via app se añaden al historial dinámicamente.

### 4. Patrones
Libro de patrones chartistas con contador CONFIRMÓ/FALLÓ por observación. Cada patrón admite URL de imagen externa (TradingView, Imgur, etc.). Historial de activaciones por fecha.

### 5. Perfil
- **Score 0-100** calculado dinámicamente (disciplina SL, calidad cierres, diario, patrones)
- **Análisis escrito automático** via `generateProfileSummary()` — evalúa disciplina, comportamiento de cierre, trading de revancha, calidad del diario
- **GoalTracker**: barra de progreso hacia $7.641 con últimas operaciones ganadoras
- **Diario psicológico** con tipos: Victoria, Error, Lección, Análisis
- **Métricas de riesgo**: SL respetados/eliminados, TP automático/manual, cierres prematuros, BE

### 6. Recuperación
Tabla de escenarios de recuperación ETH por precio: cuánto queda para BE ($4.029) y TP ($9.000).

### 7. Calendario
P&L diario y mensual de las 246 operaciones distribuidas por fecha. Vista de mes con colores verde/rojo por resultado del día.

### 8. Horarios
Registro diario del patrón 19:30-20:00 (cambio de tendencia). Campos: hora exacta, activo, tendencia inicio → giro, resultado (Acierto/Fallo/Pendiente), notas. Estadísticas por día de la semana (Lunes %, Martes %...) para detectar en qué días se cumple más el patrón.

### 9. Alertas
Monitor RSI + EMAs en tiempo real via WebSocket de Binance.

**Alertas estándar BTC (4 preconfiguradas):**
| Temporalidad | Sobreventa | Sobrecompra |
|---|---|---|
| 1H | RSI < 30 | RSI > 70 |
| 4H | RSI < 30 | RSI > 70 |
| Diario | RSI < 30 | RSI > 70 |
| Semanal | RSI < 30 | RSI > 70 |

**Cruces de EMAs:**
- EMA7 cruza sobre EMA25 → 🌟 **Cruce Dorado** (señal alcista)
- EMA7 cruza bajo EMA25 → 💀 **Cruce de la Muerte** (señal bajista)
- RSI sobreventa + EMA7 sobre EMA25 → alerta combinada reforzada

**Alertas personalizadas:** cualquier valor RSI en cualquier activo/temporalidad (ej. BTC Diario RSI = 67).

Notificaciones push al móvil via API `Notification` del navegador.

### 10. Chat
Chatbot con IA (Claude) integrado con datos de mercado en tiempo real.

**Flujo:**
1. Seleccionar activo y temporalidad
2. Pulsar ⚡ para cargar datos de Binance (precio, RSI 14, EMA 7/25/50, estructura HH/HL, volumen relativo)
3. Escribir análisis o pregunta
4. Claude responde con contexto del trader (posiciones abiertas, patrones confirmados, nivel de perfil)

**Efecto en perfil:** cada respuesta incluye `EVALUACION_TRADER:[positivo|negativo|neutro]:[descripción]` que se registra automáticamente en el diario psicológico, influyendo en el score.

---

## Indicadores Técnicos

```javascript
calcRSI(closes, period=14)        // RSI con Wilder smoothing
calcEMA(closes, period)            // EMA con k = 2/(period+1)
calcEMASeries(closes, period)      // Serie completa EMA para cruces
detectCross(closes)                // "golden" | "death" | null
getBinanceData(symbol, interval)   // Precio, RSI, EMAs, estructura, volumen
```

---

## Componentes React

| Componente | Descripción |
|---|---|
| `App` | Componente principal, estado global, save/load |
| `ChatTab` | Chat con IA + carga datos Binance |
| `AlertasTab` | Monitor RSI/EMA con WebSockets |
| `CalendarioTab` | P&L por día/mes |
| `HorariosTab` | Registro patrones horarios con estadísticas DOW |
| `GoalTracker` | Barra progreso objetivo $7.641 |
| `PositionAdvisor` | Consejos de gestión de posiciones |
| `ProfileAnalysis` | Análisis escrito automático del trader |
| `ModalCloseEth` | Cierre posición ETH legado |
| `ModalCerrar` | Cierre posición con precio manual |
| `ModalPostCierre` | Diario post-cierre |
| `ModalPos` | Nueva / editar posición |
| `TpRows` | Métricas TP/cierres en perfil |
| `EmaDisplay` | Visualización EMA 7/25 en alertas |
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

Para modificar la app y desplegar:

```
1. Editar trading-diary.jsx
2. Compilar: ts.transpileModule(code, {jsx:React, target:ES2020})
3. Post-proceso: eliminar comas huérfanas (TS bug con < > en JSX)
4. Eliminar: "use strict", exports.*, Object.defineProperty(exports...)
5. Añadir: const {useState,useEffect,useRef,useCallback} = React;
6. Insertar compiled en HTML template
7. Subir trading-diary.html a Netlify (app.netlify.com/projects/tradingday)
```

**Build script:** `/tmp/build.py`

### Errores conocidos a evitar en el JSX

- ❌ Operadores `?.` y `??` — Babel del visor no los soporta → usar `(x&&x.prop)||default`
- ❌ Strings multilínea con comillas dobles — usar `\n` escapado
- ❌ `async({destructuring})=>` en parámetros — usar `async function(param){ param.field }`
- ❌ IIFEs `(()=>{...})()` dentro de JSX — extraer a componente
- ❌ Divs sin cerrar en tabs — cada `{tab==="X"&&( <div>...</div> )}` debe tener divs balanceados

---

## Historial de Versiones

| Fecha | Cambios |
|---|---|
| Mar 2026 | Versión inicial — 239 ops Quantfury |
| 23/03/2026 | 246 ops (PDF oficial), Supabase sync, Netlify deploy |
| 24/03/2026 | Chat IA, Alertas RSI+EMA, GoalTracker, PositionAdvisor, Horarios DOW |
