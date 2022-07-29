import {Contract, CreateProjectParams} from './types';

const _ = require('lodash');

type Entries = Record<string, unknown>;
type PackageBuildParams = Pick<CreateProjectParams, 'contract'| 'frontend'| 'projectName' | 'supportsSandbox'>;
export function buildPackageJson({contract, frontend, projectName, supportsSandbox}: PackageBuildParams): Entries {
  const result = basePackage({
    contract, frontend, projectName, supportsSandbox,
  });
  if (frontend === 'react') {
    _.merge(result, reactPackage());
  }
  return result;
}

function basePackage({contract, frontend, projectName, supportsSandbox}: PackageBuildParams): Entries {
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
      'test': 'yarn test:unit && yarn test:integration',
      ...unitTestScripts(contract),
      ...integrationTestScripts(contract, supportsSandbox),
      ...npmInstallScript(contract, supportsSandbox),
    },
    'devDependencies': {
      'near-cli': '3.3.0',
      ...frontendDevDependencies(hasFrontend),
    },
    'dependencies': {
      ...frontendDependencies(hasFrontend),
    }
  };
}

const startScript = (hasFrontend: boolean) => hasFrontend ? {
  'start': 'echo The app is starting! && env-cmd -f ./neardev/dev-account.env parcel frontend/index.html --open'
} : {};

const buildScript = (hasFrontend: boolean) => hasFrontend ? {
  'build': 'yarn build:contract && yarn build:web',
  'build:web': 'parcel build frontend/index.html --public-url ./',
} : {
  'build': 'yarn build:contract',
};

const buildContractScript = (contract: Contract) => {
  switch (contract) {
    case 'assemblyscript':
      return {
        'build:contract': 'cd contract && yarn build',
      };
    case 'js':
      return {
        'build:contract': 'cd contract && yarn build',
      };
    case 'rust':
      return {
        'build:contract': 'cd contract && rustup target add wasm32-unknown-unknown && cargo build --all --target wasm32-unknown-unknown --release',
      };
    default:
      return {};
  }
};

const deployScript = (contract: Contract) => {
  switch (contract) {
    case 'assemblyscript':
    case 'js':
      return {
        'deploy': 'cd contract && yarn deploy',
      };
    case 'rust':
      return {
        'deploy': 'yarn build:contract && cd contract && near dev-deploy --wasmFile ./target/wasm32-unknown-unknown/release/hello_near.wasm',
      };
    default:
      return {};
  }
};

const unitTestScripts = (contract: Contract) => {
  switch (contract) {
    case 'js':
    case 'assemblyscript':
      return {'test:unit': 'cd contract && yarn test'};
    case 'rust':
      return {'test:unit': 'cd contract && cargo test'};
    default:
      return {};
  }
};

const integrationTestScripts = (contract: Contract, supportsSandbox: boolean) => {
  if (supportsSandbox) {
    switch (contract) {
      case 'assemblyscript':
        return {
          'test:integration': 'yarn build:contract && cd integration-tests && yarn test -- -- "./contract/build/release/hello_near.wasm"',
        };
      case 'js':
        return {
          'test:integration': 'yarn build:contract && cd integration-tests && yarn test  -- -- "./contract/build/hello_near.wasm"',
        };
      case 'rust':
        return {
          'test:integration': 'yarn build:contract && cd integration-tests && cargo run --example integration-tests "../contract/target/wasm32-unknown-unknown/release/hello_near.wasm"',
        };
      default:
        return {};
    }
  } else {
    return {
      'test:integration': 'yarn deploy && cd integration-tests && yarn test',
    };
  }
};

const frontendDevDependencies = (hasFrontend: boolean) => hasFrontend ? {
  'nodemon': '2.0.16',
  'parcel': '2.6.0',
  'process': '0.11.10',
  'env-cmd': '10.1.0',
} : {};

const frontendDependencies = (hasFrontend: boolean) => hasFrontend ? {'near-api-js': '0.44.2'} : {};

const reactPackage = () => ({
  'devDependencies': {
    '@babel/core': '7.18.2',
    '@babel/preset-env': '7.18.2',
    '@babel/preset-react': '7.17.12',
    '@types/node': '18.6.2',
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

const npmInstallScript = (contract: Contract, supportsSandbox: boolean) => {
  switch (contract) {
    case 'assemblyscript':
    case 'js':
      return {'deps-install': 'yarn && cd contract && yarn && cd ../integration-tests && yarn && cd ..'};
    case 'rust':
      if (supportsSandbox) {
        return {'deps-install': 'yarn'};
      } else {
        return {'deps-install': 'yarn && cd integration-tests && yarn && cd ..'};
      }
  }
};
