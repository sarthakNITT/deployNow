import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      prettier: eslintPluginPrettier,
      import: importPlugin,
      'unused-imports': unusedImports,
    },
    rules: {
      'prettier/prettier': 'error',

      'import/order': ['error', { 'newlines-between': 'always' }],

      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      'no-trailing-spaces': 'error',
      'no-multiple-empty-lines': ['error', { max: 1 }],
    },
  },
  tseslint.configs.recommended,
]);
