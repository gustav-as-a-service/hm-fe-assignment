module.exports = {
  extends: [
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    // We want to catch-throw as we please
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'linebreak-style': [
      'error',
      'unix',
    ],
    semi: [
      'error',
      'always',
    ],
    // We prefer named exports
    'import/prefer-default-export': 0,

    // We use TypeScript
    'react/require-default-props': 0,

    // Props spreading is OK as long as we have TS
    'react/jsx-props-no-spreading': 0,

    // We know we're typesafed already
    'react/prop-types': 0,
  },
  env: {
    browser: true,
    node: true,
    jest: true,
  },
};
