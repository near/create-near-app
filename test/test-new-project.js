const shell = require('shelljs')

const TEST_PROJECT = '../create-near-app-test-project'

shell.config.fatal = true
shell.config.verbose = true

// By default, this will build & test all templates & smart contracts.
// Set CONTRACT and/or FRONTEND environment variables to test only that.
if (![undefined, 'assemblyscript', 'rust'].includes(process.env.CONTRACT)) {
  console.error(
    `Unknown CONTRACT language '${process.env.CONTRACT}'; ` +
        'use \'assemblyscript\' or \'rust\''
  )
  process.exit(1)
}

if (![undefined, 'react', 'vanilla', 'vue', 'angular'].includes(process.env.FRONTEND)) {
  console.error(
    `Unknown FRONTEND template '${process.env.FRONTEND}'; ` +
        'use \'react\', \'vanilla\', \'vue\' or \'angular\''
  )
  process.exit(1)
}

const contracts = process.env.CONTRACT
  ? [process.env.CONTRACT]
  : ['assemblyscript', 'rust']

const frontends = process.env.FRONTEND
  ? [process.env.FRONTEND]
  : ['vanilla', 'react', 'vue', 'angular']

const commands = contracts.map(c => frontends.map(f => (
  `node index.js ${TEST_PROJECT} --contract=${c} --frontend=${f}`
))).flat()

commands.forEach(command => {
  // remove temporary blank project
  shell.rm('-rf', TEST_PROJECT)
  // test generating new project in new dir
  shell.exec(command)
  shell.cd(TEST_PROJECT)
  shell.env.FILE = 'package.json'
  if (!shell.test('-e', shell.env.FILE)) {
    shell.echo(`Couldn't find ${shell.env.FILE}`)
    shell.exit(1)
  }

  shell.exec('npm install')
  shell.exec('npm run test')
  shell.cd('-')
})

// remove temporary blank project
shell.rm('-rf', TEST_PROJECT)
