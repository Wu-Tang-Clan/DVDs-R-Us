module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser:'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/destructuring-assignment': [0, 'always', { ignoreClassFields: true }],
    'jsx-a11y/label-has-associated-control': ['error', {
      required: {
        some: ['nesting', 'id'],
      },
    }],
    "linebreak-style": 0,
    "no-nested-ternary": "off"
  },
  
};
