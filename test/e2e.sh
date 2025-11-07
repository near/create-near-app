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
  dirname="${root_dir}/${1}_${2}"
  echo "scaffold: ${dirname}"
  if [ "$1" = "none" ]; then
    if ! node "${app_dir}/index.js" "${1}_${2}" --contract $1 --frontend $2 --install ; then exit 42; fi
  else
    if ! node "${app_dir}/index.js" "${1}_${2}" --contract $1 --frontend $2 --template auction --install ; then exit 42; fi
  fi
}

test () {
  dirname="${root_dir}/${1}"
  cd $dirname || exit 42
  echo "test: ${dirname}"
  if ! npm test ; then exit 42; fi
}

## CONTRACT:TS
scaffold ts none
test "ts_none"

## CONTRACT:RUST
scaffold rs none
test "rs_none"

## Frontend: Pages router (no test for frontend-only)
scaffold none next-page

## Frontend: App router (no test for frontend-only)
scaffold none next-app
