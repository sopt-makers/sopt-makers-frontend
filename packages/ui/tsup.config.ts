import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'export.ts',
  },
  dts: true,
  external: ['react', 'react-dom', 'next'],
  sourcemap: true,
  clean: true,
  outDir: 'dist',
  tsconfig: 'tsconfig.json',
});
