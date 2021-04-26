const MIXPANEL_TOKEN = 'df164f13212cbb0dfdae991da60e87f2'

const chalk = require('chalk')
const mixpanel = require('mixpanel').init(MIXPANEL_TOKEN);

const track = async (frontendType, contractType) => {
    try {
        console.log(chalk`
NEAR collect the type of UI and contract to improve developer experience. But NEAR will never send private information.
        `)
        const mixPanelProperties = {
            frontend: frontendType,
            contract: contractType,
            os: process.platform,
            timestamp: new Date().toString()
        };
        mixpanel.track('track create near app', mixPanelProperties)
    } catch (e) {
        console.error(
            'Warning: problem while sending tracking data. Error: ',
            e
        );
    }
};

exports.track = track
