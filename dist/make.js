"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runDepsInstall = exports.copyDir = exports.renameFile = exports.createFiles = exports.createProject = void 0;
const messages_1 = require("./messages");
const yarn_lock_1 = require("./yarn-lock");
const spawn = require('cross-spawn');
const fs = require('fs');
const { ncp } = require('ncp');
const path = require('path');
const { preMessage, postMessage } = require('./checks');
const { buildPackageJson } = require('./package-json');
ncp.limit = 16;
// Method to create the project folder
async function createProject({ contract, frontend, projectPath, projectName, verbose, rootDir, supportsSandbox }) {
    // Make language specific checks
    let preMessagePass = preMessage({ contract, frontend, projectPath, verbose, rootDir, supportsSandbox });
    if (!preMessagePass) {
        return false;
    }
    messages_1.show.creatingApp();
    // Create files in the project folder
    await createFiles({ contract, frontend, projectName, projectPath, verbose, rootDir, supportsSandbox });
    // Create package.json
    const packageJson = buildPackageJson({ contract, frontend, projectName, projectPath, verbose, rootDir, supportsSandbox });
    fs.writeFileSync(path.resolve(projectPath, 'package.json'), Buffer.from(JSON.stringify(packageJson, null, 2)));
    // Run language-specific post check
    postMessage({ contract, frontend, projectPath, verbose, rootDir, supportsSandbox });
    return true;
}
exports.createProject = createProject;
async function createFiles({ contract, frontend, projectPath, verbose, rootDir, supportsSandbox }) {
    // skip build artifacts and symlinks
    const skip = ['.cache', 'dist', 'out', 'node_modules', 'yarn.lock', 'package-lock.json'];
    // copy frontend
    if (frontend !== 'none') {
        const sourceTemplateDir = `${rootDir}/frontend/${frontend}`;
        await copyDir(sourceTemplateDir, projectPath, { verbose, skip: skip.map(f => path.join(sourceTemplateDir, f)) });
    }
    // shared files
    const sourceSharedDir = `${rootDir}/shared`;
    await copyDir(sourceSharedDir, projectPath, { verbose, skip: skip.map(f => path.join(sourceSharedDir, f)) });
    // copy contract files
    const contractSourceDir = `${rootDir}/contracts/${contract}`;
    await copyDir(contractSourceDir, `${projectPath}/contract`, {
        verbose,
        skip: skip.map(f => path.join(contractSourceDir, f))
    });
    // copy tests
    const testFramework = supportsSandbox ? 'workspaces-tests' : 'classic-tests';
    let sourceTestDir = `${rootDir}/integration-tests`;
    if (supportsSandbox) {
        switch (contract) {
            case 'js':
            case 'assemblyscript':
                sourceTestDir = path.resolve(sourceTestDir, testFramework, 'ts');
                break;
            case 'rust':
                sourceTestDir = path.resolve(sourceTestDir, 'workspaces-tests/rs');
                break;
        }
    }
    else {
        switch (contract) {
            case 'js':
            case 'assemblyscript':
                sourceTestDir = path.resolve(sourceTestDir, 'classic-tests');
                break;
            case 'rust':
                sourceTestDir = path.resolve(sourceTestDir, 'workspaces-tests/rs');
                break;
        }
    }
    await copyDir(sourceTestDir, `${projectPath}/integration-tests/`, {
        verbose,
        skip: skip.map(f => path.join(sourceTestDir, f))
    });
    // add .gitignore
    await (0, exports.renameFile)(`${projectPath}/near.gitignore`, `${projectPath}/.gitignore`);
    // copy yarn.lock to all places
    await (0, yarn_lock_1.yarnLock)(contract, frontend, projectPath, supportsSandbox, rootDir);
}
exports.createFiles = createFiles;
const renameFile = async function (oldPath, newPath) {
    return new Promise((resolve, reject) => {
        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                console.error(err);
                reject(err);
                return;
            }
            resolve();
        });
    });
};
exports.renameFile = renameFile;
// Wrap `ncp` tool to wait for the copy to finish when using `await`
// Allow passing `skip` variable to skip copying an array of filenames
function copyDir(source, dest, { skip, verbose }) {
    return new Promise((resolve, reject) => {
        const copied = [];
        const skipped = [];
        const filter = skip && function (filename) {
            const shouldCopy = !skip.find(f => filename.includes(f));
            shouldCopy ? copied.push(filename) : skipped.push(filename);
            return !skip.find(f => filename.includes(f));
        };
        ncp(source, dest, { filter }, (err) => {
            if (err) {
                reject(err);
                return;
            }
            if (verbose) {
                console.log('Copied:');
                copied.forEach(f => console.log('  ' + f));
                console.log('Skipped:');
                skipped.forEach(f => console.log('  ' + f));
            }
            resolve();
        });
    });
}
exports.copyDir = copyDir;
async function runDepsInstall(projectPath) {
    messages_1.show.depsInstall();
    const npmCommandArgs = ['deps-install'];
    await new Promise((resolve, reject) => spawn('yarn', npmCommandArgs, {
        cwd: projectPath,
        stdio: 'inherit',
    }).on('close', (code) => {
        if (code !== 0) {
            messages_1.show.depsInstallError();
            reject(code);
        }
        else {
            resolve();
        }
    }));
}
exports.runDepsInstall = runDepsInstall;
//# sourceMappingURL=make.js.map