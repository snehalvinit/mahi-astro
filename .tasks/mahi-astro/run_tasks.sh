#!/bin/bash
# run_tasks.sh — Run mahi-astro tasks with Claude Code
#
# Usage:
#   .tasks/mahi-astro/run_tasks.sh
#
# Override defaults:
#   TASK_MODEL=claude-sonnet-4-6 .tasks/mahi-astro/run_tasks.sh
#   MAX_ITERATIONS=50 .tasks/mahi-astro/run_tasks.sh
set -euo pipefail

TASK_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_DIR="$(cd "$TASK_DIR/../.." && pwd)"

export TASK_MODEL="${TASK_MODEL:-claude-opus-4-6}"
export TASK_BACKEND="${TASK_BACKEND:-claude}"
export MAX_ITERATIONS="${MAX_ITERATIONS:-200}"
export PYTHONPATH="$REPO_DIR:${PYTHONPATH:-}"

echo "=== Zen Taskmaster — mahi-astro ==="
echo "Task dir: $TASK_DIR"
echo "Repo dir: $REPO_DIR"
echo "Model:    $TASK_MODEL"
echo "Backend:  $TASK_BACKEND"
echo "Max iter: $MAX_ITERATIONS"
echo ""

# Check for run_tasks.sh in repo root (the generic task runner)
RUNNER="$REPO_DIR/run_tasks.sh"
if [[ ! -f "$RUNNER" ]]; then
    # Fall back to the one in ~/.claude/skills
    RUNNER="$HOME/.claude/skills/zen-taskmaster/scripts/run_tasks_engine.sh"
fi

if [[ ! -f "$RUNNER" ]]; then
    echo "ERROR: No task runner found."
    echo "Expected at: $REPO_DIR/run_tasks.sh"
    echo "       or:   $HOME/.claude/skills/zen-taskmaster/scripts/run_tasks_engine.sh"
    echo ""
    echo "Copy the engine: cp ~/.claude/skills/zen-taskmaster/scripts/run_tasks_engine.sh $REPO_DIR/run_tasks.sh"
    exit 1
fi

exec "$RUNNER" \
    "$TASK_DIR/prompt.md" \
    "$TASK_DIR/tasks.md" \
    --work-dir "$REPO_DIR" \
    --summary "$TASK_DIR/summary_prompt.md"
