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


## CONTRACT:JS SANDBOX:JS

scaffold js react js
test "js_react_js"

scaffold js vanilla js
test "js_vanilla_js"

scaffold js none js
test "js_none_js"


## CONTRACT:RUST SANDBOX:JS

scaffold rust react js
test "rust_react_js"

scaffold rust vanilla js
test "rust_vanilla_js"

scaffold rust none js
test "rust_none_js"


### CONTRACT:JS SANDBOX:RUST

scaffold js react rust
test "js_react_rust"

scaffold js vanilla rust
test "js_vanilla_rust"

scaffold js none rust
test "js_none_rust"


## CONTRACT:RUST SANDBOX:RUST

scaffold rust react rust
test "rust_react_rust"

scaffold rust vanilla rust
test "rust_vanilla_rust"

scaffold rust none rust
test "rust_none_rust"