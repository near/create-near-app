#!/bin/zsh

node index.js _js+react --contract js --frontend react
node index.js _js+vanilla --contract js --frontend vanilla
node index.js _js+none --contract js --frontend none
node index.js _rust+react --contract rust --frontend react
node index.js _rust+vanilla --contract rust --frontend vanilla
node index.js _rust+none --contract rust --frontend none
node index.js _assemblyscript+react --contract assemblyscript --frontend react
node index.js _assemblyscript+vanilla --contract assemblyscript --frontend vanilla
node index.js _assemblyscript+none --contract assemblyscript --frontend none

cd _js+react
npm run install-packages
cd _js+vanilla
npm run install-packages
cd _js+none
npm run install-packages
cd _rust+react
npm run install-packages
cd _rust+vanilla
npm run install-packages
cd _rust+none
npm run install-packages
cd _assemblyscript+react
npm run install-packages
cd _assemblyscript+vanilla
npm run install-packages
cd _assemblyscript+none
npm run install-packages
