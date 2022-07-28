"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackUsage = exports.trackingMessage = void 0;
const MIXPANEL_TOKEN = 'df164f13212cbb0dfdae991da60e87f2';
const chalk = require('chalk');
const mixpanel = require('mixpanel').init(MIXPANEL_TOKEN);
exports.trackingMessage = chalk `NEAR collects anonymous information on the commands used. No personal information that could identify you is shared`;
// TODO: track different failures & deps-install usage
const trackUsage = async (frontend, contract) => {
    // prevents logging from CI
    if (process.env.IS_GITHUB_ACTION) {
        console.log('Mixpanel logging is skipped in CI env');
        return;
    }
    try {
        const mixPanelProperties = {
            frontend,
            contract,
            os: process.platform,
            nodeVersion: process.versions.node,
            timestamp: new Date().toString()
        };
        mixpanel.track('track create near app', mixPanelProperties);
    }
    catch (e) {
        console.error('Warning: problem while sending tracking data. Error: ', e);
    }
};
exports.trackUsage = trackUsage;
//# sourceMappingURL=tracking.js.map