const _ = require('lodash');

function buildPackageJson({contract, frontend, projectName, workspacesSupported}) {
  const result = basePackage({
    contract, frontend, projectName, workspacesSupported,
  });
  if (frontend === 'react') {
    _.merge(result, reactPackage());
  }
  return result;
}

function basePackage({contract, frontend, projectName, workspacesSupported}) {
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
      ...testScripts(contract),
    },
    'devDependencies': {
      'near-cli': '^3.3.0',
      ...workspaceDevDependencies(workspacesSupported),
      ...frontendDevDependencies(hasFrontend),
    },
    'dependencies': {
      ...frontendDependencies(hasFrontend),
    }
  };
}

const startScript = hasFrontend => hasFrontend ? {
  'start': 'echo The app is starting! && env-cmd -f ./neardev/dev-account.env parcel frontend/index.html --open'
} : {};
const buildScript = hasFrontend => hasFrontend ? {
  'build': 'npm run build:contract && npm run build:web',
  'build:web': 'parcel build frontend/index.html --public-url ./',
} : {
  'build': 'npm run build:contract',
};
const buildContractScript = contract => {
  switch (contract) {
    case 'js':
      return {
        'build:contract': 'cd contract && npm run build',
      };
    case 'assemblyscript':
      return {
        'build:contract': 'cd contract && npm run build',
      };
    case 'rust':
      return {
        'build:contract': 'cd contract && rustup target add wasm32-unknown-unknown && cargo build --all --target wasm32-unknown-unknown --release',
      };
    default:
      return {};
  }
};

const deployScript = (contract) => {
  switch (contract) {
    case 'js': return {
      'deploy': 'cd contract && npm run deploy',
    };
    case 'assemblyscript':
      return {
        'deploy': 'npm run build:contract && rm -rf neardev && near dev-deploy --wasmFile ./contract/build/release/greeter.wasm',
      };
    case 'rust':
      return {
        'deploy': 'npm run build:contract && rm -rf neardev && near dev-deploy --wasmFile ./contract/target/wasm32-unknown-unknown/release/greeter.wasm',
      };
    default:
      return {};
  }
};
const testScripts = (contract) => {
  switch (contract) {
    case 'js': return {
      'test': 'npm run build:contract && npm run test:integration',
      'test:integration': 'cd integration-tests && npm run test',
    };
    case 'assemblyscript':
      return {
        'test': 'npm run build:contract && npm run test:unit && npm run test:integration',
        'test:unit': 'cd contract && npm run test',
        'test:integration': 'cd integration-tests && npm run test',
      };
    case 'rust':
      return {
        'test': 'npm run test:unit && npm run test:integration',
        'test:unit': 'cd contract && cargo test',
        'test:integration': 'cd integration-tests && cargo run --example integration-tests',
      };
    default:
      return {};
  }
};

const workspaceDevDependencies = isSupported => isSupported ? {'near-workspaces': '^2.0.0'} : {'ava': '^4.2.0'};
const frontendDevDependencies = hasFrontend => hasFrontend ? {
  'nodemon': '~2.0.16',
  'parcel': '^2.6.0',
  'process': '^0.11.10',
  'env-cmd': '^10.1.0',
} : {};
const frontendDependencies = hasFrontend => hasFrontend ? {'near-api-js': '^0.44.2'} : {};
const reactPackage = () => ({
  'devDependencies': {
    '@babel/core': '~7.18.2',
    '@babel/preset-env': '~7.18.2',
    '@babel/preset-react': '~7.17.12',
    'ava': '^4.2.0',
    'react-test-renderer': '~18.1.0',
    'ts-node': '^10.8.0',
    'typescript': '^4.7.2'
  },
  'dependencies': {
    'react': '~18.1.0',
    'react-dom': '~18.1.0',
    'regenerator-runtime': '~0.13.9'
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



exports.buildPackageJson = buildPackageJson;