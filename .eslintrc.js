module.exports = {
  root: true,
  extends: 'eslint-config-airbnb',
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-unused-vars': 'warn',
    'react/jsx-no-constructed-context-values': 'off',
    'react/prop-types': 'warn',
    'object-curly-newline': 'off',
  },
  ignorePatterns: ['coverage'],
};
