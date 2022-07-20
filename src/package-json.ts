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
      'test': 'yarn test:unit && yarn test:integration',
      ...unitTestScripts(contract),
      ...integrationTestScripts(contract, tests),
      ...npmInstallScript(contract, tests, hasFrontend),
    },
    'devDependencies': {
      'near-cli': '3.3.0',
    },
    'dependencies': {}
  };
}

const startScript = (hasFrontend: boolean) => hasFrontend ? {
  'start': 'cd frontend && yarn start'
} : {};

const buildScript = (hasFrontend: boolean) => hasFrontend ? {
  'build': 'yarn build:contract && yarn build:web',
  'build:web': 'cd frontend && yarn build',
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

const integrationTestScripts = (contract: Contract, tests: TestingFramework) => {
  if (tests === 'workspaces') {
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

const npmInstallScript = (contract: Contract, tests: TestingFramework, hasFrontend: boolean) => {
  switch (contract) {
    case 'assemblyscript':
    case 'js':
      if (hasFrontend) {
        return {'deps-install': 'yarn && cd contract && yarn && cd ../integration-tests && yarn && cd ../frontend && yarn && cd ..'};
      } else {
        return {'deps-install': 'yarn && cd contract && yarn && cd ../integration-tests && yarn && cd ..'};
      }
    case 'rust':
      if (tests === 'workspaces') {
        if (hasFrontend) {
          return {'deps-install': 'yarn && cd frontend && yarn && cd ..'};
        } else {
          return {'deps-install': 'yarn'};
        }
      } else {
        if (hasFrontend) {
          return {'deps-install': 'yarn && cd integration-tests && yarn && cd ../frontend && yarn && cd ..'};
        } else {
          return {'deps-install': 'yarn && cd integration-tests && yarn && cd ..'};
        }
      }
  }
};
