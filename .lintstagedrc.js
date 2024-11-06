module.exports = {
  "packages/**/src/**/*.{ts,tsx}": files => {
    return "eslint --fix " + files.join(" ")
  },
  "packages/**/src/**/*.{ts,tsx,css,html,json}": files => {
    return "prettier --write " + files.join(" ")
  },
}
