════ STUDIO STATE ════
PROJECT:      Ashfall Fire Co. · Electron (vanilla JS, no framework)
MILESTONE:    Gate 4 (Beta) PASSED · Gate 5 (Gold) NOT PASSED — 6 items outstanding
UPDATED:      2026-09-02 (Endless Mode cut · dev console stripped · bug list empty)

BURN:         ~38u this window · ~117u running total · see BURN.md

ARTEFACTS:    CHARTER v1 · PILLARS v1 · ARCHITECTURE v2 · SAVE v2 · BUDGET v1 · ECONOMY v1
              · BACKLOG v2 · BUGS v3 · COMMITMENTS v2 · ASSUMPTIONS v1
              · BUILD 1.0.0 — dist/ (installer + zip, built 2026-08-29 on real Windows)

LAST DONE:    SCOPE CUTS (2026-09-02) — both of Kevin's calls executed:

  ✓ Endless Mode CUT. Menu button, #screen-endless markup, click handler and the
    ENDLESS MODE SCREEN CSS block all removed. The main menu is now New Career /
    Continue / Load / Settings / Credits / Erase — every item does something.
  ✓ Dev console STRIPPED. The 178-line DevConsole module, its markup, its CSS, the
    backtick keybinding and all eight dev helper functions are gone. No godmode,
    no setrank, no maxstats in the shipped build.
    Surfaced a real bug in the process: the "FIX NOW" apparatus-fault button's only
    feedback when out of actions was a DevConsole.log() line the player could never
    see — pressing it did nothing visible. Now a warning toast plus a failure sting.
  ✓ Verified: shipped asar has no DevConsole, no godmode, no backtick handler, no
    dev or endless markup/CSS. App boots, one window, ZERO renderer console errors —
    which matters here, since a missed reference would have thrown at init.
    game.js 191513 -> 184875 bytes, index.html 49750 -> 47070, style.css 85093 -> 82825.
  ✓ npm test still green (37 checks, 2 suites).

  ── previous round ──
              S3 FIX + TEST SUITE (2026-09-02):

  ✓ Settings slider debounced — 300ms trailing, so a full drag is one disk write
    instead of one per pixel. Mute button and checkbox write immediately, and both
    now go through the single persistAppSettings() path. Pending writes flush on
    beforeunload and on visibilitychange→hidden so nothing is lost at quit. A failed
    settings write raises a warning toast rather than failing silently.
    Verified: 15/15 checks against the real block extracted from src/game.js.
  ✓ Test suite added to the repo — `npm test`. Two suites, 37 checks:
    test/save-handlers.test.cjs drives the real main.js IPC handlers against a stubbed
    electron module (happy path, EPERM on a read-only save, circular-ref serialise
    failure, slot metadata, corrupt-save quarantine regression, delete, settings
    fallback); test/settings-debounce.test.cjs exercises the extracted debounce.
    These previously lived in a temp folder and were lost when it was cleared — they
    are in version control now. Confirmed excluded from the packaged asar.
  ✓ Rebuilt and smoke-tested: installer + zip current, app boots, one window, 4 procs.

  ── previous round ──
              S2 FIXES TICKET (2026-08-30) — both S2 bugs from the audit closed and shipped:

  ✓ Save-write hardening. All write paths now go through an atomic `safeWriteJSON()`
    (serialise → write .tmp → rename), so a failed write leaves the previous save intact
    instead of a truncated file. `ensureSaveDir()` returns false rather than throwing.
    Handlers return { success, error } with plain-English causes (disk full / read-only /
    locked by another program). Renderer raises a toast + failure sting; the slot button
    shows "Failed" rather than lying with "Saved ✓"; Erase no longer greys out the menu
    when the delete failed. Definition of Done met — visual response, audio response,
    failure state, prior save survives.
    Verified: 19/19 automated checks driving the real IPC handlers via a stubbed electron
    module, including a live EPERM on a read-only career.json.
  ✓ Single-instance lock. Second launch quits itself and focuses the open window.
    Verified on the packaged build: launched twice, process count held at 4, one window.
  ✓ Rebuilt and re-verified: dist/ installer + zip contain all fixes, app boots clean.

  CAVEAT: the save-failure toast has never been seen on screen — it only fires on a real
  write failure. Markup, CSS and wiring are all in the asar and the logic is tested. To
  force one: make %APPDATA%/ashfallfireco/saves/career.json read-only, then save in game.

  ── previous round ──
              Packaging readiness audit. First session run on the actual Windows target
              rather than the Cowork sandbox, so several things blocked since 14 Aug cleared:

  ✓ THE APP LAUNCHES. First time anyone has verified this. Packaged exe boots, 4 processes,
    BrowserWindow opens maximized at 1936x1048, <title> applied from index.html, renderer
    memory ~85MB, zero entries in the Chromium log (no errors, no warnings, no console output).
    Verified on both the old dist4 build and the fresh dist build.
  ✓ NSIS INSTALLER NOW EXISTS — "dist/Ashfall Fire Co Setup 1.0.0.exe" (76MB) + blockmap,
    alongside the zip (104MB). Every previous build had emitted zip + win-unpacked only;
    the nsis target had never actually produced an installer in the sandbox. It builds fine
    on real Windows. This was the single biggest packaging gap and it is closed.
  ✓ GIT IS UNBLOCKED AND COMMITTED. The repo was jammed by a stale 0-byte .git/index.lock
    dated 14 Aug — debris from the failed sandbox git init. No git process was holding it.
    Removed. First commit made on 2026-08-30: a626239, 42 files, branch master, no remote,
    no node_modules or build output. Version control is no longer an outstanding item.
  ✓ .gitignore fixed: was `dist/` only, which does not match dist2/dist3/dist4 — a `git add .`
    would have committed ~310MB of superseded build output into the first commit. Now `dist*/`.
  ✓ Credits name corrected: "Kevin Forrester" → "Kevin Oxley" (src/index.html:967).
    Verified present in the rebuilt app.asar.
  ✓ Static audit: all 20 packaged JS files parse clean. app.asar contains exactly the 20
    intended files — no data.js, no hud.js, no .fuse_hidden*. No "Chicago"/"CFD" leaks remain.
    preload is correctly context-isolated (contextIsolation true, nodeIntegration false).
    Settings/credits/version/window-controls all wired and defensively guarded.

