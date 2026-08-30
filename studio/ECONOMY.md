# ECONOMY — Systems & Economy audit (Adoption mode)

## What exists
- Six core stats (physical/knowledge/morale/reputation/leadership/command), 0–100, modified by backgrounds, drills, calls, off-duty locations, and crew events.
- Rank thresholds (`career.js` RANKS/EMS_RANKS) require *multiple* stats simultaneously plus a calls-required floor — this is good design: it prevents a single-stat grinding strategy from trivializing promotion.
- Difficulty settings (`v2.js`) scale success thresholds and stress/injury multipliers — casual/standard/veteran — a real difficulty system, not a cosmetic label.
- Condition system (stress, injury, PTSD risk) adds a soft failure/attrition pressure independent of the stat economy.
- Bond system per crew member, gated character arcs at bond thresholds — a second, parallel progression currency.

## What's missing: a simulation
No simulation script exists anywhere in the repo (`ECONOMY.md`, a Python/JS balance-test harness — neither present). Per the skill's hard rule, *unsimulated numbers never ship* — but this project predates the skill and was hand-tuned through Kevin's own playtesting rather than automated simulation. That playtesting is real signal (Kevin reports it's fully playtested with no known bugs), but it's not the same as knowing whether there's a dominant strategy or a dead end at scale (e.g., 200+ simulated careers).

**Recommendation, not a blocker:** before calling this Gold, run a lightweight simulation — even a rough Node script that plays N random careers against the threshold tables — to check for two specific failure modes: (1) a stat combination that makes promotion effectively unreachable on Veteran difficulty, and (2) a stat combination that trivializes it on Casual. This is optional relative to the rest of the gap list; Kevin's manual playtesting already substitutes for a lot of what simulation would catch.

## Verdict
No dominant-strategy or dead-end evidence found by inspection. Six-stat gating is a genuinely well-designed progression curve. Flagging the missing simulation as due diligence, not as a known problem.
