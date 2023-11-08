const base = require("./base");

/** @type {import("prettier").Config} */
module.exports = {
  ...base,
  plugins: ["prettier-plugin-packagejson", "prettier-plugin-tailwindcss"],
  tailwindFunctions: ["clsx"],
};
