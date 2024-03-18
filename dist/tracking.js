"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackUsage = exports.trackingMessage = void 0;
const chalk_1 = __importDefault(require("chalk"));
const mixpanel_1 = __importDefault(require("mixpanel"));
const MIXPANEL_TOKEN = '24177ef1ec09ffea5cb6f68909c66a61';
const tracker = mixpanel_1.default.init(MIXPANEL_TOKEN);
exports.trackingMessage = (0, chalk_1.default) `Near collects anonymous information on the commands used. No personal information that could identify you is shared`;
// TODO: track different failures & install usage
const trackUsage = async (frontend) => {
    // prevents logging from CI
    if (process.env.NEAR_ENV === 'ci' || process.env.NODE_ENV === 'ci') {
        console.log('Mixpanel logging is skipped in CI env');
        return;
    }
    try {
        const mixPanelProperties = {
            frontend,
            // contract,
            // testing,
            os: process.platform,
            nodeVersion: process.versions.node,
            timestamp: new Date().toString()
        };
        tracker.track('CNA', mixPanelProperties);
    }
    catch (e) {
        console.error('Warning: problem while sending tracking data. Error: ', e);
    }
};
exports.trackUsage = trackUsage;
//# sourceMappingURL=tracking.js.map