const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
module.exports = {
  publicPath: './',
  assetsDir: 'crc',
  productionSourceMap: false,
  lintOnSave: false,
  //baseUrl: './',
  outputDir: 'docs',
  runtimeCompiler: undefined,
  parallel: undefined,
  css: undefined,
  configureWebpack: {
    plugins: [
      new VuetifyLoaderPlugin()
    ]
  }
}