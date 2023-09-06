module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier'
  ],
  rules: {
      'no-eval': ['error'],
      semi: ['error', 'always'],
      'semi-style': ['error', 'last'],
      '@typescript-eslint/explicit-member-accessibility': [
          'error',
          { overrides: { constructors: 'no-public' } }
      ],
      'object-curly-spacing': [2, 'always'],
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-namespace': 'off'
  }
};
