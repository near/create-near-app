import chalk from 'chalk';
import {Contract, Frontend, TrackingEventPayload} from './types';

const POSTHOG_API_KEY = 'phc_95PGQnbyatmj2TBRPWYfhbHfqB6wgZj5QRL8WY9gW20';
const POSTHOG_API_URL = 'https://eu.i.posthog.com/capture';


export const trackingMessage = chalk.italic('Near collects anonymous information on the commands used. No personal information that could identify you is shared');

// TODO: track different failures & install usage
export const trackUsage = async (frontend: Frontend, contract: Contract) => {
  // prevents logging from CI
  if (process.env.NEAR_ENV === 'ci' || process.env.NODE_ENV === 'ci') {
    console.log('PostHog logging is skipped in CI env');
    return;
  }

  const payload: TrackingEventPayload = {
    distinct_id: 'create-near-app',
    event: 'error',
    properties: {
      engine: process.versions.node,

      os: process.platform,
    },
    timestamp: new Date(),
  };

  if (contract !== 'none') {
    payload.event = 'contract';
    payload.properties.language = contract;
  }

  if (frontend !== 'none') {
    payload.event = 'frontend';
    payload.properties.framework = frontend;
  }

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  try {
    await fetch(POSTHOG_API_URL, {
      method: 'POST',
      body: JSON.stringify({
        api_key: POSTHOG_API_KEY,
        ...payload,
      }),
      headers,
    });
  } catch (e) {
    console.error(
      '  Warning: problem while sending tracking data\n',
    );
  }
};
