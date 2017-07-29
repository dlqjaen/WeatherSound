// 단위 테스트에 사용되는 webpack 구성입니다.

let utils = require('./utils')
let webpack = require('webpack')
let merge = require('webpack-merge')
let baseConfig = require('./webpack.base.conf')

let webpackConfig = merge(baseConfig, {
  // karma-sourcemap-loader의 인라인 소스 맵 사용
  module: {
    rules: utils.styleLoaders()
  },
  devtool: '#inline-source-map',
  resolveLoader: {
    alias: {
      // vue-loader의 ?inject 옵션을 사용하여 lang="scss" 파일을 테스트할 경우 필요합니다.
      // https://github.com/vuejs/vue-loader/issues/724 글을 참고하세요.
      'scss-loader': 'sass-loader'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/test.env')
    })
  ]
})

// 테스트 중에는 app 설정을 입력할 필요가 없습니다.
delete webpackConfig.entry

module.exports = webpackConfig
