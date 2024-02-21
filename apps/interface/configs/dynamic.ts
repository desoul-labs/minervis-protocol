import type { DynamicContextProps } from '@dynamic-labs/sdk-react-core';
import { SolanaWalletConnectors } from '@dynamic-labs/solana';

export const dynamicConfig: DynamicContextProps['settings'] = {
  environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID,
  walletConnectors: [SolanaWalletConnectors],
};
