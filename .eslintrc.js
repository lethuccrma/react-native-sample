module.exports = {
  root: true,
  extends: 'eslint-config-airbnb',
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
  },
  ignorePatterns: ['coverage'],
};
