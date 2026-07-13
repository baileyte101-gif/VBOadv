# VBO AI Marketing Team — Agent Definitions

This folder holds the VBO agent team as **native Claude Code subagents**. Any
`*.md` file here (except this README and files starting with `_`) is loaded
automatically and becomes an invocable agent in both local and web sessions.

Mirrors the hub‑and‑spoke architecture in `../../VBO-Agent-Org-Chart.html`.

---

## File format

One Markdown file per agent. The file has **YAML frontmatter** (the config)
followed by the **system prompt** (the agent's actual instructions).

```markdown
---
name: vega
description: SEO specialist — keyword research, technical audits, on-page optimization. Route SEO work here.
tools: Read, Edit, Write, Grep, Glob, Bash, WebSearch, WebFetch
model: sonnet
---

You are Vega, VBO's SEO specialist...
[the full system prompt you use locally]
```

### Frontmatter fields

| Field | Required | Notes |
|---|---|---|
| `name` | ✅ | Lowercase, hyphenated, matches the filename (`vega` → `vega.md`). This is what you type to invoke the agent. |
| `description` | ✅ | One line: what the agent does **and when to route to it**. The router (Mack) and the main session read this to decide delegation, so make it action-oriented. |
| `tools` | optional | Comma-separated allow-list. **Omit to inherit all available tools.** Restrict only when an agent should be sandboxed (e.g. a writer that shouldn't run Bash). |
| `model` | optional | `opus`, `sonnet`, or `haiku`. Omit to inherit the session model. Use `haiku` for cheap/mechanical agents, `opus` for heavy reasoning. |

### Naming convention
`name` == filename, lowercase, hyphenated. Examples:
`mack.md`, `shield.md`, `burt.md`, `atlas.md`, `bob.md`, `dash.md`,
`jules.md`, `mary.md`, `mercury.md`, `noa.md`, `orion.md`, `vega.md`.

---

## Tools reference

Common built-in tool names for the `tools` field:
`Read, Write, Edit, Grep, Glob, Bash, WebSearch, WebFetch, Agent, Task`.

MCP tools use their full name and can be granted the same way (e.g. an Ahrefs
SEO tool, a Notion tool). If you're unsure of exact MCP tool names, **omit
`tools` entirely** so the agent inherits everything — that's the safe default.

The hub agent (**Mack**) should keep `Agent`/`Task` so it can spawn and
delegate to the specialists.

---

## Where the rest goes

- **Team-wide rules** (brand voice, the Tim → Mack → specialist → Burt → Tim
  review protocol, client-state conventions) → root **`/CLAUDE.md`**. This is
  loaded on every session automatically, so it's the right home for anything
  every agent must know.
- **Shared reference material** (brand guidelines, client briefs, style
  guides) → a committed folder such as `/context/` or `/docs/`, referenced
  from `CLAUDE.md` and the agent prompts.

## Do NOT commit

- 🔑 **Secrets** — API keys, tokens, passwords. These belong in environment
  settings, never in git.
- 🔒 **Confidential client data** — anything committed here lives in git
  history and is visible to everyone with repo access. Keep sensitive
  client-state files out of this (marketing) repo or `.gitignore` them.

---

## Loading

New/changed agent files are picked up when a **session starts**. After files
land on the branch, open a fresh Claude Code (web or local) session and the
team is available natively. Within an existing session, they can be read and
followed immediately after a `git pull`, but won't register as spawnable
agent *types* until the next session.
