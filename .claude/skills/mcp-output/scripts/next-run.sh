#!/usr/bin/env bash
# Usage: ./next-run.sh <tool>
# Prints the next sequential run folder path and creates it.
# Example: ./next-run.sh playwright  →  .mcp_output/playwright/03
set -euo pipefail

TOOL="${1:?Usage: next-run.sh <tool>}"
BASE=".mcp_output/${TOOL}"

mkdir -p "$BASE"

# find highest existing ordinal
LAST=$(ls "$BASE" 2>/dev/null | grep -E '^[0-9]+$' | sort -n | tail -1 || true)

if [[ -z "$LAST" ]]; then
  NEXT=1
else
  NEXT=$(( 10#$LAST + 1 ))
fi

PADDED=$(printf "%02d" "$NEXT")
RUN_DIR="${BASE}/${PADDED}"

mkdir -p "$RUN_DIR"
echo "$RUN_DIR"
