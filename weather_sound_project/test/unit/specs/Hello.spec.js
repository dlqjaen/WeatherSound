import Vue from 'vue';
import Hello from '@/components/Hello';

describe('Hello.vue', () => {
  it('콘텐츠를 올바르게 렌더링하였나?', () => {
    const Constructor = Vue.extend(Hello);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Vue.js 앱 개발을 시작해볼까요?');
  });
});
