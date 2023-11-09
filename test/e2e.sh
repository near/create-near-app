#!/bin/sh

ts=$(date +%s)
app_dir="${PWD}"
root_dir="${PWD}/_testrun/${ts}"
mkdir -p $root_dir
cd $root_dir

echo $PWD
echo $app_dir
echo $root_dir

scaffold () {
  cd $root_dir
  dirname="${root_dir}/${1}_${2}_${3}"
  echo "scaffold: ${dirname}"
  if ! node "${app_dir}/index.js" "${1}_${2}_${3}" --contract $1 --frontend $2 --tests $3 --install ; then exit 42; fi
}

test () {
  dirname="${root_dir}/${1}"
  cd $dirname || exit 42
  echo "test: ${dirname}"
  if ! npm test ; then exit 42; fi
}

## CONTRACT:JS SANDBOX:JS
scaffold js none ts
test "js_none_ts"

## CONTRACT:RUST SANDBOX:TS
scaffold rust none ts
test "rust_none_ts"

### CONTRACT:RUST SANDBOX:RUST
scaffold rust none rs
test "rust_none_rs"