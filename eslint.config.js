import js from '@eslint/js';
import globals from 'globals';

/**
 * eslint-plugin-react / eslint-plugin-react-hooks don't yet declare an eslint 10
 * peer range, so this stays on core JS rules + JSX parsing rather than forcing
 * an unsupported peer install.
 */
export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    rules: {
      'no-unused-vars': ['warn', { varsIgnorePattern: '^React$', argsIgnorePattern: '^_' }],
    },
  },
  {
    files: ['*.config.js'],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  {
    ignores: ['dist/**', 'assets/**', 'node_modules/**'],
  },
];
