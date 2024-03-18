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
const path_1 = __importDefault(require("path"));
const make_1 = require("./make");
const user_input_1 = require("./user-input");
const show = __importStar(require("./messages"));
(async function () {
    const prompt = await (0, user_input_1.promptAndGetConfig)();
    if (prompt === undefined)
        return;
    const { config: { projectName, frontend, install, }, projectPath, } = prompt;
    show.creatingApp();
    let createSuccess;
    try {
        createSuccess = await (0, make_1.createProject)({
            frontend,
            templatesDir: path_1.default.resolve(__dirname, '../templates'),
            projectPath,
            projectName
        });
    }
    catch (e) {
        console.error(e);
        createSuccess = false;
    }
    if (createSuccess) {
        install && await (0, make_1.runDepsInstall)(projectPath);
        show.setupSuccess(projectName, frontend, install);
    }
    else {
        return show.setupFailed();
    }
})();
//# sourceMappingURL=app.js.map