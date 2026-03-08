const path = require('path');

module.exports = {
  'apps/crew/**/*.{ts,tsx}': (files) => {
    const relativePaths = files.map((f) => path.relative(path.join(process.cwd(), 'apps/crew'), f));
    return `cd apps/crew && eslint --fix ${relativePaths.join(' ')}`;
  },
  'apps/playground/**/*.{ts,tsx}': (files) => {
    const relativePaths = files.map((f) => path.relative(path.join(process.cwd(), 'apps/playground'), f));
    return `cd apps/playground && eslint --fix ${relativePaths.join(' ')}`;
  },
  '**/*.{ts,tsx,js,jsx,json,css,md}': ['prettier --write --ignore-path .prettierignore'],
};
