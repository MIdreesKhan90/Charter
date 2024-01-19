const { defineConfig } = require("@vue/cli-service");
// process.env.NODE_ENV = "development";
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  configureWebpack: {
    devtool: 'source-map',
    devServer: {
      historyApiFallback: true
    }
  },
  css: {
    loaderOptions: {
      css: {
        url: false
      }
    }
  }
});

// console.log(process.env.NODE_ENV);