/** @type {import("eslint").Linter.Config} */

module.exports = {
  extends: ['./base.js', 'next/core-web-vitals'],
  rules: {
    'react/display-name': 'off',
    '@next/next/no-img-element': 'off',
  },
};
