require('./check-versions')()

let config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

let opn = require('opn')
let path = require('path')
let express = require('express')
let webpack = require('webpack')
let proxyMiddleware = require('http-proxy-middleware')
let webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// dev 서버가 들어오는 트래픽을 수신하는 기본 포트
let port = process.env.PORT || config.dev.port
// 자동으로 웹 브라우저를 열도록 설정합니다. false로 설정할 경우, 열리지 않습니다.
let autoOpenBrowser = !!config.dev.autoOpenBrowser
// 백엔드 API에 맞춰 HTTP 프록시를 정의합니다.
// https://github.com/chimurai/http-proxy-middleware
let proxyTable = config.dev.proxyTable

let app = express()
let compiler = webpack(webpackConfig)

let devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

let hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {},
  heartbeat: 2000
})
// html-webpack-plugin 템플릿 변경시 강제로 페이지를 다시 로드합니다.
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// 프록시 API 요청
Object.keys(proxyTable).forEach(function (context) {
  let options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// HTML5 히스토리 API 대체 처리
app.use(require('connect-history-api-fallback')())

// Webpack 번들 출력
app.use(devMiddleware)

// 핫 리로드 및 상태 보존 유지
// 컴파일 오류 표시
app.use(hotMiddleware)

// 정적 에셋(Static Assets) 제공
let staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

let uri = 'http://localhost:' + port

let _resolve
let readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // 테스트 할 경우, 웹 브라우저를 자동으로 열지 않습니다.
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

let server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
