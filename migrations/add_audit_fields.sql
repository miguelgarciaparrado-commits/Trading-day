-- ============================================================
-- Migration: add_audit_fields.sql
-- Purpose:   Add post-mortem audit fields to trade records
-- Created:   2026-04-18
-- Status:    NOT EXECUTED — document target schema only
-- ============================================================
--
-- IMPORTANT — Current persistence model:
--
-- This repository stores ALL user state as a single JSON blob in
-- Supabase table `trading_data` (one row per user). Closed trades
-- live as objects inside the JSON array `data.xhist`. There is
-- no relational `trades` table today.
--
-- These DDL statements are therefore the LOGICAL schema that the
-- v1 auditor treats as authoritative. At runtime, the same fields
-- are attached to each xhist entry (see src/agents/postMortemAgent.js)
-- and the whole blob is resaved to `trading_data.data`.
--
-- If/when the project migrates to a relational model, executing
-- this file against Supabase will materialise the same fields as
-- proper columns.
--
-- ============================================================

-- Rule 1 — Stop Loss is Law: initial SL price at trade open (immutable baseline)
ALTER TABLE trades ADD COLUMN IF NOT EXISTS sl_initial numeric;

-- Rule 1 — SL modifications audit trail
-- Each entry: { timestamp: ISO8601, precio_anterior: numeric, precio_nuevo: numeric }
ALTER TABLE trades ADD COLUMN IF NOT EXISTS sl_modifications jsonb NOT NULL DEFAULT '[]'::jsonb;

-- Rule 5 — Technical thesis written at trade open (FVG + chartist pattern)
ALTER TABLE trades ADD COLUMN IF NOT EXISTS thesis_text text;

-- Rule 5 — Optional screenshot URL (Supabase Storage bucket recommended)
ALTER TABLE trades ADD COLUMN IF NOT EXISTS thesis_screenshot_url text;

-- Rule 3 — No ego: true if user reopened same asset within 15 min of SL hit
ALTER TABLE trades ADD COLUMN IF NOT EXISTS reopen_after_sl boolean NOT NULL DEFAULT false;

-- Audit result: 0..5 (one point per rule passed; null before audit)
ALTER TABLE trades ADD COLUMN IF NOT EXISTS audit_score integer;

-- Audit result payload, matches postMortemAgent.js output
-- { score, rules:[{id,name,status,evidence}], summary }
ALTER TABLE trades ADD COLUMN IF NOT EXISTS audit_report jsonb;

-- When the audit last ran; used to locate pending vs audited trades
ALTER TABLE trades ADD COLUMN IF NOT EXISTS audited_at timestamptz;

-- Source broker. Default 'quantfury'; future values: 'margex', 'otro'.
ALTER TABLE trades ADD COLUMN IF NOT EXISTS broker text NOT NULL DEFAULT 'quantfury';

-- Lookup for "pending audits" queries
CREATE INDEX IF NOT EXISTS trades_audited_at_idx ON trades(audited_at);

-- Optional sanity constraint (skip if non-destructive preferred)
-- ALTER TABLE trades ADD CONSTRAINT audit_score_range_chk CHECK (audit_score IS NULL OR audit_score BETWEEN 0 AND 5);
