/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { configDefaults } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/App.tsx', 'src/main.tsx'],
    },
    workspace: [
      {
        test: {
          name: 'unit',
          globals: true,
          environment: 'node',
          include: ['./**/*.test.ts'],
          testTimeout: 5000,
          exclude: [...configDefaults.exclude, './**/*.browser.test.tsx'],
        },
      },
      {
        extends: true,
        test: {
          name: 'component',
          globals: true,
          include: ['./**/*.browser.test.tsx'],
          testTimeout: 5000,
          browser: {
            enabled: true,
            provider: 'playwright',
            instances: [
              {
                browser: 'chromium',
                setupFiles: ['./browser-test-setup.ts'],
              }
            ],
          },
        },
      },
    ]
  },
})
