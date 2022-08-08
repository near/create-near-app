import {Contract, Frontend} from './types';
import chalk from 'chalk';
import mixpanel from 'mixpanel';

const MIXPANEL_TOKEN = 'df164f13212cbb0dfdae991da60e87f2';

const tracker = mixpanel.init(MIXPANEL_TOKEN);

export const trackingMessage = chalk`NEAR collects anonymous information on the commands used. No personal information that could identify you is shared`;

// TODO: track different failures & install usage
export const trackUsage = async (frontend: Frontend, contract: Contract) => {
  // prevents logging from CI
  if (process.env.NEAR_ENV === 'ci' || process.env.NODE_ENV === 'ci') {
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
    tracker.track('track create near app', mixPanelProperties);
  } catch (e) {
    console.error(
      'Warning: problem while sending tracking data. Error: ',
      e
    );
  }
};
