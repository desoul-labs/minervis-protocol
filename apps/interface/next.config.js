module.exports = {
  reactStrictMode: true,
  transpilePackages: ['@minervis-protocol/ui'],
  webpack: (config, context) => {
    if (config.plugins) {
      config.plugins.push(
        new context.webpack.IgnorePlugin({
          resourceRegExp: /^(?<temp1>lokijs|pino-pretty|encoding)$/,
        }),
      );
    }
    return config;
  },
};
