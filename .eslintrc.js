module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  parserOptions: {
    project: 'tsconfig.json'
  },
  extends: [
    'airbnb-typescript/base'
  ],
  rules: {
    'linebreak-style': 'off'
  }
}
