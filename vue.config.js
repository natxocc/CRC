module.exports = {
  publicPath: './',
  assetsDir: 'reale',
  productionSourceMap: false,
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.min.js'
      }
    },
  }
}