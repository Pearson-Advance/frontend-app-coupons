const path = require('path');
const { createConfig } = require('@openedx/frontend-build');

const config = createConfig('webpack-dev');

config.resolve = config.resolve || {};

config.resolve.alias = {
  ...(config.resolve.alias || {}),
  features: path.resolve(__dirname, 'src/features'),
  hooks: path.resolve(__dirname, 'src/hooks'),
  api: path.resolve(__dirname, 'src/api'),
  i18n: path.resolve(__dirname, 'src/i18n'),
  app: path.resolve(__dirname, 'src/app'),
  shared: path.resolve(__dirname, 'src/shared'),
  assets: path.resolve(__dirname, 'src/assets'),
};

config.resolve.extensions = [
  ...(config.resolve.extensions || []),
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
];

config.devServer = config.devServer || {};
config.devServer.allowedHosts = ['local.openedx.io'];
config.devServer.host = '0.0.0.0';
config.devServer.port = process.env.PORT || 2006;

module.exports = config;
