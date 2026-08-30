# ASHFALL FIRE CO. — Virtual Studio project

**Before doing anything in this folder, read `studio/STATE.md`.** It is the studio's
save file: current milestone, completion, artefact versions, next tickets, outstanding
commitments and burn. Work that ignores it will duplicate or contradict work already done.

This project is run by the `virtual-studio` skill. Load that skill for any task here.

## Project facts
- **Game:** Ashfall Fire Co. — Career Simulator (firefighter/EMS career sim; formerly "Firehouse 51," rebranded off the Chicago Fire IP)
- **Engine:** Electron 28, vanilla JS/DOM, no framework, no bundler — locked, do not change without restarting the charter
- **Target device:** Windows desktop (electron-builder targets `win`/nsis + zip)
- **Milestone:** Adoption audit complete, between Beta and Gold — see `studio/STATE.md`
- **Build entry point:** `src/index.html` → `src/game.js`; Electron entry `main.js`

## Structure
```
studio/   design artefacts, backlog, state — the studio's memory
src/      the actual game (data/, engine/, ui/, game.js, index.html, style.css)
main.js   Electron main process
build/    icon assets for electron-builder (not a build output folder)
```

## Non-negotiables for this project
1. **Finished beats big.** No new features (including Endless Mode) until packaging, save robustness, version control, and UI furniture (settings/credits) are done.
2. **This project is past Alpha.** Do not add new gameplay systems without an explicit scoping conversation with Kevin first — see `studio/BACKLOG.md` ticket #12.
3. **Definition of Done applies to every ticket:** works · visual response · audio response · failure state · survives save/reload · holds the frame budget · reads correctly on the target device.
4. **Never pause mid-ticket.** Reach a clean stop, write `STATE.md`, then stop.
5. **Update `STATE.md` at the end of every turn** without being asked.

## Known technical debt (see studio/ARCHITECTURE.md and studio/STATE.md for detail)
- **No git repository exists yet, and it cannot be created from inside a Cowork sandbox** — the mounted
  folder rejects `unlink()`, which git needs. Run `git init` directly on the local Windows machine.
  A failed attempt left an inert `.git/` folder and stray tmp files in the project root — delete those
  first (Explorer), then init for real. Still the top priority.
- Dead code (`src/data.js`, `src/ui/hud.js`, 7 `.fuse_hidden*` files) is flagged with banners and
  excluded from the packaged build as of 2026-08-14, but not physically deleted — same sandbox
  delete restriction. Safe to delete locally whenever convenient.
- ~~`main.js` save/load IPC handlers don't guard against a corrupt save file~~ — **fixed 2026-08-14**,
  corrupt saves now quarantine to `.corrupt-<timestamp>.bak` and load returns `null` instead of throwing.
- ~~Never packaged~~ — **fixed 2026-08-14**, a real Windows zip build exists at `dist4/`. Older
  `dist/`, `dist2/`, `dist3/` folders from earlier attempts in the same session are superseded
  (dist2's zip is truncated/invalid) and safe to delete locally.
- Settings screen, credits screen, and a live version display were added 2026-08-14 — no longer a gap.
- **Not yet verified:** nobody has watched the packaged app actually launch on a real Windows machine.
  All checks so far are code-level (syntax, asar contents, a headless launch attempt that got as far
  as a missing OS library in the sandbox, not an app bug). Do a real launch before calling this done.

## Working from a phone
Replies stay to five lines: done / next / needs you / files changed / burn.
The detail goes in the artefact files, not the thread.
