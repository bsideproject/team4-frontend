module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    _: false,
    ROUTE: false
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    // ecmaVersion: 12,
    // sourceType: 'module',
    parser: '@babel/eslint-parser'
  },
  plugins: [
    'vue'
  ],
  rules: {
    indent: [
      'error',
      2
    ],
    'no-trailing-spaces': 0,
    'keyword-spacing': 0,
    'no-unused-vars': 1,
    'no-multiple-empty-lines': 0,
    'space-before-function-paren': 0,
    'eol-last': 0,
    'vue/no-v-html': 0,
    'vue/multi-word-component-names': 0
  }
}