const path = require('path');
const { createConfig } = require('@edx/frontend-build');

module.exports = createConfig('webpack-prod', {
  resolve: {
    alias: {
      features: path.resolve(__dirname, 'src/features'),
      i18n: path.resolve(__dirname, 'src/i18n'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
});
