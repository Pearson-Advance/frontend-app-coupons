const path = require('path');
const { createConfig } = require('@edx/frontend-build');

module.exports = createConfig('webpack-dev', {
  resolve: {
    alias: {
      features: path.resolve(__dirname, 'src/features'),
      i18n: path.resolve(__dirname, 'src/i18n'),
      app: path.resolve(__dirname, 'src/app'),
      shared: path.resolve(__dirname, 'src/shared'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  devServer: {
    allowedHosts: 'all',
  },
});
