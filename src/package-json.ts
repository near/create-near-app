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

const buildContractScriptName = 'build:contract';

const buildContractScript = (contract: Contract): Entries => {
  switch (contract) {
    case 'js':
      return {
        [buildContractScriptName]: 'cd contract && npm run build',
      };
    case 'rust':
      return {
        [buildContractScriptName]: 'cd contract && ./build.sh',
      };
  }
};

const deployScript = (contract: Contract): Entries => {
  switch (contract) {
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
      return {'test:unit': 'cd contract && npm test'};
    case 'rust':
      return {'test:unit': 'cd contract && cargo test'};
  }
};

const integrationTestScripts = (contract: Contract, tests: TestingFramework): Entries => {
  let wasm_path: String = '';
  switch (contract) {
    case 'js': wasm_path = 'contract/build/hello_near.wasm'; break;
    case 'rust': wasm_path = 'contract/target/wasm32-unknown-unknown/release/hello_near.wasm'; break;
  }

  let run_test: String = '';
  switch(tests){
    case 'js': run_test = `npm test -- -- "./${wasm_path}"`; break;
    case 'rust': run_test =`cargo run --example integration-tests "../${wasm_path}"`; break;
  }

  return {
    'test:integration': `npm run ${buildContractScriptName} && cd integration-tests && ${run_test}`,
  };
};

const npmInstallScript = (contract: Contract, hasFrontend: boolean, tests: TestingFramework): Entries => {
  const frontend_install = hasFrontend? 'cd frontend && npm install && cd ..' : 'echo no frontend';
  const test_install = (tests === 'js')? 'cd integration-tests && npm install && cd ..' : 'echo rs tests';

  let contract_install = '';
  switch (contract) {
    case 'js':
      contract_install = 'cd contract && npm install'; break;
    case 'rust':
      contract_install = 'echo rs contract'; break;
  }

  return {
    'postinstall': `${frontend_install} && ${test_install} && ${contract_install}`
  };
};
