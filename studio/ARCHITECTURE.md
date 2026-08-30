# ARCHITECTURE — Technical Director audit (Adoption mode)

## Stack
Electron 28 desktop app. Main process (`main.js`) is thin: window creation + IPC handlers for save/load/window controls. No Node integration exposed to the renderer (`contextIsolation: true`, `nodeIntegration: false`) via `preload.js` — this is the *correct* Electron security posture and it's already done right.

Renderer is a single ES module entry (`src/index.html` → `<script type="module" src="game.js">`), vanilla JS, direct DOM manipulation (`document.getElementById`, `innerHTML`), no framework, no bundler, no build step for the renderer. Given the content-heavy, screen/modal-driven nature of the game, this is a reasonable choice — not a hack.

## File layout (live code only)
```
main.js              Electron main process, save IPC, window chrome
preload.js            contextBridge — clean, minimal, correct
src/index.html        all screens/modals as DOM, one big markup file
src/style.css         1470 lines, dark firehouse theme, CSS custom properties
src/game.js           3688 lines — the whole game loop, one `Game` IIFE closing over `state`
src/data/roster.js     crew roster, bond modifiers, call pools by unit/neighborhood
src/data/calls.js      call type definitions
src/data/events.js     academy/crew/firebell/complication/consequence events
src/data/exams.js      written exam question bank, oral board scenarios, vacancy stories
src/data/exams_v2.js   expanded/adaptive exam bank (imported by engine/exams.js)
src/data/dlc.js        DLC call/banter content, ported from an earlier Python prototype
src/data/arcs.js       character story arcs (bond-gated multi-stage storylines)
src/engine/career.js   backgrounds, base stats, rank tables, promotion copy, default state factory
src/engine/calls.js    call tactics, size-up options, role/apparatus/command choice tables
src/engine/progression.js  officer room configs, probie tasks, briefings, conflict events, drills
src/engine/v2.js       SAVE_VERSION, migrateState(), difficulty settings, condition/injury helpers
src/engine/exams.js    written/oral exam session logic
src/engine/incidents.js dynamic incident staging, difficulty-scaled timers
src/ui/screens.js      map builder, portrait SVG builder, particle fx (imported)
```

## State shape
Single mutable `state` object, closed over by the `Game` IIFE in `game.js` (no external store, no framework state management — appropriate at this scale). Contains: identity (name/background/track/rank), six core stats, roster with per-member bond/status, condition (stress/injury/PTSD risk/counseling), discipline (points/hearings/suspended), arcs progress, career history feed, exam history (seen questions, adaptive tier), career record (saves/crits/failures/commendations), and phase/shift bookkeeping. This is a well-designed shape for a save-driven career sim — not overloaded, not under-modeled.

## Save system: present and versioned, better than most hobby projects
`SAVE_VERSION = 2` with a genuine, non-destructive `migrateState()` that back-fills every field a v1 save might be missing before touching v2 fields. Autosave fires after essentially every state-changing action in `game.js` (grep shows 15+ call sites — after academy events, shift end, crew events, etc.), plus three manual save slots with slim metadata for a load-game picker, plus a full save/load modal in-game. This is a real, working save architecture, not a stub.

**Gap:** `main.js`'s `load-game`/`load-slot` handlers call `JSON.parse` on the raw file with no try/catch. A corrupted or truncated save file will throw inside the IPC handler and the promise will reject rather than fail gracefully — the Gold-gate "corrupt save fails gracefully" checklist item currently fails. Small, cheap fix.

## Load-bearing hacks
None found that would block shipping. The codebase does not use `localStorage` (correctly routes everything through the Electron IPC save system), has no global mutable variables outside the `Game` closure, and the module boundaries (data vs. engine vs. ui) are honored — nothing was found reaching across layers in a way that would fight a future contributor.

## Dead code (found via import-graph check, not assumption)
- **`src/data.js`** (2254 lines) — a full legacy monolith, **not imported by anything**. Superseded by the `src/data/` + `src/engine/` split. Marked with a DEAD CODE banner (2026-08-14) and excluded from the packaged build via `package.json`'s electron-builder `files` list. Not physically deleted — see note below.
- **`src/ui/hud.js`** (79 lines) — not imported anywhere. HUD rendering lives inline in `game.js` instead. Marked and excluded from the build, same as above.
- **Seven `.fuse_hidden*` files** under `src/` and `src/data/` (dated May 31–Jun 1) — some containing **pre-rebrand content** (`buildChicagoMap`, `CAPTAIN_CFD_DIRECTIVES`, `CREW_CONFLICT_EVENTS`), confirming they're stale copies from before the Firehouse 51 → Ashfall rebrand. **Update (2026-08-14):** origin re-diagnosed during the production round — this Cowork sandbox mounts the project folder over a filesystem that rejects `unlink()`, and these are almost certainly leftovers from an earlier session's editor or tooling hitting that same wall mid-write, not manually-created swap files. Already excluded from the packaged build (see below) — was a real risk: the initial build before this fix shipped these pre-rebrand strings straight into the `.asar`.
- **Deletion status:** none of the above were physically deleted. The in-session file-delete approval tool was denied (this is a non-interactive run with no way for Kevin to click "yes"), and destroying ~2,300 lines of old work without a real confirmation felt like the wrong call. **Action for Kevin:** delete these seven files yourself in Explorer whenever convenient — they're inert and excluded from the build either way, so there's no urgency.

## No version control
There is no `.git` anywhere in this project, and — new finding — **git cannot be initialized from inside this Cowork sandbox at all.** The mounted project folder rejects `unlink()`, which git's object database requires for its atomic tmp-file-then-rename write pattern. A `git init` + first commit attempt left a broken, inert `.git/` directory and some stray `tmp_obj_*`/lock files in the project root — harmless, but worth a manual delete alongside the `.fuse_hidden*` cleanup. **Real fix: run `git init` directly on your Windows machine**, outside this sandbox — a normal local filesystem doesn't have this restriction. See the chat report for exact commands.

## Performance posture
No formal budget was ever written (no `BUDGET.md` existed before this audit). Given it's a DOM-driven UI with modest per-shift render volume (HUD bars, event feed, a handful of modals), a 60fps target is almost certainly a non-issue — the risk surface is load time (start-of-game asset/screen population) and memory growth in `state.history`/`careerLog` over a very long career, which `recordHistory()` already caps at 400 entries. No measured numbers exist yet; see `BUDGET.md` for the declared targets to measure against.

## Verdict: **BUILD ON**
This is not a codebase that needs a rewrite. The architecture is sound, the save system is genuinely good, there's no spaghetti and no localStorage-style shortcuts. The gap between "functional" and "shippable" is entirely in the unglamorous 20%: packaging, version control, dead-code removal, and the professional furniture (settings/credits/volume) — not in the game code itself.
