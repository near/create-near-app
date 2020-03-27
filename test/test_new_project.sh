#!/bin/bash
set -ex

commands=(
    "node index.js tmp-project"
    "node index.js tmp-project --vanilla"
    "node index.js tmp-project --rust"
    "node index.js tmp-project --vanilla --rust"
)

for command in "${commands[@]}"; do
    # remove temporary blank project
    rm -rf tmp-project

    # test generating new project in new dir
    $command
    cd tmp-project
    FILE=package.json
    if test -f "$FILE"; then
      echo "$FILE exists. Have a cookie!"
    else
      echo "ERROR: $FILE not found."
      exit 1
    fi

    yarn
    yarn test
    cd ..
done

# remove temporary blank project
rm  -rf tmp-project
