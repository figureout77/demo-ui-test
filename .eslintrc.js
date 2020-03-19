module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'indent': 0,
    'quotes': ['error', 'single'],
    'semi': 0,
    'eol-last': 0,
    'space-before-blocks': 0, // for temp use
    "no-control-regex": 2, // 禁止在正则表达式中使用控制字符
    'key-spacing': [0, { 'beforeColon': false, 'afterColon': true }],
    'space-after-keywords': [0, 'always'], // 关键字后面是否要空一格
    'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