IN FLIGHT:    none (clean stop)

GATE 5 (GOLD) — OUTSTANDING:
  1. NOBODY HAS PLAYED IT. Boot is verified; a full career on the packaged build is not.
     This is the last real unknown and no amount of static checking substitutes for it.
     It is now the ONLY item standing between here and a defensible Gold call on the
     software itself.
  2. Presentation, if this is ever to sell rather than just ship: src/assets is empty
     (all visuals are CSS and code-generated SVG), audio is five synthesised Web Audio
     effects with no music, and there are no store assets or screenshots. Not gate
     blockers for a personal release; they are the whole game for a commercial one.
  ✓ (was 2) Endless Mode placeholder — CUT 2026-09-02.
  ✓ (was 3) Dev console in retail — STRIPPED 2026-09-02.
  ✓ (was 4) Save WRITES unguarded — FIXED 2026-08-30.
  ✓ (was 5) Settings slider write amplification — FIXED 2026-09-02.
  ✓ (was 6) No single-instance lock — FIXED 2026-08-30.
  BUGS.md now has an empty Open section. Items 1-3 above are decisions and a
  playthrough, not defects.

POLISH / HOUSEKEEPING (not gate blockers):
  - Branding inconsistency: the product is "Ashfall Fire Co." but all in-game text says
    "Firehouse 12", including the credits line "Thanks for playing Firehouse 12."
    Deliberate (Firehouse 12 is the station within the Ashfall Fire Department) or a
    rebrand leftover? Needs a one-line decision from Kevin.
  - Installer is unsigned — Windows SmartScreen will warn on first install. Normal for
    an indie release; worth knowing before strangers see it.
  - Dead code still physically present: src/data.js, src/ui/hud.js, 7 .fuse_hidden* files.
    Excluded from the build; .fuse_hidden* is gitignored, but data.js and hud.js are staged
    into the first commit. Deletable now (no sandbox restriction on this machine).
  - dist2/, dist3/, dist4/ superseded (~310MB). Now gitignored. Safe to delete.
  - No controls/how-to-play doc, no store assets or screenshots.

NEXT 3:
  1. Kevin plays a full career on dist/win-unpacked/"Ashfall Fire Co.exe" — or installs via
     the new Setup .exe, which also tests the install path. This is gate item #1 and blocks Gold.
  2. ✓ DONE — first commit made 2026-08-30 (a626239, 42 files, no build output or
     node_modules). The project is finally under version control.
  3. Answer the last open question — "Firehouse 12" vs "Ashfall Fire Co." naming — and
     decide whether to delete the dead .fuse_hidden* files (see housekeeping below).

BLOCKED ON USER: the play session · the Firehouse 12 / Ashfall Fire Co. naming question ·
                  whether to delete the dead .fuse_hidden* files (not in git — deletion is
                  permanent, so left alone pending Kevin's word)
NOTE:         node_modules/electron holds the LINUX binary (installed in the old Cowork
              sandbox), so `npm start` will not run on this machine. Packaging is unaffected —
              electron-builder pulls win32 electron from its own cache. Run `npm ci` locally
              if you want to launch the dev build directly.
RISK:         Down substantially from last round — the app is now known to launch and a real
              installer exists. The remaining risk is entirely "shipped without anyone playing
              the packaged build," which only Kevin can retire.
════════════════════
