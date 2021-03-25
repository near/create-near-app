const { writeFileSync } = require ('fs')
require('dotenv').config({ path: './neardev/dev-account.env' })
const colors = require('colors')

const targetPath = './src/contract-name.js'
const contractNameFileContent = `module.exports = '${process.env.CONTRACT_NAME || 'near-blank-project'}'`

console.log(colors.magenta('The file `contract-name.js` will be written with the following content: \n'))
console.log(colors.grey(`${contractNameFileContent}\n`))

try {
  writeFileSync(targetPath, contractNameFileContent)
  console.log(colors.magenta(`contract-name.js file generated correctly at ${targetPath} \n`))
} catch (error) {
  console.error(error)
}
