#!/bin/sh
set -eu
app_dir="${PWD}"
root_dir=$(mktemp -d "${TMPDIR:-/tmp}/create-near-app-e2e.XXXXXX")
export NEAR_ENV=ci
cd "$root_dir"
for template in auction auction-adv; do
  node "$app_dir/index.js" "$template" --contract --template "$template"
  (cd "$template" && cargo test --locked)
done
for frontend in next-app vite-react; do
  node "$app_dir/index.js" "$frontend" --frontend "$frontend" --install
  (cd "$frontend" && npm run build && npm run lint)
done
