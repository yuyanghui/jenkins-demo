const path = require('path')
const name = 'Vue Typescript Admin'

module.exports = {
  // TODO: Remember to change publicPath to fit your need
  publicPath: process.env.NODE_ENV === 'production' ? '/my-demo' : '/',
  lintOnSave: process.env.NODE_ENV === 'development',
  devServer: {
    port: 8080,
    open: true,
    host: '10.1.18.168',
    overlay: {
      warnings: false,
      errors: true
    },
    // proxy: { //配置跨域
    //   '/vue-element-admin': {
    //     target: 'http://10.1.19.84:8083/', //这里后台的地址模拟的;应该填写你们真实的后台接口
    //     ws: true,
    //     changOrigin: true, //允许跨域
    //     pathRewrite: {
    //       '^/vue-element-admin': '' //请求的时候使用这个api就可以
    //     }
    //   }
    // },
    proxy: {
      // change xxx-api/login => mock/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: 'https://vue-typescript-admin-mock-server.armour.now.sh/mock-api/v1/',
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    },
    // before: require('./mock/mock-server.js')
  },
  pwa: {
    name: name
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/_variables.scss'),
        path.resolve(__dirname, 'src/styles/_mixins.scss')
      ]
    }
  },
  chainWebpack(config) {
    // provide the app's title in html-webpack-plugin's options list so that
    // it can be accessed in index.html to inject the correct title.
    // https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-plugin
    config.plugin('html').tap(args => {
      args[0].title = name
      return args
    })
  }
}
