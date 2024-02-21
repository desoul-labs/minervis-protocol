import type { MixpanelConfig } from '@minervis-protocol/analytics/src/mixpanel';

export const mixpanelConfig: MixpanelConfig = {
  name: 'minervis-protocol',
  token: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,
};
