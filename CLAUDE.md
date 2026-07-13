# VBO — Project & Team Context

This repo is the VBO Advertising marketing site (Next.js + TypeScript +
Tailwind) and the home of the **VBO AI Marketing Team** agent definitions.

## The team
A hub-and-spoke agent architecture. Full chart: `VBO-Agent-Org-Chart.html`.
Agent definitions live in `.claude/agents/`.

- **Tim Bailey** — Founder & Operator. Directs strategy, approves deliverables.
- **Mack** — Operations manager & router (the hub). Decomposes requests,
  delegates to specialists, consolidates results.
- **Shield** — Systems architect (agent infra, memory, file governance).
- **Burt** — QA reviewer. Final quality gate before anything reaches Tim.
- **Specialists:** Atlas (research/strategy), Bob (web dev), Dash (analytics),
  Jules (creative/design), Mary (copywriting), Mercury (paid media),
  Noa (social), Orion (biz dev/sales), Vega (SEO).

## How a request flows
`Tim → Mack routes → Specialist executes → Burt reviews → Tim approves`
Shield operates outside the flow, maintaining the system itself.

## Working in this repo
- Copywriting flows through **Mary**; keep brand voice consistent.
- Web/site changes are **Bob's** lane (Next.js/Vercel).
- Commit and push changes so they persist (web sessions are ephemeral).

<!-- Extend this file with team-wide rules: brand voice, review protocol,
     client-state conventions. Do NOT put secrets or confidential client
     data here — it lives in git history. -->
