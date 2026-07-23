import { execSync } from 'child_process';

function isCargoNearInstalled() {
  try {
    // execute but hide output
    execSync('cargo near --version', { stdio: 'ignore' });
    return true; 
  } catch {
    return false;
  }
}

export default isCargoNearInstalled;