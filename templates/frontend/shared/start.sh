#!/bin/sh

CONTRACT_DIRECTORY=../contract
DEV_ACCOUNT_FILE="${CONTRACT_DIRECTORY}/neardev/dev-account.env"

start () {
  echo The app is starting!
  env-cmd -f $DEV_ACCOUNT_FILE parcel index.html --open
}

alert () {
  GREEN='\033[1;32m'
  NC='\033[0m' # No Color

  echo "======================================================"
  echo "It looks like you didn't deploy your contract"
  echo ">> Run ${GREEN}'npm run deploy'${NC} from the your project's root directory"
  echo "This frontend template works with contracts deployed to NEAR TestNet"
  echo "======================================================"
}

if [ -f "$DEV_ACCOUNT_FILE" ]; then
  start
else
  alert
fi
