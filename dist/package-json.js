"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPackageJson = void 0;
const _ = require('lodash');
function buildPackageJson({ contract, frontend, projectName, supportsSandbox }) {
    const result = basePackage({
        contract, frontend, projectName, supportsSandbox,
    });
    if (frontend === 'react') {
        _.merge(result, reactPackage());
    }
    return result;
}
exports.buildPackageJson = buildPackageJson;
function basePackage({ contract, frontend, projectName, supportsSandbox }) {
    const hasFrontend = frontend !== 'none';
    return {
        'name': projectName,
        'version': '1.0.0',
        'license': '(MIT AND Apache-2.0)',
        'scripts': {
            ...startScript(hasFrontend),
            ...deployScript(contract),
            ...buildScript(hasFrontend),
            ...buildContractScript(contract),
            'test': 'yarn build:contract && yarn test:unit && yarn test:integration',
            ...unitTestScripts(contract),
            ...integrationTestScripts(contract, supportsSandbox),
            ...npmInstallScript(contract, supportsSandbox),
        },
        'devDependencies': {
            'near-cli': '3.3.0',
            'nodemon': '2.0.16',
            ...contractDevDependencies(contract),
            ...workspaceDevDependencies(supportsSandbox),
            ...frontendDevDependencies(hasFrontend),
        },
        'dependencies': {
            'yarn': '1.22.19',
            ...frontendDependencies(hasFrontend),
        }
    };
}
const startScript = hasFrontend => hasFrontend ? {
    'start': 'echo The app is starting! && env-cmd -f ./neardev/dev-account.env parcel frontend/index.html --open'
} : {};
const buildScript = hasFrontend => hasFrontend ? {
    'build': 'yarn build:contract && yarn build:web',
    'build:web': 'parcel build frontend/index.html --public-url ./',
} : {
    'build': 'yarn build:contract',
};
const buildContractScript = contract => {
    switch (contract) {
        case 'js':
            return {
                'build:contract': 'cd contract && yarn build',
            };
        case 'assemblyscript':
            return {
                'build:contract': 'yarn build:asb && yarn build:cpwasm',
                'build:asb': 'cd contract && yarn build',
                'build:cpwasm': 'mkdir -p out && cp contract/build/release/hello_near.wasm ./out/hello_near.wasm'
            };
        case 'rust':
            return {
                'build:contract': 'yarn build:rustup && yarn build:cpwasm',
                'build:rustup': 'cd contract && rustup target add wasm32-unknown-unknown && cargo build --all --target wasm32-unknown-unknown --release',
                'build:cpwasm': 'mkdir -p out && cp ./contract/target/wasm32-unknown-unknown/release/hello_near.wasm ./out/hello_near.wasm',
            };
        default:
            return {};
    }
};
const deployScript = (contract) => {
    switch (contract) {
        case 'js':
            return {
                'deploy': 'cd contract && yarn deploy',
            };
        case 'assemblyscript':
        case 'rust':
            return {
                'deploy': 'yarn build:contract && near dev-deploy --wasmFile ./out/hello_near.wasm',
            };
        default:
            return {};
    }
};
const unitTestScripts = (contract) => {
    switch (contract) {
        case 'js':
        case 'assemblyscript':
            return { 'test:unit': 'cd contract && yarn test' };
        case 'rust':
            return { 'test:unit': 'cd contract && cargo test' };
        default:
            return {};
    }
};
const integrationTestScripts = (contract, supportsSandbox) => {
    if (supportsSandbox) {
        switch (contract) {
            case 'assemblyscript':
            case 'js':
                return {
                    'test:integration': 'cd integration-tests && yarn test',
                };
            case 'rust':
                return {
                    'test:integration': 'cd integration-tests && cargo run --example integration-tests',
                };
            default:
                return {};
        }
    }
    else {
        return {
            'test': 'yarn build:contract && yarn test:integration',
            'test:integration': 'cd integration-tests && yarn test',
        };
    }
};
const contractDevDependencies = contract => {
    switch (contract) {
        case 'assemblyscript':
            return { 'near-sdk-as': '3.2.3' };
        case 'js':
            return { 'near-sdk-js': '0.4.0-2' };
        default:
            return {};
    }
};
const workspaceDevDependencies = isSupported => isSupported ? { 'near-workspaces': '3.1.0' } : { 'ava': '4.2.0' };
const frontendDevDependencies = hasFrontend => hasFrontend ? {
    'nodemon': '2.0.16',
    'parcel': '2.6.0',
    'process': '0.11.10',
    'env-cmd': '10.1.0',
} : {};
const frontendDependencies = hasFrontend => hasFrontend ? { 'near-api-js': '0.44.2' } : {};
const reactPackage = () => ({
    'devDependencies': {
        '@babel/core': '7.18.2',
        '@babel/preset-env': '7.18.2',
        '@babel/preset-react': '7.17.12',
        'ava': '4.2.0',
        'react-test-renderer': '18.1.0',
        'ts-node': '10.8.0',
        'typescript': '4.7.2'
    },
    'dependencies': {
        'react': '18.1.0',
        'react-dom': '18.1.0',
        'regenerator-runtime': '0.13.9'
    },
    'resolutions': {
        '@babel/preset-env': '7.13.8'
    },
    'browserslist': {
        'production': [
            '>0.2%',
            'not dead',
            'not op_mini all'
        ],
        'development': [
            'last 1 chrome version',
            'last 1 firefox version',
            'last 1 safari version'
        ]
    }
});
const npmInstallScript = (contract, supportsSandbox) => {
    switch (contract) {
        case 'js':
            return supportsSandbox ?
                { 'deps-install': 'yarn && cd contract && yarn && cd ../integration-tests && yarn && cd ../..' }
                : {};
        case 'assemblyscript':
            return supportsSandbox ?
                { 'deps-install': 'yarn && cd contract && yarn && cd ../integration-tests && yarn && cd ../..' }
                : {};
        case 'rust':
            return supportsSandbox ?
                { 'deps-install': 'yarn && cd ../integration-tests && yarn && cd ../..' }
                : {};
    }
};
//# sourceMappingURL=package-json.js.map