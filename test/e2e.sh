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
  node "${app_dir}/index.js" "${1}_${2}_${3}" --contract $1 --frontend $2 --tests $3 --install
}

test () {
  dirname="${root_dir}/${1}"
  cd $dirname || exit 42
  echo "test: ${dirname}"
  if ! npm test ; then exit 42; fi
}

buildweb () {
  dirname="${root_dir}/${1}"
  cd $dirname || exit 42
  echo "buildweb: ${dirname}"
  if ! npm run build:web ; then exit 42; fi
}

deploy () {
  dirname="${root_dir}/${1}"
  cd $dirname || exit 42
  echo "test: ${dirname}"
  if ! npm run deploy ; then exit 42; fi
}

scaffold js react workspaces
test "js_react_workspaces"
buildweb "js_react_workspaces"

scaffold js vanilla workspaces
test "js_vanilla_workspaces"
buildweb "js_vanilla_workspaces"

scaffold js none workspaces
test "js_none_workspaces"

scaffold rust react workspaces
test "rust_react_workspaces"
buildweb "rust_react_workspaces"

scaffold rust vanilla workspaces
test "rust_vanilla_workspaces"
buildweb "rust_vanilla_workspaces"

scaffold rust none workspaces
test "rust_none_workspaces"

scaffold js react classic
test "js_react_classic"

scaffold js vanilla classic
test "js_vanilla_classic"

scaffold js none classic
test "js_none_classic"

scaffold rust react classic
test "rust_react_classic"

scaffold rust vanilla classic
test "rust_vanilla_classic"

scaffold rust none classic
test "rust_none_classic"

scaffold assemblyscript react classic
test "assemblyscript_react_classic"

scaffold assemblyscript vanilla classic
test "assemblyscript_vanilla_classic"

scaffold assemblyscript none classic
test "assemblyscript_none_classic"

#deploy "js_none"
#deploy "rust_none"
#deploy "assemblyscript_none"
