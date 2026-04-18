# Migrations

Audit-project migrations. **Nothing here is executed automatically.**

## Current persistence model

Trading-day stores everything as a single JSON blob in Supabase
`trading_data.data` (one row per `user_id`). Closed trades live inside
the array `data.xhist`.

There is no relational `trades` table today, so SQL files in this
directory describe the **target** schema. The v1 auditor attaches the
same fields to each `xhist` entry at runtime.

## Files

| File | Purpose | Status |
|------|---------|--------|
| `add_audit_fields.sql` | v1 audit fields (sl_initial, thesis_text, audit_report, broker, …) | Not executed |

## Running a migration (future)

If/when the project migrates to a relational model:

```bash
# Via Supabase SQL editor, paste the file contents, review, run.
# Or via psql:
psql $DATABASE_URL -f migrations/add_audit_fields.sql
```

Until then, mirror these fields in the JSON schema when you modify
`xhist` entries.
