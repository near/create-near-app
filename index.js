#!/usr/bin/env node
const fs = require('fs')
const os = require('os')
const path = require('path')
const yargs = require('yargs')

const replaceInFiles = require('replace-in-files')
const spawn = require('cross-spawn')
const chalk = require('chalk')
const which = require('which')
const ncp = require('ncp').ncp
ncp.limit = 16

const rustSetup = require('./utils/rust-setup')
const mixpanel = require('./utils/tracking')

const type = os.type()
const arch = os.arch()

const renameFile = async function (oldPath, newPath) {
  return new Promise((resolve, reject) => {
    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        console.error(err)
        return reject(err)
      }
      resolve()
    })
  })
}

// Wrap `ncp` tool to wait for the copy to finish when using `await`
// Allow passing `skip` variable to skip copying an array of filenames
function copyDir(source, dest, { skip, veryVerbose } = {}) {
  return new Promise((resolve, reject) => {
    const copied = []
    const skipped = []
    const filter = skip && function (filename) {
      const shouldCopy = !skip.find(f => filename.includes(f))
      shouldCopy ? copied.push(filename) : skipped.push(filename)
      return !skip.find(f => filename.includes(f))
    }

    ncp(source, dest, { filter }, (err) => {
      if (err) return reject(err)

      if (veryVerbose) {
        console.log('Copied:')
        copied.forEach(f => console.log('  ' + f))
        console.log('Skipped:')
        skipped.forEach(f => console.log('  ' + f))
      }

      resolve()
    })
  })
}

