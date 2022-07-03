module.exports = {
  root: true,
  extends: 'eslint-config-airbnb',
  rules: {
    quotes: [2, 'single', { avoidEscape: true }],
  },
  ignorePatterns: ['coverage'],
};
