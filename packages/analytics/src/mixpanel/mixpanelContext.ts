'use client';

import type { Mixpanel } from 'mixpanel-browser';
import mixpanel from 'mixpanel-browser';
import { createContext } from 'react';

export type MixpanelContext = Mixpanel;

export const mixpanelContext = createContext<Mixpanel>(mixpanel);
