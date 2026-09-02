# ASHFALL FIRE CO. — Virtual Studio project

**Before doing anything in this folder, read `studio/STATE.md`.** It is the studio's
save file: current milestone, completion, artefact versions, next tickets, outstanding
commitments and burn. Work that ignores it will duplicate or contradict work already done.

This project is run by the `virtual-studio` skill. Load that skill for any task here.

## Project facts
- **Game:** Ashfall Fire Co. — Career Simulator (firefighter/EMS career sim; formerly "Firehouse 51," rebranded off the Chicago Fire IP)
- **Engine:** Electron 28, vanilla JS/DOM, no framework, no bundler — locked, do not change without restarting the charter
- **Target device:** Windows desktop (electron-builder targets `win`/nsis + zip)
- **Milestone:** Beta passed. One item from Gold — a human playthrough of the packaged build. See `studio/STATE.md`
- **Build entry point:** `src/index.html` → `src/game.js`; Electron entry `main.js`

## Structure
```
studio/   design artefacts, backlog, state — the studio's memory
src/      the actual game (data/, engine/, ui/, game.js, index.html, style.css)
main.js   Electron main process
build/    icon assets for electron-builder (not a build output folder)
```

## Non-negotiables for this project
1. **Finished beats big.** Packaging, save robustness, version control and UI furniture are
   all done as of 2026-09-02. Endless Mode was cut from 1.0, not deferred — reopening it is a
   scoping conversation, not a resumption.
2. **This project is past Alpha.** Do not add new gameplay systems without an explicit scoping conversation with Kevin first — see `studio/BACKLOG.md` ticket #12.
3. **Definition of Done applies to every ticket:** works · visual response · audio response · failure state · survives save/reload · holds the frame budget · reads correctly on the target device.
4. **Never pause mid-ticket.** Reach a clean stop, write `STATE.md`, then stop.
5. **Update `STATE.md` at the end of every turn** without being asked.

## Known technical debt (see studio/ARCHITECTURE.md and studio/STATE.md for detail)
- ~~No git repository exists yet~~ — **resolved 2026-08-30.** The repo was jammed by a stale
  `.git/index.lock` left by the failed sandbox `git init`; removed on the local Windows machine
  and the first commit made. Branch `master`, no remote. `.gitignore` covers `dist*/`.
- ~~`main.js` save/load IPC handlers don't guard against a corrupt save file~~ — **fixed
  2026-08-14**; corrupt saves quarantine to `.corrupt-<timestamp>.bak` and load returns `null`.
- ~~Save *writes* unguarded~~ — **fixed 2026-08-30.** All writes go through an atomic
  `safeWriteJSON()` (write `.tmp`, rename), handlers return `{ success, error }`, and the
  renderer raises a toast plus a failure sting instead of losing progress silently.
- ~~No single-instance lock~~ — **fixed 2026-08-30.** A second launch quits and focuses the
  open window rather than racing on `career.json`.
- ~~Settings slider wrote to disk on every input event~~ — **fixed 2026-09-02**, 300ms
  debounce with a flush on unload.
- ~~Never packaged~~ — **fixed 2026-08-14**, and a real NSIS **installer** now exists too as of
  2026-08-29 (`dist/Ashfall Fire Co Setup 1.0.0.exe`). Earlier builds only ever emitted a zip.
  Older `dist2/`, `dist3/`, `dist4/` folders are superseded and safe to delete.
- ~~Endless Mode placeholder and dev console shipped in the retail build~~ — **both removed
  2026-09-02** on Kevin's call.
- ~~7 `.fuse_hidden*` dead files~~ — **deleted 2026-09-02** (sent to the Recycle Bin rather
  than hard-deleted, since they were gitignored and therefore unrecoverable from history).
  They were the last place `DevConsole`, `godmode` and pre-rebrand "Firehouse 51"/"Chicago"
  strings appeared anywhere in the tree.
- **Dead code still on disk:** `src/data.js` and `src/ui/hud.js`. Excluded from the packaged
  build via `package.json`'s `files` list, banner-flagged, and tracked in git — so deleting
  them is safe and reversible whenever convenient.
- **The app now definitely launches** (verified on Windows 2026-08-29: window opens maximized,
  zero renderer console errors, second-instance lock confirmed). **But nobody has played a full
  career on a packaged build.** That is the last open Gold item.

## Testing
`npm test` runs two suites, 37 checks: `test/save-handlers.test.cjs` drives the real `main.js`
IPC handlers against a stubbed electron module, and `test/settings-debounce.test.cjs` extracts
and exercises the settings debounce from `src/game.js`. Excluded from the packaged asar.
Note `node_modules/electron` holds the **Linux** binary from the old Cowork sandbox, so
`npm start` will not run on Windows — run `npm ci` first if you want the dev launch.
Packaging is unaffected; electron-builder uses its own cache.

## Working from a phone
Replies stay to five lines: done / next / needs you / files changed / burn.
The detail goes in the artefact files, not the thread.
