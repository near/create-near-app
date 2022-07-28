"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMessage = exports.preMessage = void 0;
const chalk = require('chalk');
function preMessage(settings) {
    switch (settings.contract) {
        case 'assemblyscript':
            return asPreMessage(settings);
        default:
            return true;
    }
}
exports.preMessage = preMessage;
function postMessage(settings) {
    switch (settings.contract) {
        default:
            return true;
    }
}
exports.postMessage = postMessage;
// AS preMessage
const AS_NOT_SUPPORTED_MSG = chalk `
{yellow Warning} NEAR-SDK-AS might {bold {red not be compatible}} with your system
`;
async function asPreMessage({ supportsSandbox }) {
    if (!supportsSandbox) {
        console.log(AS_NOT_SUPPORTED_MSG);
        return true;
    }
}
//# sourceMappingURL=checks.js.map