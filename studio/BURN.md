# BURN — usage ledger

WINDOW_CAPACITY: unset (no calibration data yet — first real session). Default assumption ~60u/5hr window per skill defaults; update via `STUDIO: CALIBRATE [n]` once Kevin reports a real limit hit.

## Window 1 (adoption audit)
| Activity | Units (est.) |
|---|---|
| Technical audit (file reads, import-graph checks, architecture review) | ~10u |
| Design audit (pillars/economy reverse-engineering) | ~4u |
| Gap report + backlog | ~3u |
| Studio artefact writes (11 files) | ~6u |
| **Total window 1** | **~23u** |

## Window 2 (kickoff + production round: P0/P1 backlog)
| Activity | Units (est.) |
|---|---|
| Kickoff + commitments | ~4u |
| git troubleshooting (init attempts, diagnosis, cleanup investigation) | ~6u |
| npm install + postinstall fix + syntax checks across all source files | ~5u |
| xvfb/GTK boot investigation (dead end, no root in sandbox) | ~3u |
| electron-builder packaging — 4 build attempts (2 full runs at ~5min real time each, plus 2 short/failed) | ~14u |
| Corrupt-save fix + verification repro | ~4u |
| Dead-code flagging + build exclusion + rebuild/verify | ~5u |
| Settings/credits screen (main.js IPC, preload, Sound module rework, HTML, verification rebuild) | ~10u |
| Studio artefact updates (STATE, BACKLOG, ARCHITECTURE, SAVE, BUGS, COMMITMENTS) | ~5u |
| **Total window 2** | **~56u** |

**Running total across both sessions: ~79u.** Still no real calibration point (Kevin hasn't hit a limit yet) — update via `STUDIO: CALIBRATE [n]` the first time a session actually gets cut off.
