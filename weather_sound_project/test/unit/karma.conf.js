// Karma 설정 파일입니다. 사용방법은 아래 링크를 참고하세요.
// http://karma-runner.github.io/0.13/config/configuration-file.html

// 해당 설정은 karma=webpack을 사용합니다.
// https://github.com/webpack/karma-webpack

var webpackConfig = require('../../build/webpack.test.conf');

module.exports = function (config) {
  config.set({
    // 브라우저를 추가하여 실행하려면 karma-runner를 설치합니다.
    // http://karma-runner.github.io/0.13/config/browsers.html
    // 그리고나서 browsers 배열에 새로운 브라우저를 추가합니다.
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'sinon-chai', 'phantomjs-shim'],
    reporters: ['spec', 'coverage'],
    files: ['./index.js'],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' },
      ]
    },
  });
};
