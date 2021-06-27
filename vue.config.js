module.exports = {
  publicPath: './',
  pluginOptions: {
    electronBuilder: {
      preload: 'electron/preload.js'
    }
  }
}