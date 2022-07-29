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
  dirname="${root_dir}/${1}_${2}${3}"
  node "${app_dir}/index.js" "${1}_${2}${3}" --contract $1 --frontend $2 --install "${3}"
}

test () {
  dirname="${root_dir}/${1}"
  cd $dirname || exit 42
  echo "test: ${dirname}"
  if ! yarn test ; then exit 42; fi
}

deploy () {
  dirname="${root_dir}/${1}"
  cd $dirname || exit 42
  echo "test: ${dirname}"
  if ! yarn deploy ; then exit 42; fi
}

scaffold js react
test "js_react"
scaffold js vanilla
test "js_vanilla"
scaffold js none
test "js_none"
scaffold rust react
test "rust_react"
scaffold rust vanilla
test "rust_vanilla"
scaffold rust none
test "rust_none"
scaffold js react "--no-sandbox"
test "js_react--no-sandbox"
scaffold js vanilla "--no-sandbox"
test "js_vanilla--no-sandbox"
scaffold js none "--no-sandbox"
test "js_none--no-sandbox"
scaffold rust react "--no-sandbox"
test "rust_react--no-sandbox"
scaffold rust vanilla "--no-sandbox"
test "rust_vanilla--no-sandbox"
scaffold rust none "--no-sandbox"
test "rust_none--no-sandbox"
scaffold assemblyscript react "--no-sandbox"
test "assemblyscript_react--no-sandbox"
scaffold assemblyscript vanilla "--no-sandbox"
test "assemblyscript_vanilla--no-sandbox"
scaffold assemblyscript none "--no-sandbox"
test "assemblyscript_none--no-sandbox"

#deploy "js_none"
#deploy "rust_none"
#deploy "assemblyscript_none"
