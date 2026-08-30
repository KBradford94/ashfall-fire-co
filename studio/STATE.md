════ STUDIO STATE ════
PROJECT:      Ashfall Fire Co. · Electron (vanilla JS, no framework)
MILESTONE:    Gate 4 (Beta) PASSED · Gate 5 (Gold) NOT PASSED — 6 items outstanding
UPDATED:      2026-08-30 (S2 fixes shipped · repo under version control — first commit made)

BURN:         ~22u this window · ~101u running total · see BURN.md

ARTEFACTS:    CHARTER v1 · PILLARS v1 · ARCHITECTURE v2 · SAVE v2 · BUDGET v1 · ECONOMY v1
              · BACKLOG v2 · BUGS v3 · COMMITMENTS v2 · ASSUMPTIONS v1
              · BUILD 1.0.0 — dist/ (installer + zip, built 2026-08-29 on real Windows)

LAST DONE:    S2 FIXES TICKET (2026-08-30) — both S2 bugs from the audit closed and shipped:

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

GATE 5 (GOLD) — OUTSTANDING, ranked:
  1. NOBODY HAS PLAYED IT. Boot is verified; a full career on the packaged build is not.
     This is the last real unknown and no amount of static checking substitutes for it.
  2. "Endless Mode" ships as a main-menu button → COMING SOON screen with 5 locked era cards.
     Not a softlock (Back works) but it is a placeholder on the front door, and Gold says no
     placeholders. Per LAW 1 the call is cut the button for 1.0, or ship it knowingly. Kevin's.
  3. Dev console ships in the retail build — godmode, setrank, maxstats, setoutcome, adddays.
     Fine if intended as a feature; a cheat menu in a shipped build if not.
  4. Settings volume slider calls saveSettings() on every `input` event — one disk write per
     pixel of drag. Needs debouncing. S3 in BUGS.md. Only open bug.
  ✓ (was 4) Save WRITES unguarded — FIXED 2026-08-30, see below.
  ✓ (was 6) No single-instance lock — FIXED 2026-08-30, see below.

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
  3. Decide Endless Mode: cut the menu button for 1.0, or ship the COMING SOON screen.
     Then the S3 slider debounce — the only bug left open.

BLOCKED ON USER: the play session · the Endless Mode call · dev-console-in-retail call ·
                  the Firehouse 12 / Ashfall Fire Co. naming question
NOTE:         node_modules/electron holds the LINUX binary (installed in the old Cowork
              sandbox), so `npm start` will not run on this machine. Packaging is unaffected —
              electron-builder pulls win32 electron from its own cache. Run `npm ci` locally
              if you want to launch the dev build directly.
RISK:         Down substantially from last round — the app is now known to launch and a real
              installer exists. The remaining risk is entirely "shipped without anyone playing
              the packaged build," which only Kevin can retire.
════════════════════
