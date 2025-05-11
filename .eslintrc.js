module.exports = {
  root: true,
  extends: ['universe/native', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    // Optional customizations
    'prettier/prettier': [
      'error',
      {
        tabWidth: 4,
        useTabs: false,
        singleQuote: true,
        semi: true,
        trailingComma: 'es5',
      },
    ],
    'no-case-declarations': 'off',
  },
};
