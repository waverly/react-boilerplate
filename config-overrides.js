const path = require("path");

module.exports = function override(config, env) {
  config.resolve = {
    alias: {
      Api: path.resolve(__dirname, "api"),
      Src: path.resolve(__dirname, "src"),
      Components: path.resolve(__dirname, "src/Components"),
      Icons: path.resolve(__dirname, "src/Icons"),
      Views: path.resolve(__dirname, "src/Views"),
      Styles: path.resolve(__dirname, "src/Styles"),
      Utils: path.resolve(__dirname, "src/Utils"),
      Shared: path.resolve(__dirname, "shared")
    }
  };

  return config;
};
