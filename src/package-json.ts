import {Contract, CreateProjectParams, TestingFramework} from './types';

type Entries = Record<string, unknown>;
type PackageBuildParams = Pick<CreateProjectParams, 'contract' | 'frontend' | 'tests' | 'projectName'>;

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
      ...npmInstallScript(contract, hasFrontend, tests),
    },
    'devDependencies': {
      'near-cli': '^3.3.0',
    },
    'dependencies': {}
  };
}

const startScript = (hasFrontend: boolean): Entries => hasFrontend ? {
  'start': 'cd frontend && npm run start'
} : {};

const buildScript = (hasFrontend: boolean): Entries => hasFrontend ? {
  'build': 'npm run build:contract && npm run build:web',
  'build:web': 'cd frontend && npm run build',
} : {
  'build': 'npm run build:contract',
};

const buildContractScript = (contract: Contract): Entries => {
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
        'build:contract': 'cd contract && ./build.sh',
      };
  }
};

const deployScript = (contract: Contract): Entries => {
  switch (contract) {
    case 'assemblyscript':
    case 'js':
      return {
        'deploy': 'cd contract && npm run deploy',
      };
    case 'rust':
      return {
        'deploy': 'cd contract && ./deploy.sh',
      };
  }
};

const unitTestScripts = (contract: Contract): Entries => {
  switch (contract) {
    case 'js':
    case 'assemblyscript':
      return {'test:unit': 'cd contract && npm test'};
    case 'rust':
      return {'test:unit': 'cd contract && cargo test'};
  }
};

const integrationTestScripts = (contract: Contract, tests: TestingFramework): Entries => {
  switch (contract) {
    case 'assemblyscript':
      if (tests === 'js') {
        return {
          'test:integration': 'npm run build:contract && cd integration-tests && npm test -- -- "./contract/build/release/hello_near.wasm"',
        };
      } else {
        return {
          'test:integration': 'npm run build:contract && cd integration-tests && cargo run --example integration-tests "../contract/build/release/hello_near.wasm"',
        };
      }
    case 'js':
      if (tests === 'js') {
        return {
          'test:integration': 'npm run build:contract && cd integration-tests && npm test  -- -- "./contract/build/hello_near.wasm"',
        };
      } else {
        return {
          'test:integration': 'npm run build:contract && cd integration-tests && cargo run --example integration-tests "../contract/build/hello_near.wasm"',
        };
      }
    case 'rust':
      if (tests === 'js') {
        return {
          'test:integration': 'npm run build:contract && cd integration-tests && npm test  -- -- "./contract/target/wasm32-unknown-unknown/release/hello_near.wasm"',
        };
      } else {
        return {
          'test:integration': 'npm run build:contract && cd integration-tests && cargo run --example integration-tests "../contract/target/wasm32-unknown-unknown/release/hello_near.wasm"',
        };
      }
  }
};

const npmInstallScript = (contract: Contract, hasFrontend: boolean, tests: TestingFramework): Entries => {
  switch (contract) {
    case 'assemblyscript':
      if (hasFrontend) {
        if (tests === 'js') {
          return {'postinstall': 'cd contract && npm install --ignore-scripts && cd ../integration-tests && npm install && cd ../frontend && npm install && cd ..'};
        } else {
          return {'postinstall': 'cd contract && npm install --ignore-scripts && cd ../frontend && npm install && cd ..'};
        }
      } else {
        if (tests === 'js') {
          return {'postinstall': 'cd contract && npm install --ignore-scripts && cd ../integration-tests && npm install && cd ..'};
        } else {
          return {'postinstall': 'cd contract && npm install --ignore-scripts && cd ..'};
        }
      }
    case 'js':
      if (hasFrontend) {
        if (tests === 'js') {
          return {'postinstall': 'cd contract && npm install && cd ../integration-tests && npm install && cd ../frontend && npm install && cd ..'};
        } else {
          return {'postinstall': 'cd contract && npm install && cd ../frontend && npm install && cd ..'};
        }
      } else {
        if (tests === 'js') {
          return {'postinstall': 'cd contract && npm install && cd ../integration-tests && npm install && cd ..'};
        } else {
          return {'postinstall': 'cd contract && npm install && cd ..'};
        }
      }
    case 'rust':
      if (hasFrontend) {
        if (tests === 'js') {
          return {'postinstall': 'cd frontend && npm install && cd ../integration-tests && npm install && cd ..'};
        } else {
          return {'postinstall': 'cd frontend && npm install && cd ..'};
        }
      } else {
        if (tests === 'js') {
          return {'postinstall': 'cd ./integration-tests && npm install && cd ..'};
        } else {
          return {};
        }
      }
  }
};
