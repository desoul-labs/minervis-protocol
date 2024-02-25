'use client';

import type { Mixpanel } from 'mixpanel-browser';
import mixpanel from 'mixpanel-browser';
import { createContext } from 'react';

export type MixpanelContext = Omit<Mixpanel, 'track_pageview'>;

export const mixpanelContext = createContext<MixpanelContext>(mixpanel);
