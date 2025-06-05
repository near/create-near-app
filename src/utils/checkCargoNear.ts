const { execSync } = require('child_process');

function isCargoNearInstalled() {
  try {
    // execute but hide output
    execSync('cargo near --version', { stdio: 'ignore' });
    return true; 
  } catch (error) {
    return false;
  }
}

export default isCargoNearInstalled;