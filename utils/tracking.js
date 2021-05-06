const MIXPANEL_TOKEN = 'df164f13212cbb0dfdae991da60e87f2'

const chalk = require('chalk')
const mixpanel = require('mixpanel').init(MIXPANEL_TOKEN)

const track = async (frontendType, contractType) => {
  // prevents logging from CI
  if (process.env.IS_GITHUB_ACTION) { 
    console.log('Mixpanel logging is skipped in CI env')
    return
  }
  try {
    console.log(chalk`
NEAR collects basic information on the type of commands used to improve developer experiences. All data are anonymous, therefore, no personal information that could identify you will be shared.        `)
    const mixPanelProperties = {
      frontend: frontendType,
      contract: contractType,
      os: process.platform,
      timestamp: new Date().toString()
    }
    mixpanel.track('track create near app', mixPanelProperties)
  } catch (e) {
    console.error(
      'Warning: problem while sending tracking data. Error: ',
      e
    )
  }
}

exports.track = track
