# PILLARS — reverse-engineered from the build

Written by the Director from what's actually implemented, not from an original design doc (none exists on disk). Treat these as a hypothesis to confirm with Kevin, not gospel.

**P1 — Every call is a decision, not a cutscene.** Dispatch calls are never passive: size-up → crew assignment → tactical choice → roll, every time, at every rank (with rank-specific variants: shadow mode for probies, apparatus ops for Driver Engineers, command boards for Captain/BC). Testable constraint: *no dispatch call resolves without at least one player choice that visibly changes the outcome odds.* The code honors this — confirmed by the rank-specific call UI (role choices, DE pump/aerial choices, captain sector choices, BC command choices) all existing as distinct implemented systems.

**P2 — Rank is earned through the whole person, not just call performance.** Promotion thresholds check six stats (physical, knowledge, morale, reputation, leadership, command) plus a calls-required floor, not just a win rate. Testable constraint: *no single stat, maxed alone, can produce a promotion.* Confirmed in `career.js` RANKS/EMS_RANKS thresholds.

**P3 — The crew is the emotional engine, not set dressing.** Bond system, character arcs (multi-stage, bond-gated storylines per named crew member), CO trust (Whitfield), hospital rapport (EMS), discipline/hearings, memorial for fallen crew. Testable constraint: *stat and story consequences of a shift are legible in the debrief screen (crew reaction bubble, stat deltas), not just implied.*

## Where the fun is
In the dispatch-call loop and the crew relationships — that's where the density of implemented systems sits (roster.js, arcs.js, calls.js, events.js are the largest and most detailed data files). The academy and off-duty phases are thinner by comparison; they exist mainly to pace access to the call loop and crew time.

## Stall diagnosis
No design-blocking problem is visible in the code — the systems are coherent and the numbers aren't obviously broken (see ECONOMY.md). The stall reads as **scope-completion fatigue, not a design wall**: the game has an enormous amount of *content* (six ranks × two tracks × rank-specific call UI × character arcs × DLC content × adaptive exams) and comparatively little of the unglamorous 20% that makes something feel *shipped* — no packaged build ever produced, no settings/credits screen, no version control, leftover dead files from the rebrand. That's a classic "kept adding systems, never did the finishing pass" stall, not a "hit an unsolvable problem" stall. Confirm with Kevin (question 3 in intake).
