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
    'linebreak-style': 0,
    // 'react/sort-comp': 0,
    // 'react/prop-types': 0,
    // 'no-useless-escape': 1,
    // 'max-len': [1, 151],
    // 'react/jsx-filename-extension': 0,
    // 'no-unused-vars': [1],
    // 'import/prefer-default-export': 1,
    // 'import/no-unresolved': 1,
    // 'jsx-ally/anchor-is-valid': 1,
    // 'jsx-allly/label-has-for': 1,
  },
  
};
