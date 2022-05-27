#!/usr/bin/env node
const yargs = require('yargs')
const replaceInFiles = require('replace-in-files')
const ncp = require('ncp').ncp
ncp.limit = 16
const fs = require('fs')
const os = require('os')
const spawn = require('cross-spawn')
const chalk = require('chalk')
const which = require('which')
const path = require('path')
const rustSetup = require('./utils/rust-setup')
const mixpanel = require('./utils/tracking')

const renameFile = async function (oldPath, newPath) {
  return new Promise((resolve, reject) => {
    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        console.error(err)
        return reject(err)
      }
      console.log(`Renamed ${oldPath} to ${newPath}`)
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
  const isWindows = os.platform() === 'win32'
  if( isWindows ){
    console.log('Sorry, create-near-app is not compatible with Windows. Please consider using Windows Subsystem for Linux')
    return
  }

  const templateDir = `/templates/${frontend}`
  const sourceTemplateDir = __dirname + templateDir
  mixpanel.track(frontend, contract)

  console.log(`Creating project using a ${contract} contract, and a ${frontend} frontend.`)

  await copyDir(sourceTemplateDir, projectDir, {
    veryVerbose, skip: [
      // our frontend templates are set up with symlinks for easy development,
      // developing right in these directories also results in build artifacts;
      // we don't want to copy these
      path.join(sourceTemplateDir, '.cache'),
      path.join(sourceTemplateDir, 'dist'),
      path.join(sourceTemplateDir, 'out'),
      path.join(sourceTemplateDir, 'node_modules'),
      path.join(sourceTemplateDir, 'yarn.lock'),
      path.join(sourceTemplateDir, 'package-lock.json'),
      path.join(sourceTemplateDir, 'contract'),
    ]
  })

  // copy contract files
  const contractSourceDir = `${__dirname}/contracts/${contract}`
  await copyDir(contractSourceDir, `${projectDir}/contract`, {
    veryVerbose, skip: [
      // as above, skip rapid-development build artifacts
      path.join(contractSourceDir, 'node_modules'),
      path.join(contractSourceDir, 'yarn.lock'),
      path.join(contractSourceDir, 'package-lock.json'),
    ]
  })

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

  await renameFile(`${projectDir}/near.gitignore`, `${projectDir}/.gitignore`)
  console.log('Copying project files complete.\n')

  const hasNpm = which.sync('npm', { nothrow: true })
  const hasYarn = which.sync('yarn', { nothrow: true })
  //console.log('hasYarn:' + hasYarn + ' hasNmp:' + hasNpm)

  if (hasYarn) {
    await replaceInFiles({ files: `${projectDir}/README.md`, from: /npm\b( run)?/g, to: 'yarn' })
  }

  // setup rust
  let wasRustupInstalled = false
  if (contract === 'rust') {
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
