import Vue from 'vue';

Vue.config.productionTip = false;

// 모든 테스트 파일은 파일 명 뒤에 .spec.js로 끝나야 합니다.
const testsContext = require.context('./specs', true, /\.spec$/);
testsContext.keys().forEach(testsContext);

// main.js를 제외한 모든 src 파일에 적용합니다.
const srcContext = require.context('../../src', true, /^\.\/(?!main(\.js)?$)/);
srcContext.keys().forEach(srcContext);
