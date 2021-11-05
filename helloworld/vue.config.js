module.exports = {
  chainWebpack: (config) => {
    config.externals(["single-spa"]);
  },
  runtimeCompiler: true,
  devServer: {
    https: false,
    host: 'localhost',
    port: 8081,
    // publicPath: 'app2/'
  },
};
