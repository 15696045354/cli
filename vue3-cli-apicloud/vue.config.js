const path = require('path')
const cordovaConfig = require('cordova-config')
const rimraf = require('rimraf')
const resolve = (dir) => path.join(__dirname, dir)

const host = require('./src/utils/localIp').localip()
const port = 8081
const isDevelopment = process.env.NODE_ENV === 'development'
const indexPath = isDevelopment ? `http://${host}:${port}` : './dist/index.html'
const AutoImport = require('unplugin-auto-import/webpack')
const {
  VantResolver,
  ElementPlusResolver
} = require('unplugin-vue-components/resolvers')
const ComponentsPlugin = require('unplugin-vue-components/webpack')

// 运行调试模式删除dist
rimraf(resolve('./dist'), (err) => {
  if (err) throw err
})

module.exports = {
  publicPath: isDevelopment ? '/' : './',
  devServer: {
    host,
    port,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_BASE_API,
        ws: false,
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          '^/api': ''
        }
      },
      '/print': {
        target: process.env.VUE_APP_PRINT_API, //目标接口域名
        changeOrigin: true, //是否跨域
        pathRewrite: {
          '^/print': '' //重写接口
        }
      }
    }
  },

  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      ComponentsPlugin({
        resolvers: [VantResolver(), ElementPlusResolver()]
      }),
      {
        apply: (compiler) => {
          compiler.hooks.done.tap('done', () => {
            // 编译完成后做点什么
            const configXml = new cordovaConfig('./config.xml') //根据环境改变config.xml
            configXml.setElement('content', '', {
              src: indexPath
            })
            configXml.setPreference('debug', isDevelopment)
            configXml.writeSync()
            // console.log('build done');
          })
        }
      }
    ]
  }
}
