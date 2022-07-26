const fs = require('fs');
const semver = require('semver');
const chalk = require('chalk');

exports.checkWorkspacesSupport = function () {
  // TODO: implement this check
  return true;
};

exports.checkPrerequisites = function () {
  const current = process.version;
  const supported = require('../package.json').engines.node;

  if (!semver.satisfies(current, supported)) {
    console.log(chalk.red(`We support node.js version ${supported} or later`));
    return false;
  }
  return true;
};

exports.checkUserInput = function ({projectName}) {
  const dirName = `${process.cwd()}/${projectName}`;
  if (fs.existsSync(dirName)) {
    console.log(chalk.red(`This directory already exists! ${dirName}`));
    return false;
  } else {
    return true;
  }
};