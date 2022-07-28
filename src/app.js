"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// #!/usr/bin/env node
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const chalk_1 = __importDefault(require("chalk"));
const make_1 = require("./make");
const tracking_1 = require("./tracking");
const semver_1 = __importDefault(require("semver"));
const user_input_1 = require("./user-input");
const WELCOME_MESSAGE = ((0, chalk_1.default) `{blue ======================================================}
👋 {bold {green Welcome to NEAR!}} Learn more: https://docs.near.org/
🔧 Let's get your dApp ready.
{blue ======================================================}
(${tracking_1.trackingMessage})
`);
const SETUP_FAILED_MSG = ((0, chalk_1.default) `{bold {red ==========================================}}
{red ⛔️ There was a problem during NEAR project setup}.
Please refer to https://github.com/near/create-near-app README to troubleshoot.
Notice: some platforms aren't supported (yet).
{bold {red ==========================================}}`);
const contractToText = contract => (0, chalk_1.default) `with a smart contract in {bold ${contract === 'rust' ? 'Rust' : contract === 'js' ? 'JavaScript' : 'AssemblyScript'}}`;
const frontendToText = frontend => frontend === 'none' ? '' : (0, chalk_1.default) ` and a frontend template${frontend === 'react' ? (0, chalk_1.default) `{bold  in React.js}` : ''}`;
const SETUP_SUCCESS_MSG = (projectName, contract, frontend) => ((0, chalk_1.default) `
✅  Success! Created '${projectName}' ${contractToText(contract)}${frontendToText(frontend)}.
🧠 See {bold ${projectName}/{green README.md}} to get started.
${contract === 'rust' ? (0, chalk_1.default) `🦀 If you are new to Rust please visit {bold {green https://www.rust-lang.org }}\n` : '\n'}
Happy Hacking! 👍
{blue ======================================================}`);
// Execute the tool
(async function run() {
    console.log(WELCOME_MESSAGE);
    // Check they have the right node.js version
    const current = process.version;
    const supported = require('../package.json').engines.node;
    if (!semver_1.default.satisfies(current, supported)) {
        console.log(chalk_1.default.red(`We support node.js version ${supported} or later`));
        // TODO: track unsupported versions
        return;
    }
    // Get and track the user input
    let config = null;
    let configIsFromPrompts = false;
    try {
        config = await (0, user_input_1.getUserArgs)();
    }
    catch (e) {
        console.log(chalk_1.default.red(`Bad arguments.`));
        return;
    }
    if (config === null) {
        const userInput = await (0, user_input_1.showUserPrompts)();
        configIsFromPrompts = true;
        if (!(0, user_input_1.userAnswersAreValid)(userInput)) {
            console.log('Invalid prompt.');
            return;
        }
        config = userInput;
    }
    const { frontend, contract, projectName } = config;
    (0, tracking_1.trackUsage)(frontend, contract);
    // Make sure the project folder does not exist
    const dirName = `${process.cwd()}/${projectName}`;
    if (fs_1.default.existsSync(dirName)) {
        console.log(chalk_1.default.red(`This directory already exists! ${dirName}`));
        return;
    }
    // sanbox should be well supported by now, assemblyscript will be deprecated soon
    const supportsSandbox = true; // (os.type() === 'Linux' || os.type() === 'Darwin') && os.arch() === 'x64';
    // Create the project
    let createSuccess;
    const projectPath = path_1.default.resolve(process.cwd(), projectName);
    try {
        createSuccess = await (0, make_1.createProject)({
            contract,
            frontend,
            projectName,
            supportsSandbox,
            verbose: false,
            rootDir: path_1.default.resolve(__dirname, '../templates'),
            projectPath,
        });
    }
    catch (e) {
        console.error(e);
        createSuccess = false;
    }
    if (createSuccess) {
        console.log(SETUP_SUCCESS_MSG(projectName, contract, frontend));
    }
    else {
        console.log(SETUP_FAILED_MSG);
        return;
    }
    if (configIsFromPrompts) {
        const { depsInstall } = await (0, user_input_1.showDepsInstallPrompt)();
        if (depsInstall) {
            await (0, make_1.runDepsInstall)(projectPath);
        }
    }
})();
//# sourceMappingURL=app.js.map