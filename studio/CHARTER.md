# CHARTER — Ashfall Fire Co. (reverse-engineered, Adoption mode)

**TITLE:** Ashfall Fire Co. — Career Simulator
**PITCH:** You join the Ashfall Fire Department as a probie and live out a full career — academy, shift work, dispatch calls run through a 3-step incident-command loop, crew relationships, civil service exams, and promotion all the way to Battalion Chief — on either the Suppression or EMS track.
**REFERENCES:** Structurally a *Chicago Fire*-flavored career sim (started life as "Firehouse 51," rebranded off the IP to "Ashfall Fire Co." / Firehouse 12). Genre neighbors: management/career sims with narrative branching (Football Manager's career arc energy, applied to a firehouse).
**ENGINE:** Electron + vanilla JS/Canvas-free DOM UI. Locked — matches the content-heavy, text/branching-choice nature of the game. Correct call; a heavier engine would have bought nothing here.

## 20-minute shape (as built)
Boot to main menu → New Career (name, background, stat preview) → choose Suppression or EMS track → Academy (multi-week events, guest events, stat checks) → assignment to a unit → first shift: rooms (drill/gym/kitchen/study/paperwork/dispatch) → a dispatch call runs through size-up → crew assignment → tactical choice → dice roll → outcome → shift debrief (grade, stat changes, crew reaction) → 48h off-duty (bar/home/training, each with its own effects and a chance of a story event) → repeat.

## Ending
Not a single defined ending — this is a rank-ladder career sim. The "ending" is reaching Battalion Chief (or Field Chief on EMS) and the associated legacy-score narrative beats, or continuing indefinitely. **Gap:** no explicit "career complete" screen/state currently exists once BC/Field Chief is reached — worth deciding whether that's a deliberate open-ended design or a missing beat (see ASSUMPTIONS A1).

## Non-goals (as evidenced by the build)
- Not a tactical firefighting sim — no spatial/physical fire simulation, combat-style resolution is dice + modifiers.
- Not multiplayer.
- Endless Mode (era select, no career progression) is explicitly scoped and stubbed but locked "Coming Soon" — treat as a Phase 2 feature, not core.

## Assumptions
See `ASSUMPTIONS.md`.

## Honest estimate
The core game (career loop, both tracks, exams, arcs, promotion ladder) is **already built and, per Kevin, playtested end-to-end with no known bugs.** Remaining honest estimate to a *shippable* Gold build: 15–25 hours, almost entirely non-feature work (packaging, save robustness, version control, dead-code removal, missing UI furniture, a real polish/QA pass). See GAP report in the studio report for the breakdown.

## Verdict
**Fits the budget** — this is not a from-scratch build. It's an adoption of a functionally complete game that has never been finished in the Gold-gate sense (never packaged, no settings/credits, no version control, some dead code). Recommendation in the report: **IMPROVE IT**, not finish new systems.
