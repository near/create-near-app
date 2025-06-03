const { execSync } = require('child_process');

function isCargoNearInstalled() {
  const output = execSync('cargo --list', { encoding: 'utf-8' });
  return output.includes('    near');
}

export default isCargoNearInstalled;