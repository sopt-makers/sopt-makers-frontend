module.exports = {
  'apps/crew/**/*.{ts,tsx}': ['eslint --fix', () => 'yarn typecheck --filter=crew'],
  'apps/playground/**/*.{ts,tsx}': ['eslint --fix', () => 'yarn typecheck --filter=playground'],
  '**/*.{ts,tsx,js,jsx,json,css,md}': 'prettier --write --ignore-path .prettierignore',
};
