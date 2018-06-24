module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true
    },
    extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:jest/recommended'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    plugins: ['react', 'jest'],
    rules: {
        indent: ['error', 4],
        quotes: ['error', 'single'],
        semi: ['error', 'always']
    }
};
