const base = require("./base");

/** @type {import("prettier").Config} */
module.exports = {
  ...base,
  plugins: ["prettier-plugin-packagejson", "prettier-plugin-solidity"],
  overrides: [
    {
      files: "*.sol",
      options: {
        parser: "solidity-parse",
        printWidth: 80,
        tabWidth: 4,
        useTabs: false,
        singleQuote: false,
        bracketSpacing: false,
      },
    },
  ],
};
