import config from '@minervis-protocol/configs/tailwind';
import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
export default {
  ...config,
  plugins: [nextui()],
};
