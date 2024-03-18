"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectPath = exports.promptAndGetConfig = exports.getUserAnswers = exports.getUserArgs = void 0;
const types_1 = require("./types");
const chalk_1 = __importDefault(require("chalk"));
const prompts_1 = __importDefault(require("prompts"));
const commander_1 = require("commander");
const show = __importStar(require("./messages"));
const semver_1 = __importDefault(require("semver"));
const tracking_1 = require("./tracking");
const fs_1 = __importDefault(require("fs"));
async function getUserArgs() {
    commander_1.program
        .argument('[projectName]')
        .option('--install')
        .addHelpText('after', 'You can create a frontend');
    commander_1.program.parse();
    const options = commander_1.program.opts();
    const [projectName] = commander_1.program.args;
    const { install } = options;
    const frontend = 'gateway';
    return { frontend, projectName, install };
}
exports.getUserArgs = getUserArgs;
const namePrompts = {
    type: 'text',
    name: 'projectName',
    message: 'Name your project (we will create a directory with that name)',
    initial: 'hello-near',
};
const npmPrompt = {
    type: 'confirm',
    name: 'install',
    message: (0, chalk_1.default) `Run {bold {blue 'npm install'}} now?`,
    initial: true,
};
const promptUser = async (prompts) => {
    // Prompt, and exit if user cancels
    return (0, prompts_1.default)(prompts, { onCancel: () => process.exit(0) });
};
async function getUserAnswers() {
    const { projectName, install } = await promptUser([namePrompts, npmPrompt]);
    const frontend = 'gateway';
    return { frontend, projectName, install };
}
exports.getUserAnswers = getUserAnswers;
async function promptAndGetConfig() {
    const supportedNodeVersion = require('../package.json').engines.node;
    if (!semver_1.default.satisfies(process.version, supportedNodeVersion)) {
        return show.unsupportedNodeVersion(supportedNodeVersion);
    }
    if (process.platform === 'win32') {
        return show.windowsWarning();
    }
    // process cli args
    let args = await getUserArgs();
    // If no args, prompt user
    if (!args.projectName) {
        show.welcome();
        args = await getUserAnswers();
    }
    // Homogenizing terminal args with prompt args
    args.frontend = 'gateway'; //args.frontend || 'none';
    if (!validateUserArgs(args))
        return;
    // track user input
    const { frontend } = args;
    (0, tracking_1.trackUsage)(frontend);
    let path = (0, exports.projectPath)(args.projectName);
    if (fs_1.default.existsSync(path)) {
        return show.directoryExists(path);
    }
    return { config: args, projectPath: path };
}
exports.promptAndGetConfig = promptAndGetConfig;
const projectPath = (projectName) => `${process.cwd()}/${projectName}`;
exports.projectPath = projectPath;
const validateUserArgs = (args) => {
    if (!types_1.FRONTENDS.includes(args.frontend)) {
        show.argsError(`Invalid frontend type: ${args.frontend}`);
        return false;
    }
    if (!args.projectName) {
        show.argsError('Please provide a project name');
        return false;
    }
    // if (args.frontend !== 'none') {
    //   show.argsError('Remove the --tests flag when creating a frontend');
    //   return false;
    // }
    return true;
};
//# sourceMappingURL=user-input.js.map