const createProject = async function ({ contract, frontend, projectDir, veryVerbose }) {
  // track used options
  mixpanel.track(frontend, contract)

  console.log(chalk`Creating {bold ${projectDir}} with a contract in {bold ${contract}}, and a frontend using {bold ${frontend} js}.`)
  console.log('Remember that you can change these settings using the --frontend and --contract flags. \n')

  // skip rapid-development build artifacts and symlinks
  const skip = ['.cache', 'dist', 'out', 'node_modules', 'yarn.lock', 'package-lock.json', 'contract', 'integration-tests']

  // copy frontend
  const sourceTemplateDir = __dirname + `/templates/${frontend}`
  await copyDir(sourceTemplateDir, projectDir, { veryVerbose, skip: skip.map(f => path.join(sourceTemplateDir, f)) })

  // copy tests
  const supports_sandbox = (type === 'Linux' || type === 'Darwin') && arch === 'x64'
  if (supports_sandbox) {
    // Supports Sandbox
    const sourceTestDir = __dirname + '/integration-tests'
    await copyDir(sourceTestDir, `${projectDir}/integration-tests/`, { veryVerbose, skip: skip.map(f => path.join(sourceTestDir, f)) })
    fs.rmdirSync(`${projectDir}/integration-tests/js`, {recursive: true})
  }else{
    // Others use simple ava testing
    console.log('Our testing framework (workspaces) is not compatible with your system.\n')
    console.log('Your project will default to basic JS testing.\n')
    const sourceTestDir = __dirname + '/integration-tests/js'
    await copyDir(sourceTestDir, `${projectDir}/integration-tests`, { veryVerbose, skip: skip.map(f => path.join(sourceTestDir, f)) }) 

    await replaceInFiles({
      files: `${projectDir}/package.json`,
      from: '"test:integration:ts": "cd integration-tests/ts && npm run test"',
      to: '"test:integration:ts": "echo not supported"'
    })
    await replaceInFiles({
      files: `${projectDir}/package.json`,
      from: '"test:integration:rs": "cd integration-tests/rs && cargo run --example integration-tests"',
      to: '"test:integration:ts": "echo not supported"'
    })
    await replaceInFiles({
      files: `${projectDir}/package.json`,
      from: '"test:integration": "npm run test:integration:ts && npm run test:integration:rs"',
      to: '"test:integration": "rm ./neardev/dev-account* -f && npm run deploy && cd integration-tests && npm run test"'
    })
    await replaceInFiles({
      files: `${projectDir}/package.json`,
      from: '    "near-workspaces": "^2.0.0",\n ',
      to: ' '
    })
  }

  // copy contract files
  const contractSourceDir = `${__dirname}/contracts/${contract}`
  await copyDir(contractSourceDir, `${projectDir}/contract`, { veryVerbose, skip: skip.map(f => path.join(contractSourceDir, f)) })

  // make out dir
  fs.mkdirSync(`${projectDir}/out`)

  // changes in package.json for rust
  if (contract === 'rust') {
    await replaceInFiles({
      files: `${projectDir}/package.json`,
      from: 'cd contract && npm run build && mkdir -p ../out && rm -f ./out/main.wasm && cp ./build/release/greeter.wasm ../out/main.wasm',
      to: 'mkdir -p out && cd contract && rustup target add wasm32-unknown-unknown && cargo build --all --target wasm32-unknown-unknown --release && rm -f ./out/main.wasm && cp ./target/wasm32-unknown-unknown/release/greeter.wasm ../out/main.wasm'
    })
    await replaceInFiles({
      files: `${projectDir}/package.json`,
      from: '"test:unit": "cd contract && npm i && npm run test"',
      to: '"test:unit": "cd contract && cargo test"'
    })
  }

  // add .gitignore
  await renameFile(`${projectDir}/near.gitignore`, `${projectDir}/.gitignore`)

  console.log('Project created! Lets set it up.\n')

  const hasNpm = which.sync('npm', { nothrow: true })
  const hasYarn = which.sync('yarn', { nothrow: true })
  //console.log('hasYarn:' + hasYarn + ' hasNmp:' + hasNpm)

  if (hasYarn) {
    await replaceInFiles({ files: `${projectDir}/README.md`, from: /npm\b( run)?/g, to: 'yarn' })
  }

  // setup rust
  let wasRustupInstalled = false
  if (contract === 'rust' || supports_sandbox) {
    wasRustupInstalled = await rustSetup.setupRustAndWasm32Target()
  }

  if (hasNpm || hasYarn) {
    console.log('Installing project dependencies...')
    spawn.sync(hasYarn ? 'yarn' : 'npm', ['install'], { cwd: projectDir, stdio: 'inherit' })
    if (contract === 'assemblyscript') {
      spawn.sync('npm', ['install', '--legacy-peer-deps'], { cwd: `${projectDir}/contract`, stdio: 'inherit' })
    }
  }

  const runCommand = hasYarn ? 'yarn' : 'npm run'

  // print success message
  console.log(chalk`
Success! Created ${projectDir}
Inside that directory, you can run several commands:

  {bold ${runCommand} dev}
    Starts the development server. Both contract and client-side code will
    auto-reload once you change source files.

  {bold ${runCommand} test}
    Starts the test runner.

We suggest that you begin by typing:`)

  if (wasRustupInstalled) {
    console.log(chalk`
    {bold source $HOME/.cargo/env}
    {bold cd ${projectDir}}
    {bold ${runCommand} dev}`)
  } else {
    console.log(chalk`
    {bold cd ${projectDir}}
    {bold ${runCommand} dev}`)
  }

  console.log(chalk`
Happy hacking!`)
}

const opts = yargs
  .strict()
  .usage('$0 <projectDir>', 'Create a new NEAR project')
  // BUG: does not work; https://github.com/yargs/yargs/issues/1331
  .example('$0 new-app', 'Create a project called "new-app"')
  .option('frontend', {
    desc: 'template to use',
    choices: ['vanilla', 'react'],
    default: 'vanilla',
  })
  .option('contract', {
    desc: 'language for smart contract',
    choices: ['assemblyscript', 'rust'],
    default: 'rust'
  })
  .option('very-verbose', {
    desc: 'turn on very verbose logging',
    type: 'boolean',
    default: false,
    hidden: true,
  })
  .help()
  .argv

createProject(opts).catch(e => {
  // work around silly node error:
  //   (node:56892) [DEP0018] DeprecationWarning: Unhandled promise rejections
  //   are deprecated. In the future, promise rejections that are not handled
  //   will terminate the Node.js process with a non-zero exit code.
  console.error('Error:', e)
  process.exit(1)
})
