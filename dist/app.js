"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const make_1 = require("./make");
const tracking_1 = require("./tracking");
const semver_1 = __importDefault(require("semver"));
const user_input_1 = require("./user-input");
const messages_1 = require("./messages");
(async function run() {
    let config = null;
    let configIsFromPrompts = false;
    const args = await (0, user_input_1.getUserArgs)();
    const argsValid = (0, user_input_1.validateUserArgs)(args);
    // sanbox should be well supported by now, assemblyscript will be deprecated soon
    // we explicitly take user's input: --no-sandbox => false, otherwise true
    const supportsSandbox = args.sandbox;
    if (argsValid === 'error') {
        messages_1.show.argsError();
        return;
    }
    else if (argsValid === 'ok') {
        config = args;
    }
    messages_1.show.welcome();
    // Check node.js version
    const current = process.version;
    const supported = require('../package.json').engines.node;
    if (!semver_1.default.satisfies(current, supported)) {
        messages_1.show.unsupportedNodeVersion(supported);
        // TODO: track unsupported versions
        return;
    }
    // Get user input
    if (config === null) {
        const userInput = await (0, user_input_1.showUserPrompts)();
        configIsFromPrompts = true;
        if (!(0, user_input_1.userAnswersAreValid)(userInput)) {
            throw new Error(`Invalid prompt. ${JSON.stringify(userInput)}`);
        }
        config = userInput;
    }
    const { frontend, contract, projectName } = config;
    (0, tracking_1.trackUsage)(frontend, contract);
    // Make sure the project folder does not exist
    const dirName = `${process.cwd()}/${projectName}`;
    if (fs_1.default.existsSync(dirName)) {
        messages_1.show.directoryExists(dirName);
        return;
    }
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
        messages_1.show.setupSuccess(projectName, contract, frontend);
    }
    else {
        messages_1.show.setupFailed();
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