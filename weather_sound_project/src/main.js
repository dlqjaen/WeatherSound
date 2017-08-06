import 'es6-promise/auto';
import Vue from 'vue';

// 컴포넌트 로드
import App from './App';

// vue-router 모듈 로드
import router from './router';

// axios 로드
import axios from 'axios';

// axios 사용준비
import VueAxios from 'vue-axios';

// store 로드
import {store} from './store/index.js';

Vue.use(VueAxios, axios);

// 환경설정: false로 설정할 경우, 배포에 대한 Tip을 출력하지 않습니다.
Vue.config.productionTip = false;

// 아래 라인 주석을 지우지 마세요.
/* eslint-disable no-new */

// Vue 루트 인스턴스 생성 및 설정
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
