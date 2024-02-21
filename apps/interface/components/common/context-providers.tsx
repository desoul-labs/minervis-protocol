'use client';

import { MixpanelProvider } from '@minervis-protocol/analytics/src/mixpanel';
import { NextUIProvider } from '@nextui-org/react';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { ThemeProvider } from 'next-themes';
import type { PropsWithChildren } from 'react';
import { DynamicContextProvider } from './dynamic';
import { dynamicConfig } from '@/configs/dynamic';
import { mixpanelConfig } from '@/configs';

const convexClient = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export function ContextProviders({ children }: Readonly<PropsWithChildren>) {
  return (
    <MixpanelProvider config={mixpanelConfig}>
      <DynamicContextProvider settings={dynamicConfig} theme='auto'>
        <ConvexProvider client={convexClient}>
          <ThemeProvider attribute='class'>
            <NextUIProvider>{children}</NextUIProvider>
          </ThemeProvider>
        </ConvexProvider>
      </DynamicContextProvider>
    </MixpanelProvider>
  );
}
