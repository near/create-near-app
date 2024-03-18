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
exports.runDepsInstall = exports.copyDir = exports.createProject = void 0;
const show = __importStar(require("./messages"));
const cross_spawn_1 = __importDefault(require("cross-spawn"));
const fs_1 = __importDefault(require("fs"));
const ncp_1 = require("ncp");
const path_1 = __importDefault(require("path"));
async function createProject({ frontend, projectPath, templatesDir, projectName }) {
    await createGateway({ frontend, projectPath, templatesDir, projectName });
    return true;
}
exports.createProject = createProject;
async function createGateway({ frontend, projectPath, templatesDir, projectName }) {
    const sourceFrontendDir = path_1.default.resolve(`${templatesDir}/frontend/gateway`);
    const sourceWidgetDir = path_1.default.resolve(`${templatesDir}/frontend/components`);
    fs_1.default.mkdirSync(projectPath, { recursive: true });
    await copyDir(sourceFrontendDir, projectPath);
    //const widgetPath = `${projectPath}/apps/${projectName}`
    const widgetPath = `${projectPath}/apps`;
    fs_1.default.mkdirSync(widgetPath, { recursive: true });
    await copyDir(sourceWidgetDir, widgetPath);
}
// Wrap `ncp` tool to wait for the copy to finish when using `await`
function copyDir(source, dest) {
    return new Promise((resolve, reject) => {
        (0, ncp_1.ncp)(source, dest, {}, err => err ? reject(err) : resolve());
        //fs.mkdirSync(dest + '/apps/${gatewayName}')
        //add bos.config.json
    });
}
exports.copyDir = copyDir;
async function runDepsInstall(projectPath) {
    show.depsInstall();
    await new Promise((resolve, reject) => (0, cross_spawn_1.default)('npm', ['install'], {
        cwd: projectPath,
        stdio: 'inherit',
    }).on('close', (code) => {
        if (code !== 0) {
            show.depsInstallError();
            reject(code);
        }
        else {
            resolve();
        }
    }));
}
exports.runDepsInstall = runDepsInstall;
//# sourceMappingURL=make.js.map