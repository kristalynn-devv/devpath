# PyPath — Python for AI

A Thai-language web app for learning Python through to AI engineering, from first syntax to
shipping.

No accounts, no backend, no code execution in the browser. Progress and quiz results live in the
learner's own `localStorage` and go nowhere else.

## What's in it

- **5 courses, 40 lessons** — fundamentals → ML → deep learning → LLM/RAG → AI engineering
- Concepts, worked code examples, exercises, and a comprehension quiz in every lesson
- **Adaptive coach** — recommends where to start from your first pass at a three-tier
  assessment bank, one per course
- Mobile and desktop; course and lesson selection is driven by the URL hash

## Getting started

Node.js 18 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000

Production is a static export into `out/`:

```bash
npm run build
npx serve out
```

Deploying to Cloudflare Pages: framework preset **Next.js (Static HTML Export)**, build command
`npm run build`, and build output directory **`out`** — not `next`, not `.next`.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build — required before `npm test` |
| `npm run start` | Serve the production build |
| `npm run typecheck` | TypeScript, strict |
| `npm test` | Playwright — needs Chrome and a current build |
| `npm run format` | Prettier |
| `python3 scripts/check-examples.py` | Lint and actually run the code samples in courses 2–5 |

That last one exists because a course full of examples that do not run is worse than no examples.

## Scope

Product detail in [`PRD.md`](PRD.md); current state of the work in [`HANDOFF.md`](HANDOFF.md).

## License

[MIT](LICENSE) © 2026 Kristalyn Narongpiyawatha
