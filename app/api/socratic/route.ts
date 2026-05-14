import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getOpenAIApiKey } from "@/lib/openai-key";

export async function POST(request: NextRequest) {
  const apiKey = getOpenAIApiKey(request);
  if (!apiKey) {
    return NextResponse.json(
      { error: "Send Authorization: Bearer <your OpenAI API key> on each request." },
      { status: 401 },
    );
  }

  let body: { seed?: string; context?: string; depth?: number; model?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body.seed?.trim()) {
    return NextResponse.json({ error: "`seed` (claim, belief, or fuzzy question) is required." }, { status: 400 });
  }

  const client = new OpenAI({ apiKey });
  const model = body.model?.trim() || "gpt-4o-mini";
  const depth = Math.min(6, Math.max(2, Number(body.depth) || 4));

  const system = `You are Steel Socratic — rigorous, kind epistemology coach.
Given a seed belief/question, produce a Socratic ladder that steel-mans counterpositions.
Return JSON:
- reframed_question: string
- ladder: { step: number; question: string; purpose: string; if_yes_then: string; if_no_then: string }[] // length ${depth}
- cruxes: { crux: string; how_to_test: string }[]
- update_policy: string (how the user should change their mind with new evidence)
Stay non-partisan; do not moralize beyond logical consistency.`;

  const user = `SEED:\n${body.seed}\n\nCONTEXT:\n${body.context?.trim() || "none"}`;

  try {
    const completion = await client.chat.completions.create({
      model,
      temperature: 0.45,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    });
    const text = completion.choices[0]?.message?.content;
    if (!text) return NextResponse.json({ error: "Empty model response." }, { status: 502 });
    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch {
      return NextResponse.json({ raw: text }, { status: 200 });
    }
    return NextResponse.json({ result: parsed, model });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "OpenAI request failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
