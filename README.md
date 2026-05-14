# Steel Socratic

Stress-test a **belief, strategy bet, or fuzzy question** with a **steel-manning Socratic ladder**: reframed question, branching steps, testable cruxes, and an explicit policy for **how you should change your mind** with new evidence.

## What it is

A BYOK Next.js app for **epistemic hygiene**—rigorous but kind. You choose depth (steps). Output is JSON suitable for journaling, decision logs, or workshop prep.

## Why it’s useful

- Reduces **overconfidence** before irreversible bets (hiring, architecture, markets).
- Surfaces **cruxes** you can actually run experiments against.
- Separates **values** from **empirical claims** without moralizing.
- Great for **writing and research** when you need to challenge your own thesis.

## Where you can use it

- **Founders & investors** — thesis checks before scaling spend.
- **Policy teams** — structured exploration of tradeoffs (non-partisan framing).
- **Education** — seminar prep and debate coaching.
- **Personal knowledge work** — diary prompts for major life decisions.

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · OpenAI Chat Completions (JSON mode)

## Run locally

```bash
npm install
npm run dev
```

## Production check

```bash
npm run build
npm run start
```

## API

`POST /api/socratic` · Header `Authorization: Bearer <key>`

Body: `seed` (required), optional `context`, `depth` (2–6), `model`.

## Suite brochure

[`docs/neuron-suite-brochure.html`](docs/neuron-suite-brochure.html) · [`docs/neuron-suite-ig-square.svg`](docs/neuron-suite-ig-square.svg)

## License

MIT
