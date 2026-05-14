# Steel Socratic

Steel-manning **Socratic ladder** for a belief or fuzzy question: reframed question, stepwise probes with branch hints, testable cruxes, and an explicit “how to update your mind” policy. **BYO OpenAI API key** (browser → your session only).

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · OpenAI Chat Completions (JSON mode)

## Run locally

```bash
npm install
npm run dev
```

## API

`POST /api/socratic` · Header `Authorization: Bearer <key>`

Body: `seed` (claim/question), optional `context`, optional `depth` (2–6), optional `model`.

## License

MIT
