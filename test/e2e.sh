#!/bin/sh

ts=$(date +%s)
root_dir="${PWD}/_testrun/${ts}"
mkdir -p $root_dir
cd $root_dir

scaffold () {
  dirname="${root_dir}/${1}_${2}${3}"
  echo "scaffold: ${dirname}"
  node ../../index.js "${1}_${2}${3}" --contract $1 --frontend $2 --install "${3}" # > /dev/null
}
scaffold js react
scaffold js vanilla
scaffold js none
scaffold rust react
scaffold rust vanilla
scaffold rust none
scaffold assemblyscript react
scaffold assemblyscript vanilla
scaffold assemblyscript none
scaffold js react "--no-sandbox"
scaffold js vanilla "--no-sandbox"
scaffold js none "--no-sandbox"
scaffold rust react "--no-sandbox"
scaffold rust vanilla "--no-sandbox"
scaffold rust none "--no-sandbox"
scaffold assemblyscript react "--no-sandbox"
scaffold assemblyscript vanilla "--no-sandbox"
scaffold assemblyscript none "--no-sandbox"

test () {
  dirname="${root_dir}/${1}"
  cd $dirname || exit 42
  echo "test: ${dirname}"
  if ! yarn test ; then exit 42; fi
}

test "js_react"
test "js_vanilla"
test "js_none"
test "rust_react"
test "rust_vanilla"
test "rust_none"
#test "assemblyscript_react"
#test "assemblyscript_vanilla"
#test "assemblyscript_none"
#test "js_react--no-sandbox"
#test "js_vanilla--no-sandbox"
#test "js_none--no-sandbox"
#test "rust_react--no-sandbox"
#test "rust_vanilla--no-sandbox"
#test "rust_none--no-sandbox"
#test "assemblyscript_react--no-sandbox"
#test "assemblyscript_vanilla--no-sandbox"
#test "assemblyscript_none--no-sandbox"
