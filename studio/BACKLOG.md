# BACKLOG — Producer

Ranked, ticket / owner / estimate in sessions (not hours). Nothing here is a new feature — Alpha is already long complete, so per Gate 3 rules ("no new features after Alpha") this list is deliberately debt-and-polish only.

| # | Ticket | Owner | Est. | Priority | Status |
|---|---|---|---|---|---|
| 1 | Initialize git, first commit, `.gitignore` check | Technical Director | 1 session | P0 — do this first, before anything else touches the code | **BLOCKED in-sandbox** — see STATE.md. Needs to be run on Kevin's own machine; also left inert `.git`/tmp-file cruft in the project root to clean up first |
| 2 | `npm install`, confirm app boots clean on this machine | Technical Director | 1 session | P0 | **Done** — deps installed, Electron confirmed launchable; full GUI boot unverifiable in-sandbox (no root, missing libgtk) |
| 3 | Produce a real packaged build (`npm run build`), fresh-install test | Build & Release | 1 session | P0 | **Done** — real Windows zip produced (`dist4/`), verified contents via asar listing; fresh-install test still needs to happen on an actual Windows machine |
| 4 | Wrap save/load `JSON.parse` in try/catch, fail gracefully on corrupt save | Technical Director | <1 session | P1 | **Done** — verified with a live repro |
| 5 | Delete dead code: `src/data.js`, `src/ui/hud.js`, 7 `.fuse_hidden*` files | Technical Director | <1 session | P1 | **Partial** — flagged + excluded from the shipped build; physical deletion needs Kevin (delete-approval tool unavailable this session) |
| 6 | Settings screen: volume slider, mute persists, credits screen | UI/UX | 1 session | P1 | **Done** — volume/mute persist via new settings.json; version number also added (pulled this forward from #7) |
| 7 | Version number visible somewhere in-game (title screen or settings) | UI/UX | <1 session | P2 | **Done** (delivered as part of #6) |
| 8 | Controls/how-to-play doc (even a single help screen) | UI/UX | <1 session | P2 | Not started |
| 9 | Store page copy + 3-5 screenshots + short capture, if Kevin wants distribution | Build & Release | 1 session | P2 — only if shipping publicly | Not started |
| 10 | Lightweight economy simulation script (sanity check, not a rewrite) | Systems & Economy | 1 session | P3 | Not started |
| 11 | Decide + implement a "career complete" beat at BC/Field Chief, or confirm open-ended is intentional | Creative Director | 1 session | P3 | Not started |
| 12 | Endless Mode — currently locked "Coming Soon"; decide whether it's in scope at all | Producer + Creative Director | scoping conversation first | P4 — explicitly out of Gold scope unless Kevin wants it | Not started |
| 13 | Clean up dist/ dist2/ dist3/ folders (dist2 has a truncated invalid zip, dist/dist3 are superseded by dist4) plus the inert .git/tmp-file cruft from ticket #1 | Kevin (local) | 5 minutes | P1 — new, added this session | Not started — sandbox can't delete these either |

## Polish reserve
Not tracked historically (no studio process existed until now). Given the game is functionally complete, treat **100% of remaining work as the polish/finishing phase** — there's no feature budget left to protect from, which is the good version of this problem to have.
