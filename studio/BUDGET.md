# BUDGET — performance contract (declared now, not previously measured)

No budget existed before this audit. Declaring one so QA has something to measure against, rather than "run it and see if it feels slow."

```
TARGET:      60fps on a mid-range Windows laptop (the actual target device — Electron desktop, not mobile)
FRAME:       16.6ms — this app is event-driven DOM re-render, not a continuous render loop, so
             frame budget matters less than re-render cost per action. Budget instead:
INTERACTION: any button click / dispatch step must update the DOM in <50ms perceived
LOAD:        ≤3s from launch to main menu interactive
MEMORY:      no hard ceiling declared yet; watch state.history / careerLog growth over a
             100+ shift career (already capped at 400 entries by recordHistory — good)
BUILD SIZE:  unmeasured — no packaged build has ever been produced (see GAP report)
ENTITY CAP:  n/a — no simultaneous-actor rendering; roster is small and fixed
```

**Action for Beta gate:** run one real packaged build, time cold launch, and confirm nothing above is being silently violated. This has never been measured because the app has never been packaged.
