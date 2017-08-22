<template lang="pug">
  aside.spinner-background(v-show="showSpinner")
    h2.a11y-hidden 서버통신 중 페이지
    .spinner-wrapper
      img(src="http://www.dpp30.com.tw/images/img_loading.gif" alt="페이지 로딩중")
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: 'Spinner',
  computed: {
    ...mapGetters([
      'showSpinner'
    ])
  }
};
</script>

<style lang="scss" scoped>
.spinner-background{
  position: relative;
  z-index: 10001;
  background: rgba(0,0,0,0.8);
  height: 100vh;
}
.spinner-wrapper{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
</style>
