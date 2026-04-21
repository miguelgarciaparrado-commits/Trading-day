-- add_quantfury_import.sql — Quantfury historical trade storage
-- Execute once in Supabase SQL editor.
--
-- Stores imported Quantfury trades (closed) and open position snapshots.
-- The app currently uses localStorage (td-qf-trades, td-qf-open, td-qf-meta).
-- This table is optional — run it if you want cross-device persistence.

CREATE TABLE IF NOT EXISTS public.quantfury_trades (
  id             BIGSERIAL       PRIMARY KEY,
  user_id        TEXT            NOT NULL DEFAULT 'miguel',
  import_hash    TEXT            NOT NULL,
  imported_at    TIMESTAMPTZ     NOT NULL DEFAULT NOW(),

  -- Identity
  asset          TEXT            NOT NULL,
  direction      TEXT            NOT NULL,   -- 'long' | 'short' | 'unknown'
  status         TEXT            NOT NULL DEFAULT 'closed', -- 'closed' | 'open'
  category       TEXT,                       -- 'stocks' | 'crypto' | 'forex' | 'unknown'

  -- Prices (entry/exit weighted averages)
  entry_avg_price NUMERIC,
  exit_avg_price  NUMERIC,

  -- Size
  total_size_usd NUMERIC,

  -- P&L
  pnl_usd        NUMERIC,
  pnl_pct        NUMERIC,

  -- Timing
  opened_at      TIMESTAMPTZ,
  closed_at      TIMESTAMPTZ,
  duration_hours NUMERIC,

  -- Complexity
  num_additions  INTEGER         NOT NULL DEFAULT 0,
  num_partials   INTEGER         NOT NULL DEFAULT 0,

  -- Auto-detected flags
  auto_flags     JSONB,
  -- {averaged_down, scaled_winner, held_over_30d, micro_gain, large_loss, catastrophic_loss}

  -- Classification
  source         TEXT            NOT NULL DEFAULT 'imported_quantfury',
  completeness   TEXT            NOT NULL DEFAULT 'imported_minimal',

  -- Raw parsed rows for audit
  raw_rows       JSONB
);

CREATE INDEX IF NOT EXISTS idx_qf_trades_user ON public.quantfury_trades (user_id, status);
CREATE INDEX IF NOT EXISTS idx_qf_trades_asset ON public.quantfury_trades (asset);
CREATE INDEX IF NOT EXISTS idx_qf_trades_hash ON public.quantfury_trades (import_hash);

-- Unique constraint: same position (by symbol + opened_at) cannot be imported twice
CREATE UNIQUE INDEX IF NOT EXISTS idx_qf_trades_dedup
  ON public.quantfury_trades (user_id, asset, opened_at)
  WHERE status = 'closed';

ALTER TABLE public.quantfury_trades ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS qf_trades_all ON public.quantfury_trades;
CREATE POLICY qf_trades_all ON public.quantfury_trades FOR ALL USING (true) WITH CHECK (true);

COMMENT ON TABLE public.quantfury_trades IS
  'Imported Quantfury historical trades. Source of truth is localStorage (td-qf-trades / td-qf-open). This table is for cross-device sync only.';
