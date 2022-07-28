const chalk = require('chalk');

export function preMessage(settings) {
  switch(settings.contract) {
    case 'assemblyscript':
      return asPreMessage(settings);
    default:
      return true;
  }
}

export function postMessage(settings) {
  switch(settings.contract) {
    default:
      return true;
  }
}

// AS preMessage
const AS_NOT_SUPPORTED_MSG = chalk`
{yellow Warning} NEAR-SDK-AS might {bold {red not be compatible}} with your system
`;

async function asPreMessage({ supportsSandbox }) {
  if(!supportsSandbox) {
    console.log(AS_NOT_SUPPORTED_MSG);
    return true;
  }
}
