/** @type {import("eslint").Linter.Config} */

module.exports = {
  extends: [
    "./index.js",
    "next/core-web-vitals",
  ],
  rules: {
    "react/display-name": "off",
    "@next/next/no-img-element": "off",
    "import/no-unused-modules": ["warn", { unusedExports: true }],
  },
};
