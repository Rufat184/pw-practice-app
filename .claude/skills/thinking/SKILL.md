---
name: thinking
description: Let the user pick a thinking-effort level (low, medium, high, or extra high) and apply that depth of reasoning to the work that follows in the session. Invoke when the user wants to set or change how deeply you think.
---

# Thinking Mode

A manual switch for how deeply you reason. When this skill is invoked (typically the user typed `/thinking`):

## 1. Show the picker

Use the `AskUserQuestion` tool with a single question:

- **question:** "Which thinking level should I use?"
- **header:** `Thinking`
- **multiSelect:** `false`
- **options** (in this exact order):
  1. **Low** — "Fast and direct. Act immediately, minimal analysis. For simple or mechanical tasks."
  2. **Medium (Recommended)** — "Balanced. Standard analysis with sensible trade-offs. Good default."
  3. **High** — "Deep. Weigh options, verify assumptions, work through edge cases before acting."
  4. **Extra High** — "Maximum. Exhaustive exploration, multi-step planning, self-critique before committing."

(AskUserQuestion adds an "Other" option automatically — do not add your own.)

## 2. Apply the level

Once the user picks, confirm in one short sentence (e.g. "Thinking level set to **High**.") and then follow the matching behavior for all subsequent work this session:

- **Low** — Act directly. Prefer the most straightforward solution. Don't enumerate alternatives or add extra verification passes.
- **Medium** — Normal behavior: reasonable analysis, sensible trade-offs, no over-deliberation.
- **High** — Reason as if the user had written "think hard": explore alternatives, verify assumptions, consider edge cases and failure modes before acting or answering.
- **Extra High** — Reason as if the user had written "ultrathink": plan exhaustively, weigh multiple approaches, self-critique your conclusions, and double-check your reasoning before producing the answer. Take the extra time.

The level stays in effect until the user invokes `/thinking` again or explicitly changes it.

## 3. Remember the choice

Persist the selection in the project memory directory (the `memory/` dir for this project) as `thinking-level.md`:

- A single fact: the user's preferred thinking level is `<level>` (with a `**Why:**` and `**How to apply:**` line, as other feedback memories have).
- Add or update the one-line pointer in `MEMORY.md`.
- If `thinking-level.md` already exists, overwrite it with the new choice.

This makes the choice survive session restarts: in a future session, if that memory exists, quietly apply the stored level to your reasoning depth (the user can still change it anytime via `/thinking`).