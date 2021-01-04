const chalk = require('chalk');
const reader = require("readline-sync");
const os = require('os');
const sh = require('shelljs')

// script from https://rustup.rs/ with auto-accept flag "-y"
const installRustupScript = "curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y";
/* We should update PATH in the same script because every new Bash scripts are executed is a separate shell */
const addWasm32TargetScript = "source $HOME/.cargo/env && rustup target add wasm32-unknown-unknown";

const isUnix = os.platform() != 'win32';

function isRustupInstalled() {
    console.log(chalk`Checking if {bold rustup} is installed...`);
    const isInstalled = sh.exec('rustup --version &> /dev/null').code == 0;
    console.log(chalk`{bold rustup} is`, isInstalled ? 'installed' : 'not installed');
    return isInstalled;
}

function isWasmTargetAdded() {
    const addedTargets = sh.exec('rustup target list --installed').stdout;
    const isWasmTargetAdded = addedTargets.includes('wasm32-unknown-unknown');
    console.log(chalk`{bold wasm32-unknown-unknown} target `, isWasmTargetAdded ? 'already added' : 'is not added');
    return isWasmTargetAdded;
}

function installRustup() {
    console.log(chalk`Installing {bold rustup}...`);
    sh.exec(installRustupScript);
}

function addWasm32Target() {
    console.log(chalk`Adding {bold wasm32-unknown-unknown} target...`);
    sh.exec(addWasm32TargetScript);
}

function askYesNoQuestionAndRunFunction(question, functionToRun = null) {
    for (let attempt = 0; attempt < 4; attempt++) {
        const answer = reader.question(question);
        if (answer.toLowerCase() == 'y' || answer === '') {
            if (functionToRun) functionToRun();
            return;
        }
        else if (answer.toLowerCase() == 'n') {
            return;
        }
    }
}

const installRustupDisclaimer = chalk`In order to work with {bold rust} smart contracts we recomend you to install {bold rustup}: the Rust toolchain installer.`;
const addWasm32TargetDisclaimer = chalk`To build Rust smart contracts you need to add {bold WebAssembly} compiler target to Rust toolchain.`;

const installRustupQuestion = chalk`
${installRustupDisclaimer}
We can run the following command to do it:

    {bold ${installRustupScript}}

Continue with installation (y/n)?: `;

const addWasm32TragetQuestion = chalk`
${addWasm32TargetDisclaimer}
We can run the following command to do it:

    {bold ${addWasm32TargetScript}}

Continue with installation (y/n)?:`;

const rustupAndWasm32WindowsInstalationInstructions = chalk`
${installRustupDisclaimer}
    1. Go to https://rustup.rs
    2. Download {bold rustup-init.exe}
    3. Install it on your system

${addWasm32TargetDisclaimer}
Run the following command to do it:

    {bold ${addWasm32TargetScript}}

Press {bold Enter} to continue project creation.`;

function setupRustAndWasm32Target() {
    try {
        if (isUnix) {
            if (isRustupInstalled()) {
                if (isWasmTargetAdded()) {
                    return;
                } else {
                    askYesNoQuestionAndRunFunction(addWasm32TragetQuestion, addWasm32Target);
                }
            } else {
                askYesNoQuestionAndRunFunction(installRustupQuestion, installRustup);
                askYesNoQuestionAndRunFunction(addWasm32TragetQuestion, addWasm32Target);
            }
        } else {
            askYesNoQuestionAndRunFunction(rustupAndWasm32WindowsInstalationInstructions);
        }
    } catch (e) {
        console.log(chalk`Failed to run {bold rust} setup script`, e);
    }
}

module.exports = {
    setupRustAndWasm32Target,
};