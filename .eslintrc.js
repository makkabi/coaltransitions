module.exports = {
  // parser: "@babel/eslint-parser",
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier",
  ],
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  plugins: ["react"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "no-var": "error",
    "prefer-const": "error",
    "object-shorthand": "warn",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "jsx-a11y/no-onchange": "off",
  },
};
