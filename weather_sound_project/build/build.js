require('./check-versions')()

process.env.NODE_ENV = 'production'

let ora = require('ora')
let rm = require('rimraf')
let path = require('path')
let chalk = require('chalk')
let webpack = require('webpack')
let config = require('../config')
let webpackConfig = require('./webpack.prod.conf')

let spinner = ora('배포를 위한 빌딩 중...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  빌드 완료.\n'))
    console.log(chalk.yellow(
      '  Tip: 빌드 된 파일은 HTTP 서버를 통해 제공됩니다.\n' +
      '  file:// 프로토콜을 사용할 경우 작동하지 않습니다.\n'
    ))
  })
})
