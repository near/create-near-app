#!/bin/sh

CONTRACT_DIRECTORY=../contract
DEV_ACCOUNT_FILE="${CONTRACT_DIRECTORY}/neardev/dev-account.env"

start () {
  echo The app is starting!
  env-cmd -f $DEV_ACCOUNT_FILE parcel index.html --open
}

alert () {
  echo "======================================================"
  echo "Can't find the dev-account credentials file (${DEV_ACCOUNT_FILE})"
  echo "Did you deploy your contract ?"
  echo ">> Run 'npm run deploy' from your 'contract' directory"
  echo "======================================================"
}

if [ -f "$DEV_ACCOUNT_FILE" ]; then
  start
else
  alert
fi
