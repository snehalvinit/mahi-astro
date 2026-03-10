Working directory: /Users/s0m0ohl/pers/mahi_astro

Read these files in order:
1. `.tasks/mahi-astro/tasks.md` — Find the first task with `- [ ]`
2. `.tasks/mahi-astro/progress.md` — Read last completed task and known issues
3. The **Knowledge Base** section of the current task — Read ALL listed reference files
4. The **Common Knowledge** section at the top of tasks.md — architecture, key files, preferences

Then:
- Check the task **Type** (Build, Fix, Backup, Research, or Verification).

**Build / Fix task:**
  - Read ALL files in the Knowledge Base section before writing any code
  - Implement the change described in the task
  - Write or update unit tests as specified
  - Run tests to verify
  - Mark all checklist items [x]
  - Update `.tasks/mahi-astro/progress.md` with handover notes
  - Git commit using the convention in the task
  - STOP — do not proceed to next task

**Research task:**
  - Use WebSearch and WebFetch to find real sources
  - Read all sources thoroughly, extract key insights
  - Generate zen-formatted HTML report (use template from ~/.claude/skills/zen-taskmaster/templates/research_report.html)
  - Save report to `.tasks/mahi-astro/results/`
  - Include: executive summary, building blocks, deep dives with citations, synthesis, pros/cons, recommendation
  - Mark [x], update progress.md, commit, STOP

**Backup task:**
  - Run the backup command exactly as specified
  - Verify backup completeness
  - Mark [x], commit, STOP

**Verification task:**
  - Run ALL checks in the verification checklist
  - Run full test suite
  - Do holistic discovery (check all outputs, edge cases, integration points)
  - If issues found: append new FX-N fix tasks + VFX-N verify tasks to Appendix in tasks.md
    - Each FX-N must have: exact error, root cause analysis, specific fix steps, validation checks
    - Each VFX-N re-runs the parent V gate checks that failed
  - If no issues: mark all [x], commit, STOP
  - If issues: mark as BLOCKED on FX-N, STOP

**Key principles:**
- Zen simplicity: simple, flat, readable code. Max 600 lines/file.
- Unit test every change. Test names: `test_<what>_<condition>_<expected>`
- No over-engineering. Only build what's needed.
- Research reports: deep, detailed, citation-heavy, zen-formatted HTML

Commit convention: `feat(<scope>): ...` | `fix(<scope>): ...` | `verify(<scope>): ...` | `research(<scope>): ...`
