#!/bin/zsh

ts=$(date +%s)
dirname="./_testrun/${ts}"
mkdir -p $dirname
cd $dirname
node ../../index.js _js+react --contract js --frontend react
node ../../index.js _js+vanilla --contract js --frontend vanilla
node ../../index.js _js+none --contract js --frontend none
node ../../index.js _rust+react --contract rust --frontend react
node ../../index.js _rust+vanilla --contract rust --frontend vanilla
node ../../index.js _rust+none --contract rust --frontend none


cd ../../
cd "${dirname}/_js+react"
npm run deps-install
npm test
cd "${dirname}/_js+vanilla"
npm run deps-install
npm test
cd "${dirname}/_js+none"
npm run deps-install
npm test
cd "${dirname}/_rust+react"
npm run deps-install
npm test
cd "${dirname}/_rust+vanilla"
npm run deps-install
npm test
cd "${dirname}/_rust+none"
npm run deps-install
npm test
