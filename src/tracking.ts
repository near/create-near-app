import {Contract, Frontend, TestingFramework} from './types';
import chalk from 'chalk';
import mixpanel from 'mixpanel';

const MIXPANEL_TOKEN = '24177ef1ec09ffea5cb6f68909c66a61';

const tracker = mixpanel.init(MIXPANEL_TOKEN);

export const trackingMessage = chalk`Near collects anonymous information on the commands used. No personal information that could identify you is shared`;

// TODO: track different failures & install usage
export const trackUsage = async (frontend: Frontend, contract: Contract, testing: TestingFramework) => {
  // prevents logging from CI
  if (process.env.NEAR_ENV === 'ci' || process.env.NODE_ENV === 'ci') {
    console.log('Mixpanel logging is skipped in CI env');
    return;
  }
  try {
    const mixPanelProperties = {
      frontend,
      contract,
      testing,
      os: process.platform,
      nodeVersion: process.versions.node,
      timestamp: new Date().toString()
    };
    tracker.track('CNA', mixPanelProperties);
  } catch (e) {
    console.error(
      'Warning: problem while sending tracking data. Error: ',
      e
    );
  }
};
