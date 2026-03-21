/** @type {import("eslint").Linter.Config} */

module.exports = {
  extends: ['./base.js'],
  plugins: ['react-hooks'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
