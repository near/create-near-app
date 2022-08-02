import {Contract, CreateProjectParams, TestingFramework} from './types';

type Entries = Record<string, unknown>;
type PackageBuildParams = Pick<CreateProjectParams, 'contract'| 'frontend' | 'tests' | 'projectName'>;
export function buildPackageJson({contract, frontend, tests, projectName}: PackageBuildParams): Entries {
  const result = basePackage({
    contract, frontend, tests, projectName,
  });
  return result;
}

function basePackage({contract, frontend, tests, projectName}: PackageBuildParams): Entries {
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
      'test': 'npm run test:unit && npm run test:integration',
      ...unitTestScripts(contract),
      ...integrationTestScripts(contract, tests),
      ...npmInstallScript(contract, tests, hasFrontend),
    },
    'devDependencies': {
      'near-cli': '^3.3.0',
    },
    'dependencies': {}
  };
}

const startScript = (hasFrontend: boolean) => hasFrontend ? {
  'start': 'cd frontend && npm run start'
} : {};

const buildScript = (hasFrontend: boolean) => hasFrontend ? {
  'build': 'npm run build:contract && npm run build:web',
  'build:web': 'cd frontend && npm run build',
} : {
  'build': 'npm run build:contract',
};

const buildContractScript = (contract: Contract) => {
  switch (contract) {
    case 'assemblyscript':
      return {
        'build:contract': 'cd contract && npm run build',
      };
    case 'js':
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

const deployScript = (contract: Contract) => {
  switch (contract) {
    case 'assemblyscript':
    case 'js':
      return {
        'deploy': 'cd contract && npm run deploy',
      };
    case 'rust':
      return {
        'deploy': 'npm run build:contract && cd contract && near dev-deploy --wasmFile ./target/wasm32-unknown-unknown/release/hello_near.wasm',
      };
    default:
      return {};
  }
};

const unitTestScripts = (contract: Contract) => {
  switch (contract) {
    case 'js':
    case 'assemblyscript':
      return {'test:unit': 'cd contract && npm test'};
    case 'rust':
      return {'test:unit': 'cd contract && cargo test'};
    default:
      return {};
  }
};

const integrationTestScripts = (contract: Contract, tests: TestingFramework) => {
  if (tests === 'workspaces') {
    switch (contract) {
      case 'assemblyscript':
        return {
          'test:integration': 'npm run build:contract && cd integration-tests && npm test -- -- "./contract/build/release/hello_near.wasm"',
        };
      case 'js':
        return {
          'test:integration': 'npm run build:contract && cd integration-tests && npm test  -- -- "./contract/build/hello_near.wasm"',
        };
      case 'rust':
        return {
          'test:integration': 'npm run build:contract && cd integration-tests && cargo run --example integration-tests "../contract/target/wasm32-unknown-unknown/release/hello_near.wasm"',
        };
      default:
        return {};
    }
  } else {
    return {
      'test:integration': 'npm run deploy && cd integration-tests && npm test',
    };
  }
};

const npmInstallScript = (contract: Contract, tests: TestingFramework, hasFrontend: boolean) => {
  switch (contract) {
    case 'assemblyscript':
    case 'js':
      if (hasFrontend) {
        return {'deps-install': 'npm install && cd contract && npm install && cd ../integration-tests && npm install && cd ../frontend && npm install && cd ..'};
      } else {
        return {'deps-install': 'npm install && cd contract && npm install && cd ../integration-tests && npm install && cd ..'};
      }
    case 'rust':
      if (tests === 'workspaces') {
        if (hasFrontend) {
          return {'deps-install': 'npm install && cd frontend && npm install && cd ..'};
        } else {
          return {'deps-install': 'npm install'};
        }
      } else {
        if (hasFrontend) {
          return {'deps-install': 'npm install && cd integration-tests && npm install && cd ../frontend && npm install && cd ..'};
        } else {
          return {'deps-install': 'npm install && cd integration-tests && npm install && cd ..'};
        }
      }
  }
};
