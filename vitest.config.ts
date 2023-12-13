import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    setupFiles: ['tests/setup.ts'],
    environment: 'node',
    coverage: {
      provider: 'v8',
      include: ['src/app/**/**/*.ts'],
      exclude: ['src/app/**/**/protocols.ts'],
    },
  },
});
