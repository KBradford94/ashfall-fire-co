# SAVE — schema and migration (as built)

**Version key:** `state.saveVersion`, current `SAVE_VERSION = 2` (`src/engine/v2.js`).
**Migration:** `migrateState(s)` — non-destructive, back-fills every v1 field then every v2 field with sane defaults. Runs on load. Confirmed safe pattern: never deletes or overwrites an existing field, only fills gaps.

**Storage:** Electron `app.getPath('userData')/saves/`. Autosave → `career.json`. Manual slots 1–3 → `career_slot{n}.json`, each wrapping `{ meta, save }` where `meta` is a slim summary (name/rank/track/unit/shiftNumber/savedAt) used by the load-game picker without deserializing the full save.

**Fixed (2026-08-14):** `main.js` now has a `safeReadSave()` helper used by `load-game`, `load-slot`, and `list-slots`. A corrupted save is quarantined to `<name>.corrupt-<timestamp>.bak` (nothing is silently destroyed) and the handler returns `null` — the existing "no save" contract — instead of throwing. Verified with a standalone repro (malformed JSON in a temp save file: quarantines cleanly, `load-game` returns `null`, no crash). `list-slots` still correctly reports a quarantined slot as `meta: null` (empty), not a fake occupied slot.

**Not yet exercised:** no automated test ever loads a v1 save through `migrateState()` to confirm the fill-in is complete for every field `game.js` actually reads. Given the size of `state`, worth a one-time manual check: create a minimal v1-shaped save, load it, confirm no `undefined` reads in the console.
