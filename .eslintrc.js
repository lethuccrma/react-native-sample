module.exports = {
  root: true,
  extends: 'eslint-config-airbnb',
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-unused-vars': 'warn',
    'react/jsx-no-constructed-context-values': 'off',
    'no-param-reassign': 'warn',
    'react/prop-types': 'warn',
    'import/no-cycle': 'warn',
  },
  ignorePatterns: ['coverage'],
};
