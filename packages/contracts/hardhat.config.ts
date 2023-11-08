import '@nomicfoundation/hardhat-toolbox-viem';
import type { HardhatUserConfig } from 'hardhat/config';

const config: HardhatUserConfig = {
  solidity: '0.8.19',
  paths: {
    root: 'src',
  },
};

// eslint-disable-next-line import/no-default-export -- config
export default config;
