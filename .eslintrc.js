module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-typescript',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'global-require': 0,
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: ['!src/**/*'],
    }]
  },
};
