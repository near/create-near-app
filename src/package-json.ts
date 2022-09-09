import {Contract, CreateProjectParams, PackageManager, TestingFramework} from './types';

type Entries = Record<string, unknown>;
type PackageBuildParams = Pick<CreateProjectParams, 'contract' | 'frontend' | 'tests' | 'packageManager' | 'projectName'>;

export function buildPackageJson({contract, frontend, tests, packageManager, projectName}: PackageBuildParams): Entries {
  const result = basePackage({
    contract, frontend, tests, packageManager, projectName,
  });
  return result;
}

function basePackage({contract, frontend, tests, packageManager, projectName}: PackageBuildParams): Entries {
  const hasFrontend = frontend !== 'none';
  return {
    'name': projectName,
    'version': '1.0.0',
    'license': '(MIT AND Apache-2.0)',
    ...workspaces(packageManager),
    'scripts': {
      ...startScript(packageManager, hasFrontend),
      ...deployScript(packageManager, contract),
      ...buildScript(packageManager, hasFrontend),
      ...buildContractScript(packageManager, contract),
      ...testScript(packageManager),
      ...unitTestScripts(packageManager, contract),
      ...integrationTestScripts(packageManager, contract, tests),
    },
    'devDependencies': {
      'near-cli': '^3.3.0',
    },
    'dependencies': {}
  };
}

const workspaces = (packageManager: PackageManager): Entries => {
  switch (packageManager) {
    case 'pnpm':
      return {};
    case 'yarn':
    case 'npm':
      return {
        'workspaces': [
          "contracts",
          "frontend",
          "integration-tests"
        ]
      };
  }
}

const startScript = (packageManager: PackageManager, hasFrontend: boolean): Entries => {
  if (!hasFrontend) return {}
  switch (packageManager) {
    case 'pnpm':
      return { 'start': packageManager + ' --recursive --if-present start' }
    case 'yarn':
      return { 'start': packageManager + ' workspaces foreach start' }
    case 'npm':
      return { 'start': packageManager + ' start --workspaces' }
  }
}

const buildScript = (packageManager: PackageManager, hasFrontend: boolean): Entries => {
  switch (packageManager) {
    case 'pnpm':
      return { 'build': packageManager + ' --recursive --if-present build' }
    case 'yarn':
      return { 'build': packageManager + ' workspaces foreach build' }
    case 'npm':
      return { 'build': packageManager + ' build --workspaces' }
  }
}

const buildContractScript = (packageManager: PackageManager, contract: Contract): Entries => {
  switch (contract) {
    case 'js':
      switch (packageManager) {
        case 'pnpm':
          return {
            'build:contracts': 'pnpm --filter @hello_near/contracts build',
          }
        case 'yarn':
          return {
            'build:contracts': 'yarn workspace @hello_near/contracts build',
          }
        case 'npm':
          return {
            'build:contracts': 'npm run build --workspace=@hello_near/contracts',
          }
      }
    case 'rust':
      return {
        'build:contracts': 'cd contracts && ./build.sh',
      };
  }
};

const deployScript = (packageManager: PackageManager, contract: Contract): Entries => {
  switch (contract) {
    case 'js':
      switch (packageManager) {
        case 'pnpm':
          return {
            'deploy': 'pnpm --recursive run deploy',
          }
        case 'yarn':
          return {
            'deploy': 'yarn workspaces foreach deploy',
          }
        case 'npm':
          return {
            'deploy': 'npm run deploy --workspaces',
          }
      }
    case 'rust':
      return {
        'deploy': 'cd contracts && ./deploy.sh',
      };
  }
};

const unitTestScripts = (packageManager: PackageManager, contract: Contract): Entries => {
  switch (contract) {
    case 'js':
      switch (packageManager) {
        case 'pnpm':
          return {
            'test:unit': 'pnpm --recursive run test',
          }
        case 'yarn':
          return {
            'test:unit': 'yarn workspaces foreach test',
          }
        case 'npm':
          return {
            'test:unit': 'npm run test --workspaces',
          }
      }
    case 'rust':
      return {'test:unit': 'cd contracts && cargo test'};
  }
};

const integrationTestScripts = (packageManager: PackageManager, contract: Contract, tests: TestingFramework): Entries => {
  switch (contract) {
    case 'js':
      switch (packageManager) {
        case 'pnpm':
          return {
            'test:integration': 'pnpm test -- -- "./contract/build/hello_near.wasm"',
          }
        case 'yarn':
          return {
            'test:integration': 'yarn test -- -- "./contract/build/hello_near.wasm"',
          }
        case 'npm':
          return {
            'test:integration': 'npm run test -- -- "./contract/build/hello_near.wasm"',
          }
      }
    case 'rust':
      return {
        'test:integration': 'cargo run --example integration-tests "./contract/target/wasm32-unknown-unknown/release/hello_near.wasm"',
      }
    }
};

const testScript = (packageManager: PackageManager): Entries => {
  switch (packageManager) {
    case 'pnpm':
      return {
        'test': 'pnpm test:unit && pnpm test:integration',
      }
    case 'yarn':
      return {
        'test': 'yarn test:unit && yarn test:integration',
      }
    case 'npm':
      return {
        'test': 'npm run test:unit && npm run test:integration',
      }
  }
}
