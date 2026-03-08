/** @type {import("eslint").Linter.Config} */

module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  plugins: ["@typescript-eslint", "simple-import-sort"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  rules: {
    // TypeScript
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_",
        caughtErrors: "all",
      },
    ],
    "@typescript-eslint/no-empty-object-type": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/consistent-type-exports": "error",

    // Import 정렬
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",

    // React Hooks
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
};
