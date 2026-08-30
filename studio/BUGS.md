# BUGS

Severity: **S1** blocks play or misses a gate · **S2** degrades · **S3** cosmetic.

## Open

### S3 — Settings volume slider writes to disk on every input event
`src/game.js` — the `input` handler on `#settings-volume-slider` calls
`persistAppSettings()` directly, so dragging the slider issues one `settings.json`
write per pixel of travel.
**Fix:** debounce to ~250ms, or persist on `change` instead of `input`.
Found: 2026-08-29.

## Design / scope, not defects — need a decision from Kevin

- **"Endless Mode" placeholder ships on the main menu.** Button → screen reading
  COMING SOON with five locked era cards. Has a working Back button, so it is not a
  softlock and not an S1 — but Gate 5 says no placeholders, and it is the second item
  on the front door. Cut the button for 1.0, or ship it knowingly.
- **Dev console ships in the retail build** (`godmode`, `setrank`, `maxstats`,
  `setoutcome`, `adddays`, …). Legitimate as a feature; a cheat menu if unintended.
- **Naming:** the product is "Ashfall Fire Co." and every in-game string says
  "Firehouse 12", including the credits line "Thanks for playing Firehouse 12."

## Fixed

- **2026-08-30 — save/delete WRITE paths were unguarded (was S2).** `save-game`,
  `save-slot` and `delete-save` called `writeFileSync`/`unlinkSync` bare; a failed
  write threw an unhandled rejection through IPC that the renderer never caught.
  Now: `ensureSaveDir()` returns a boolean instead of throwing; all writes go through
  `safeWriteJSON()`, which serialises first, writes to `<file>.tmp` and renames over
  the target, so a failure mid-write leaves the previous save intact rather than a
  truncated file; every handler returns `{ success, error }` with a human-readable
  reason (`describeWriteError` maps EACCES/EPERM/ENOSPC/EBUSY/EROFS to plain English).
  Renderer side: `saveGame()` checks the result and raises a toast plus
  `Sound.playFailureSting()`; the slot button shows "Failed" instead of falsely
  claiming "Saved ✓"; Erase no longer greys out the menu buttons when the delete
  failed. `save-settings` uses the same atomic path.
  **Verified:** 19/19 automated checks against the real IPC handlers with a stubbed
  electron module — including a live EPERM on a read-only career.json (returns
  "the save file is read-only or in use by another program", does not throw, previous
  save still loads), a circular-reference serialise failure, corrupt-save quarantine
  regression, and the delete/settings round trips.
  *Not yet seen on screen:* the toast markup, CSS and wiring all ship in the asar and
  the logic is tested, but no one has watched a toast actually appear — it only fires
  on a genuine write failure. To force one: make
  `%APPDATA%/ashfallfireco/saves/career.json` read-only, then trigger a save in game.

- **2026-08-30 — no single-instance lock (was S2).** Two copies of the app could run
  and both write `career.json`, last writer winning and silently destroying a career.
  Now `app.requestSingleInstanceLock()`; a second launch quits itself and focuses
  (restoring if minimised) the window already open.
  **Verified:** launched the packaged build twice — process count stayed at 4, exactly
  one window, second instance exited on its own.

- **2026-08-29 — no installer had ever been produced.** `package.json` declared both
  `nsis` and `zip` win targets, but every build to date emitted only the zip and
  `win-unpacked`; nsis silently never ran in the Cowork sandbox. Rebuilt on the real
  Windows machine: `dist/Ashfall Fire Co Setup 1.0.0.exe` (76MB) now exists.
- **2026-08-29 — `.gitignore` ignored `dist/` but not `dist2/`, `dist3/`, `dist4/`.**
  The first `git add .` would have committed ~310MB of build output. Changed to `dist*/`.
- **2026-08-29 — repo jammed by a stale `.git/index.lock`.** 0 bytes, dated 14 Aug,
  debris from the failed sandbox `git init`; no git process held it. Removed, git works.
- **2026-08-29 — credits credited the wrong surname** ("Kevin Forrester").
  Corrected to "Kevin Oxley" at `src/index.html:967`, verified in the rebuilt asar.
- **2026-08-14 — unguarded `JSON.parse` on corrupt saves** in `load-game`/`load-slot`
  would throw instead of failing gracefully. Fixed via `safeReadSave()`. See `SAVE.md`.

## Not independently confirmed

Kevin reports the game was playtested end to end in an earlier session with no known
bugs. The 14 Aug audit was a static code read; the 29 Aug audit added a real boot test
on Windows (app launches, window opens maximized, zero renderer console output) plus a
full syntax and asar-contents check. **Neither audit is a play session.** A full career
played on the packaged build remains the last open Gold item.
