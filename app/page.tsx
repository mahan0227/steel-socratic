"use client";

import { useState } from "react";
import { ApiKeyBar, authHeaders, useOpenAISettings } from "@/components/ApiKeyBar";

export default function Home() {
  const settings = useOpenAISettings();
  const { apiKey, model } = settings;
  const [seed, setSeed] = useState(
    "We should always pick microservices over modular monoliths because future scale is inevitable.",
  );
  const [context, setContext] = useState(
    "Series B SaaS, 25 engineers, moderate traffic, compliance-heavy customers.",
  );
  const [depth, setDepth] = useState(4);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  async function run() {
    setError("");
    setOutput("");
    if (!apiKey.trim()) {
      setError("Add your OpenAI API key above.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/socratic", {
        method: "POST",
        headers: authHeaders(apiKey),
        body: JSON.stringify({ seed, context, depth, model }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Request failed");
        return;
      }
      setOutput(JSON.stringify(data.result ?? data, null, 2));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-full max-w-5xl flex-col gap-8 px-4 py-10 md:px-8">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200/90">
          Neuron suite · 13
        </p>
        <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
          Steel Socratic
        </h1>
        <p className="max-w-2xl text-lg text-zinc-400">
          Stress-test a belief with a steel-manning Socratic ladder, explicit cruxes, and an update policy
          for how you should change your mind.
        </p>
      </header>

      <ApiKeyBar settings={settings} accent="from-amber-300 to-orange-600" />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
          <label className="block space-y-2 text-sm">
            <span className="text-zinc-300">Seed claim / question</span>
            <textarea
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
              rows={4}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-amber-400/60"
            />
          </label>
          <label className="block space-y-2 text-sm">
            <span className="text-zinc-300">Context</span>
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              rows={5}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-amber-400/60"
            />
          </label>
          <label className="block space-y-2 text-sm">
            <span className="text-zinc-300">Ladder depth (2–6)</span>
            <input
              type="number"
              min={2}
              max={6}
              value={depth}
              onChange={(e) => setDepth(Number(e.target.value))}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-amber-400/60"
            />
          </label>
          <button
            type="button"
            disabled={loading}
            onClick={run}
            className="w-full rounded-xl bg-gradient-to-r from-amber-300 to-orange-600 px-4 py-3 text-sm font-semibold text-amber-950 shadow-lg shadow-amber-500/30 transition hover:brightness-110 disabled:opacity-50"
          >
            {loading ? "Forging ladder…" : "Run Socratic steel ladder"}
          </button>
        </div>
        <div className="flex min-h-[520px] flex-col gap-3 rounded-2xl border border-white/10 bg-black/40 p-5 font-mono text-xs md:text-sm">
          <div className="flex items-center justify-between text-zinc-400">
            <span>Ladder JSON</span>
            {error ? <span className="text-rose-400">Error</span> : null}
          </div>
          {error ? <p className="text-sm text-rose-300">{error}</p> : null}
          <pre className="flex-1 overflow-auto whitespace-pre-wrap text-zinc-100">{output}</pre>
        </div>
      </div>
    </div>
  );
}
