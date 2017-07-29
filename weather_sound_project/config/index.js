let path = require('path');

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // 기본적으로 Gzip 압축을 사용하지 않습니다.
    // 'true'로 설정하려면 아래 명령을 실행해 모듈을 설치합니다.
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // --report 추가 인자를 사용하여 build 명령을 실행하면, 빌드 완료 후 번들 분석기 보고서를 볼 수 있습니다.
    // `npm run build --report`
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    // CSS 소스맵(Sourcemaps)은 상대 경로 설정 시, 문제가 발생하여 사용하지 않습니다.
    // CSS-Loader README를 읽어보세요.
    // (https://github.com/webpack/css-loader#sourcemaps)
    cssSourceMap: false
  }
}
