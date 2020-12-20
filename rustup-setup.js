const chalk = require('chalk');
const reader = require("readline-sync");
const os = require('os');
const sh = require('shelljs')

const installRustupScript = "curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y";
const addWasm32TargetScript = "rustup target add wasm32-unknown-unknown";

function isRustupInstalled() {
    return sh.exec('rustup --version &> /dev/null').code == 0;
}

function isWasmTargetInstalled() {
    if (!isRustupInstalled()) {
        return false;
    }
    const installedTargets = sh.exec('rustup target list --installed').stdout;
    return installedTargets.includes('wasm32-unknown-unknown');
}

function installRustup() {
    console.log(chalk`Installing {bold rustup}...`);
    sh.exec(installRustupScript);
}

function addWasm32Target() {
    console.log(chalk`Adding {bold wasm32-unknown-unknown} target...`);
    sh.exec(addWasm32TargetScript);
}

function askYesNoQuestionAndRunFunction(question, functionToRun) {
    for (let attempt = 0; attempt < 4; attempt++) {
        const answer = reader.question(question);
        if (answer.toLowerCase() == 'y' || answer === '') {
            functionToRun();
            return;
        }
        else if (answer.toLowerCase() == 'n') {
            return;
        }
    }
}

const installRustupQuestion = chalk`
To build Rust smart contracts you need to install {bold rustup}: the Rust toolchain installer.
We can run the following command to do it:
        
    {bold ${installRustupScript}}
        
Continue with installation (y/n)?: `;

const addWasm32TragetQuestion = chalk`
To build Rust smart contracts you need to add WebAssembly compiler target to Rust toolchain.
We can run the following command to do it:

    {bold ${addWasm32TargetScript}}
    
Continue with installation (y/n)?: `;

const isUnix = os.platform() != 'win32';
const contract = 'rust';

if (contract == 'rust' && isUnix) {
    if (isUnix) {
        if (!isRustupInstalled()) {
            askYesNoQuestionAndRunFunction(installRustupQuestion, installRustup);
        }
        if (isRustupInstalled() && !isWasmTargetInstalled()) {
            askYesNoQuestionAndRunFunction(addWasm32TragetQuestion, addWasm32Target);
        }
    } else {
        console.log("TODO: add Windows support");
    }
}