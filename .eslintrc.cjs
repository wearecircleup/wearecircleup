module.exports = {
  root: true,
  env: { 
    browser: true, 
    es2020: true,
    node: true
  },
  globals: {
    describe: 'readonly',
    test: 'readonly',
    expect: 'readonly',
    vi: 'readonly',
    beforeEach: 'readonly',
    afterEach: 'readonly'
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: [
    "dist", 
    ".eslintrc.cjs",
    "backend/**/*",
    "src/**/*.ts",
    "src/**/*.d.ts",
    "tests/**/*",
    "scripts/**/*",
    "*.config.ts",
    "*.config.js",
    "vitest.config.ts"
  ],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react/jsx-no-target-blank": "off",
    "react-refresh/only-export-components": "warn",
    "react/prop-types": "off",
    "no-unused-vars": "warn",
    "react/no-unescaped-entities": "off",
    "react-hooks/exhaustive-deps": "warn",
    "react/no-unknown-property": ["error", { "ignore": ["object"] }],
  },
};
