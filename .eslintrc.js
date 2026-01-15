// eslint-disable-next-line import/no-extraneous-dependencies
const { createConfig } = require('@edx/frontend-build');

module.exports = createConfig('eslint', {
  overrides: [
    {
      files: ['*.tsx'],
      rules: {
        'react/jsx-filename-extension': [
          'error',
          { extensions: ['.jsx', '.tsx'] },
        ],
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
      webpack: {
        config: 'webpack.prod.config.js',
      },
    },
  },
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
});
