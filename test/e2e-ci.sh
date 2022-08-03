#!/bin/sh

ts=$(date +%s)
app_dir="${PWD}"
root_dir="${PWD}/_testrun/${ts}"
mkdir -p $root_dir
cd $root_dir

echo "PWD ${PWD}"
echo "${app_dir}"
echo "${root_dir}"
echo "1: ${1} 2: ${2} 3: ${3}"

cd $root_dir
dirname="${root_dir}/${1}_${2}_${3}"

echo "scaffold: ${dirname}"
if ! node "${app_dir}/index.js" "${1}_${2}_${3}" --contract $1 --frontend $2 --tests $3 --install ; then exit 42; fi

echo "build"
cd $dirname || exit 42
if ! npm run build ; then exit 42; fi
# echo "deploy"
# if ! npm run deploy ; then exit 42; fi
echo "test"
if ! npm test ; then exit 42; fi
