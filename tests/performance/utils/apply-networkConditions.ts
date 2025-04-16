import { Page, BrowserContext, CDPSession } from '@playwright/test';
import { Protocol } from 'devtools-protocol';

export type NetworkProfile = 'offline' | 'slow3g' | 'fast3g' | '4g';

const profileSettings: Record<NetworkProfile, Protocol.Network.EmulateNetworkConditionsRequest> = {
  offline: {
    offline: true,
    latency: 0,
    downloadThroughput: 0,
    uploadThroughput: 0,
    connectionType: 'none',
  },
  slow3g: {
    offline: false,
    latency: 400,
    downloadThroughput: 400 * 1024 / 8,
    uploadThroughput: 400 * 1024 / 8,
    connectionType: 'cellular3g',
  },
  fast3g: {
    offline: false,
    latency: 150,
    downloadThroughput: 1.6 * 1024 * 1024 / 8,
    uploadThroughput: 750 * 1024 / 8,
    connectionType: 'cellular4g',
  },
  '4g': {
    offline: false,
    latency: 50,
    downloadThroughput: 4 * 1024 * 1024 / 8,
    uploadThroughput: 3 * 1024 * 1024 / 8,
    connectionType: 'wifi',
  },
};

export async function applyNetworkConditions(
  context: BrowserContext,
  page: Page,
  profile: NetworkProfile
) {
  const client: CDPSession = await context.newCDPSession(page);

  await client.send('Network.enable');

  const settings = profileSettings[profile];
  await client.send('Network.emulateNetworkConditions', settings);
}
