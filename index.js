#!/usr/bin/env node
const yargs = require('yargs')
const { basename, resolve } = require('path')
const replaceInFiles = require('replace-in-files')
const ncp = require('ncp').ncp
ncp.limit = 16
const fs = require('fs')
const spawn = require('cross-spawn')
const chalk = require('chalk')
const which = require('which')
const sh = require('shelljs')
const path = require('path')

const renameFile = async function(oldPath, newPath) {
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
function copyDir (source, dest, { skip, veryVerbose } = {}) {
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

const createProject = async function({ contract, frontend, projectDir, veryVerbose }) {
  const templateDir = `/templates/${frontend}`
  const sourceTemplateDir = __dirname + templateDir

  console.log(`Copying files to new project directory (${projectDir}) from template source (${sourceTemplateDir}).`)

  await copyDir(sourceTemplateDir, projectDir, { veryVerbose, skip: [
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
    ...sh.ls(`${__dirname}/common/frontend`).map(f => path.join('src', f))
  ]})


  // copy common files
  await copyDir(`${__dirname}/common/frontend`, `${projectDir}/src`)
  const contractSourceDir = `${__dirname}/common/contracts/${contract}`
  await copyDir(contractSourceDir, `${projectDir}/contract`, { veryVerbose, skip: [
    // as above, skip rapid-development build artifacts
    path.join(contractSourceDir, 'node_modules'),
    path.join(contractSourceDir, 'yarn.lock'),
    path.join(contractSourceDir, 'package-lock.json'),
  ]})

  // update package name
  let projectName = basename(resolve(projectDir))
  await replaceInFiles({
    files: [
      // NOTE: These can use globs if necessary later
      `${projectDir}/README.md`,
      `${projectDir}/package.json`,
      `${projectDir}/contract/README.md`,
      `${projectDir}/src/config.js`,
      `${projectDir}/src/App.vue`,
      `${projectDir}/angular.json`,
      `${projectDir}/karma.conf.js`,
      `${projectDir}/set-contract-name.js`,
    ],
    from: /near-blank-project/g,
    to: projectName
  })

  if (contract === 'rust') {
    await replaceInFiles({ files: `${projectDir}/src/**/*`, from: /getGreeting/g, to: 'get_greeting' })
    await replaceInFiles({ files: `${projectDir}/src/**/*`, from: /setGreeting/g, to: 'set_greeting' })
    await replaceInFiles({ files: `${projectDir}/src/**/*`, from: /{ accountId:/g, to: '{ account_id:' })
    await replaceInFiles({ files: `${projectDir}/package.json`, from: 'cd contract && npm run test', to: 'cd contract && cargo test -- --nocapture' })
  }

  await renameFile(`${projectDir}/near.gitignore`, `${projectDir}/.gitignore`)
  console.log('Copying project files complete.\n')

  const hasNpm = which.sync('npm', { nothrow: true })
  const hasYarn = which.sync('yarn', { nothrow: true })
  //console.log('hasYarn:' + hasYarn + ' hasNmp:' + hasNpm)

  if (hasYarn) {
    await replaceInFiles({ files: `${projectDir}/README.md`, from: /npm\b( run)?/g, to: 'yarn' })
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

  {bold ${runCommand} deploy}
    Deploys contract in permanent location (as configured in {bold src/config.js}).
    Also deploys web frontend using GitHub Pages.
    Consult with {bold README.md} for details on how to deploy and {bold package.json} for full list of commands.

We suggest that you begin by typing:

  {bold cd ${projectDir}}
  {bold ${runCommand} dev}

Happy hacking!
`)
}

const opts = yargs
  .strict()
  .usage('$0 <projectDir>', 'Create a new NEAR project')
// BUG: does not work; https://github.com/yargs/yargs/issues/1331
  .example('$0 new-app', 'Create a project called "new-app"')
  .option('frontend', {
    desc: 'template to use',
    choices: ['vanilla', 'react', 'vue', 'angular'],
    default: 'vanilla',
  })
  .option('contract', {
    desc: 'language for smart contract',
    choices: ['assemblyscript', 'rust'],
    default: 'assemblyscript'
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
