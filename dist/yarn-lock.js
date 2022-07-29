"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.yarnLock = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const yarnLock = async (contract, frontend, projectPath, supportsSandbox, rootDir) => {
    const dir = path_1.default.resolve(rootDir, 'lock-file', `${contract}-${frontend}`);
    try {
        const source = path_1.default.resolve(dir, 'root.yarn.lock');
        const dist = path_1.default.resolve(projectPath, 'yarn.lock');
        await fs_1.promises.copyFile(source, dist);
    }
    catch (e) {
        // pass
    }
    try {
        const source = path_1.default.resolve(dir, 'contract.yarn.lock');
        const dist = path_1.default.resolve(projectPath, 'contract', 'yarn.lock');
        await fs_1.promises.copyFile(source, dist);
    }
    catch (e) {
        // pass
    }
    try {
        const source = path_1.default.resolve(dir, supportsSandbox ? 'tests-workspaces.yarn.lock' : 'tests-classic.yarn.lock');
        const dist = path_1.default.resolve(projectPath, 'integration-tests', 'yarn.lock');
        await fs_1.promises.copyFile(source, dist);
    }
    catch (e) {
        // pass
    }
};
exports.yarnLock = yarnLock;
//# sourceMappingURL=yarn-lock.js.map