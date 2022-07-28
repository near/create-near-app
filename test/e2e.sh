#!/bin/sh

ts=$(date +%s)
root_dir="${PWD}/_testrun/${ts}"
mkdir -p $root_dir
cd $root_dir

echo "Creating scaffolds..."

scaffold () {
  dirname="${root_dir}/${1}"
  echo "Creating ${dirname}"
  node ../../index.js $1 --contract js --frontend react > /dev/null
}
scaffold "js_react"
scaffold "js_vanilla"
scaffold "js_none"
scaffold "rust_react"
scaffold "rust_vanilla"
scaffold "rust_none"

test () {
  dirname="${root_dir}/${1}"
  cd $dirname || exit 42
  echo "deps-install: ${dirname}"
  #  if ! yarn deps-install > /dev/null 2>&1; then exit 42; fi
  if ! yarn deps-install ; then exit 42; fi
  echo "test: ${dirname}"
  #  if ! yarn test > /dev/null 2>&1; then exit 42; fi
  if ! yarn test ; then exit 42; fi
}

test "js_react"
test "js_vanilla"
test "js_none"
test "rust_react"
test "rust_vanilla"
test "rust_none"
