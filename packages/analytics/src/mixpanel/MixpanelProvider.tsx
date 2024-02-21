'use client';

import { init, type Config } from 'mixpanel-browser';
import { useMemo, type ProviderProps } from 'react';
import { mixpanelContext, type MixpanelContext } from './mixpanelContext';

export interface MixpanelConfig extends Partial<Config> {
  token: string;
  name?: string;
}

export interface MixpanelProviderProps extends Omit<ProviderProps<MixpanelContext>, 'value'> {
  config: MixpanelConfig;
}

export function MixpanelProvider({ children, config }: MixpanelProviderProps) {
  const { token, name, ..._config } = config;

  const mixpanel = useMemo(() => init(token, _config, name ?? 'react-mixpanel-browser'), [_config, name, token]);

  return <mixpanelContext.Provider value={mixpanel}>{children}</mixpanelContext.Provider>;
}
