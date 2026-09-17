# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

PyPath — a Thai-language Next.js web app teaching Python for AI. All learner-facing copy is Thai;
keep it that way. There is no backend, no accounts, no code execution in the browser — progress and
assessment results live only in `localStorage`. `PRD.md` is the scope contract (v0.1, Thai) and
`HANDOFF.md` carries the running build state between sessions; read both before changing behaviour.

**This directory is not a git repository.** There is no history to diff against; `HANDOFF.md` is the
only record of what changed and why.

## Commands

```bash
npm run dev          # next dev on 0.0.0.0
npm run build        # static export to out/ — REQUIRED before npm test
npm run start        # serve out/ on :3000 (after build)
npm run typecheck    # tsc --noEmit (strict)
npm test             # playwright test (browser + unit specs)
npm run format       # prettier --write app tests playwright.config.ts
python3 scripts/check-examples.py   # validate + execute lesson code snippets
```

Static export (`output: "export"` in `next.config.mjs`) writes HTML to `out/` for Cloudflare Pages.
`playwright.config.ts` starts `npm run start` (serves `out/` on :3000) with `reuseExistingServer: true`.
Run `npm run build` first or tests run against stale output. A server already on :3000 will be reused.

Run a single test by title (titles are the stable handle; there are no test ids):

```bash
npx playwright test -g "quiz retry, complete, persist and browser history"
npx playwright test tests/assessment.spec.ts
```

`tests/assessment.spec.ts` mixes plain unit tests (importing `app/assessment.ts` directly, no `page`
fixture) with browser tests in the same file — Playwright runs both.

`scripts/check-examples.py` type-checks nothing; it imports `app/advanced-courses.ts` through node,
asserts every lesson field is non-empty, `ast.parse`s each `code` string, and **executes** snippets
that don't import torch/sklearn/numpy, asserting stdout equals the lesson's `output` field verbatim.
It only covers courses 2–5 (course 1's `app/course.ts` is not checked).

## Architecture

Single route. `app/page.tsx` is the whole UI (`"use client"`) — catalog, lesson reader, quiz, mobile
menu. `app/layout.tsx` only sets `lang="th"` and metadata. No components directory; styling is one
hand-written `app/globals.css` (~1900 lines) of semantic class names (`.lesson-card`, `.app-shell`)
over CSS variables in `:root`. Tests select by role, Thai accessible name, or these class names, so
renaming a class or a Thai label breaks tests.

**Routing is the URL hash, not the router.** Course 1 uses `#lesson-<n>` / `#curriculum`; courses 2–5
use `#course-<id>/lesson-<n>` / `#course-<id>`. `Home` parses `#course-(\d+)` to pick the course,
`CourseView` parses `lesson-(\d+)` (1-based in the URL, 0-based in state) via `hashchange`. Invalid
indices fall back to the catalog rather than throwing.

### Content data

- `app/course.ts` — `Lesson` type + course 1's 8 lessons.
- `app/advanced-courses.ts` — `Course` type + courses 2–5, 8 lessons each.
- `app/courses.ts` — assembles course 1 from `lessons` and spreads `advancedCourses`; this is what
  the UI imports.

A `Lesson` is self-contained prose + one `code`/`output` pair + one exercise + one multiple-choice
question (`choices`, `answer` index, `explanation`). The UI never runs code and must not claim to.

### Assessment (adaptive coach)

- `app/assessment-bank.ts` — questions authored as compact `Row` tuples in `banks`, then expanded at
  module load into `diagnosticBank`. **Level and id are derived from array position**: `id` is
  `c<course>-q<index+1>` and `level` is `floor(index / 4) + 1`, so 12 rows per course = levels 1/2/3
  of 4 questions each. Reordering or inserting a row silently renumbers ids and reassigns levels,
  invalidating stored learner evidence.
- `app/assessment.ts` — pure logic, no React: `readEvidence` (defensive parse), `recordAnswer`,
  `analyze`. An `AnswerFact` keeps `first`, `latest`, `attempts`; grading uses **`first` only**, so
  retaking after seeing the explanation can never inflate placement.
- `app/adaptive-coach.tsx` — `useAssessment` hook (load/persist/validate) + `AdaptiveCoach` UI.

Passing rule (product rule, not a calibrated test — say so in UI copy): a level passes with all 4
answered and ≥3 correct on first attempt; levels must pass consecutively, so a higher level cannot
compensate for a failed lower one. `analyze` returns the target level, weak questions, and a
recommended lesson index.

### localStorage keys

| key | holds |
|---|---|
| `pypath-progress-v1` | course 1 completed lesson indices |
| `pypath-course-<id>-v1` | courses 2–5 completed lesson indices |
| `pypath-evidence-v1-course-<id>` | assessment `Evidence` for that course |

Quiz answers from the lesson reader are stored under `quick-<lessonIndex>` inside the same evidence
blob but are kept out of placement grading. Every read path must survive corrupt or hostile values
without crashing the page (tests write `"{invalid"` and `[0,0,-1,8,1.5,"2",null]` and assert the app
still renders); every write path must catch quota/denied errors and surface the existing warning
instead of throwing. Bump the `v1` suffix if a shape changes.

## Conventions

- Prettier defaults, double quotes, no semicolon-free style. Run `npm run format` before finishing.
- Lucide icons imported individually from `lucide-react`.
- Keep the code dense and comment-free like the existing files; explanation belongs in `PRD.md` and
  `HANDOFF.md`.
- Tests write screenshots to `.leancode/screenshots/` (gitignored) — keep those paths if you touch
  the layout tests.
