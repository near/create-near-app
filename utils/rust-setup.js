const chalk = require('chalk')
const os = require('os')
const readline = require('readline')
const sh = require('shelljs')

// script from https://rustup.rs/ with auto-accept flag "-y"
const installRustupScript = 'curl --proto \'=https\' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y'
const updatePath = '. $HOME/.cargo/env'
const addWasm32TargetScript = 'rustup target add wasm32-unknown-unknown'
// We should update PATH in the same script because every new Bash scripts are executed in a separate shell
const updatePathAndAddWasm32TargetScript = updatePath + ' && ' + addWasm32TargetScript

const isWindows = os.platform() === 'win32'

function isRustupInstalled() {
  console.log(chalk`Checking if {bold rustup} is installed...`)
  const isInstalled = sh.exec('rustup --version &> /dev/null').code === 0
  console.log(chalk`{bold rustup} is`, isInstalled ? 'installed\n' : 'not installed\n')
  return isInstalled
}

function isWasmTargetAdded() {
  console.log(chalk`Checking installed {bold Rust targets}..`)
  const addedTargets = sh.exec('rustup target list --installed').stdout
  const isWasmTargetAdded = addedTargets.includes('wasm32-unknown-unknown')
  console.log(chalk`{bold wasm32-unknown-unknown} target `, isWasmTargetAdded ? 'already added' : 'is not added')
  return isWasmTargetAdded
}

function installRustup() {
  console.log(chalk`Installing {bold rustup}...`)
  sh.exec(installRustupScript)
}

function addWasm32Target() {
  console.log(chalk`Adding {bold wasm32-unknown-unknown} target...`)
  sh.exec(updatePathAndAddWasm32TargetScript)
}

async function askYesNoQuestionAndRunFunction(question, functionToRun = null) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  try {
    for (let attempt = 0; attempt < 4; attempt++) {
      const answer = await new Promise((resolve) => {
        rl.question(question, (userInput) => {
          if (['y', 'Y', ''].includes(userInput)) {
            if (functionToRun) functionToRun()
            resolve(true)
          }
          if (userInput === 'n') {
            resolve(false)
          }
          resolve(undefined)
        })
      })
      if (answer !== undefined) {
        return answer
      }
    }
  } finally {
    rl.close()
  }
  return false
}

const installRustupDisclaimer = chalk`In order to work with {bold rust} smart contracts we recommend you install {bold rustup}, the Rust toolchain installer.`
const addWasm32TargetDisclaimer = chalk`To build Rust smart contracts you need to add {bold WebAssembly} compiler target to Rust toolchain.`

const installRustupQuestion = chalk`
${installRustupDisclaimer} We can run the following command to do it for you:

    {bold ${installRustupScript}}

Continue with installation (Y/n)?: `

const addWasm32TargetQuestion = chalk`
${addWasm32TargetDisclaimer} We can run the following command to do it for you:

    {bold ${addWasm32TargetScript}}

Continue with installation (Y/n)?: `

const rustupAndWasm32WindowsInstallationInstructions = chalk`
${installRustupDisclaimer}
    1. Go to https://rustup.rs
    2. Download {bold rustup-init.exe}
    3. Install it on your system

${addWasm32TargetDisclaimer}

Run the following command to do it:

    {bold ${addWasm32TargetScript}}

Press {bold Enter} to continue project creation.`

async function setupRustAndWasm32Target() {
  try {
    if (isWindows) {
      await askYesNoQuestionAndRunFunction(rustupAndWasm32WindowsInstallationInstructions)
      return false
    }
    let wasRustupInstalled = false
    if (!isRustupInstalled()) {
      wasRustupInstalled = await askYesNoQuestionAndRunFunction(installRustupQuestion, installRustup)
    }
    if (!isWasmTargetAdded()) {
      await askYesNoQuestionAndRunFunction(addWasm32TargetQuestion, addWasm32Target)
    }
    return wasRustupInstalled
  } catch (e) {
    console.log(chalk`Failed to run {bold rust} setup script`, e)
  }
}

module.exports = {
  setupRustAndWasm32Target,
}
