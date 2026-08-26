#!/usr/bin/env bash
set -euo pipefail

project_dir="$(cd "$(dirname "$0")/.." && pwd)"
runtime_dir="${TMPDIR:-/tmp}/kataribe-runtime"

mkdir -p "$runtime_dir"

# Desktop配下では大量のnode_modules読み込みがETIMEDOUTになることがあるため、
# 実行時だけローカル一時領域へ同期する。ソースとGit管理対象は元の場所に残す。
rsync -a --delete \
  --exclude .git \
  --exclude .next \
  --exclude node_modules \
  --exclude docs \
  "$project_dir/" "$runtime_dir/"

cd "$runtime_dir"
npm ci --no-audit --no-fund

export NEXT_TELEMETRY_DISABLED=1
exec npm run dev:app -- --hostname 0.0.0.0 --port 3000
