const webpack = require('webpack')
const htmlWebpckPlugin = require('./html-webpack-plugin.js')

const option = {
  plugins: [
    new htmlWebpckPlugin({
      addPath: './public/index.html',
      addData: {
        title: '你好'
      }
    })
  ]
}

const compiler = webpack(option)

compiler.run()
