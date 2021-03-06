// vue.config.js
const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)
module.exports = {
  lintOnSave: true,
  runtimeCompiler: false,
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  devServer: {
    // 绕过主机检查
    disableHostCheck: true,

    proxy: {
      '/': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        pathRewrite: {
          '^/': '/'
        }
      }
    }
  }
}
