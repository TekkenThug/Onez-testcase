module.exports = {
  root: true,
  env: {browser: true, es2020: true},
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["node_modules", "vendor", ".eslintrc.cjs", "dist"],
  parser: "@typescript-eslint/parser",
  plugins: [
    "react-refresh",
    "@stylistic/eslint-plugin-js",
  ],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      {allowConstantExport: true},
    ],
    "react-hooks/exhaustive-deps": ["off"],
    "semi": "error",
    "indent": [
      "error",
      4
    ],
    "quotes": [
      "error",
      "double"
    ],
    "object-curly-spacing": [
      "error",
      "always"
    ],
    "@stylistic/js/max-len": ["error", {"code": 120}],
    "react/jsx-max-props-per-line": ["error", {"when": "multiline"}],
    "react/jsx-curly-spacing": ["error", {"when": "always"}],
    "react/jsx-first-prop-new-line": ["error", "multiline"]
  },
};
