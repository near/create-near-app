"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.show = exports.log = void 0;
const chalk_1 = __importDefault(require("chalk"));
const tracking_1 = require("./tracking");
const log = (...args) => console.log(...args);
exports.log = log;
const welcome = () => (0, exports.log)((0, chalk_1.default) `{blue ======================================================}
👋 {bold {green Welcome to NEAR!}} Learn more: https://docs.near.org/
🔧 Let's get your dApp ready.
{blue ======================================================}
(${tracking_1.trackingMessage})
`);
const setupFailed = () => (0, exports.log)((0, chalk_1.default) `{bold {red ==========================================}}
{red ⛔️ There was a problem during NEAR project setup}.
Please refer to https://github.com/near/create-near-app README to troubleshoot.
Notice: some platforms aren't supported (yet).
{bold {red ==========================================}}`);
const successContractToText = (contract) => (0, chalk_1.default) `with a smart contract in {bold ${contract === 'rust' ? 'Rust' : contract === 'js' ? 'JavaScript' : 'AssemblyScript'}}`;
const successFrontendToText = (frontend) => frontend === 'none' ? '' : (0, chalk_1.default) ` and a frontend template${frontend === 'react' ? (0, chalk_1.default) `{bold  in React.js}` : ''}`;
const setupSuccess = (projectName, contract, frontend) => (0, exports.log)((0, chalk_1.default) `
✅  Success! Created '${projectName}' ${successContractToText(contract)}${successFrontendToText(frontend)}.
🧠 See {bold ${projectName}/{green README.md}} to get started.
${contract === 'rust' ? (0, chalk_1.default) `🦀 If you are new to Rust please visit {bold {green https://www.rust-lang.org }}\n` : '\n'}
Happy Hacking! 👍
{blue ======================================================}`);
const argsError = () => (0, exports.log)((0, chalk_1.default) `{red Arguments error}
Run {blue npx create-near-app} without arguments, or use:
npx create-near-app <projectName> --contract rust|js|assemblyscript --frontend react|vanilla|none`);
const unsupportedNodeVersion = (supported) => (0, exports.log)((0, chalk_1.default) `{red We support node.js version ${supported} or later}`);
const directoryExists = (dirName) => (0, exports.log)((0, chalk_1.default) `{red This directory already exists! ${dirName}}`);
const creatingApp = () => (0, exports.log)((0, chalk_1.default) `...creating a new NEAR app...`);
const depsInstall = () => (0, exports.log)((0, chalk_1.default) `
{green Installing dependencies in a few folders, this might take a while...}
`);
const depsInstallError = () => (0, exports.log)(chalk_1.default.red('Error installing NEAR project dependencies'));
exports.show = {
    welcome, setupFailed, setupSuccess, argsError,
    unsupportedNodeVersion, directoryExists, creatingApp,
    depsInstall, depsInstallError,
};
//# sourceMappingURL=messages.js.map