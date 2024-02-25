'use client';

import { SolanaWalletConnectors } from '@dynamic-labs/solana';
import { NextUIProvider } from '@nextui-org/react';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { ThemeProvider } from 'next-themes';
import type { PropsWithChildren } from 'react';
import { DynamicContextProvider } from './dynamic';

const convexClient = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export default function ContextProviders({ children }: Readonly<PropsWithChildren>): JSX.Element {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID,
        walletConnectors: [SolanaWalletConnectors],
      }}
      theme='auto'
    >
      <ConvexProvider client={convexClient}>
        <ThemeProvider attribute='class'>
          <NextUIProvider>{children}</NextUIProvider>
        </ThemeProvider>
      </ConvexProvider>
    </DynamicContextProvider>
  );
}
