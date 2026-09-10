import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    // Generated/build output — never hand-edited, never linted.
    ignores: [
      'dist',
      '.output',
      '.vercel',
      '.nitro',
      '.tanstack',
      'node_modules',
      'src/routeTree.gen.ts',
      'google-ads-guardrail',
    ],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // This project deliberately ships without @types/node (see the ambient
      // `process` declares in contact.ts / weather.ts / googleReviews.ts) —
      // no-undef would otherwise fight that choice on every server function.
      'no-undef': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    // Plain Node config/scripts — not part of the browser bundle.
    files: ['*.config.{js,ts,mjs}', 'scripts/**/*.mjs', '*.cjs'],
    languageOptions: {
      globals: globals.node,
    },
  },
)
