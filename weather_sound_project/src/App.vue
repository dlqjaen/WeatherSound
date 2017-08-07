<template lang="pug">
  .wrapper(v-cloak)
    main-header
    recomend-music
    login-modal
    music-player
</template>

<script>
import MainHeader from './components/Main';
import RecomendMusic from './components/RecomendMusic';
import MusicPlayer from './components/MusicPlayer';
import LoginModal from './components/LoginModal';
// Vue 로드
import Vue from 'vue';
// axios 호출
import axios from 'axios';
// axios 사용준비
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);
export default {
  name: 'app',
  components: {
    MainHeader, RecomendMusic, MusicPlayer, LoginModal
  }
};
</script>

<style lang="scss">
// *{
//   transition: all 0.5s ease-in-out;
// }
[v-cloack]{
  display: none;
}
html{
  font-size: 10px;
  box-sizing: border-box;
  font-family: 'Khula', sans-serif;
}
body{
  overflow: hidden;
  margin: 0;
  background: url('./assets/sunny-01.jpg') no-repeat;
  background-size: cover;
  background-position: center;
  color: white;
}
a{
  display: block;
  text-decoration: none;
  color: white;
}
ul, nav{
  padding: 0;
  margin: 0;
  list-style: none;
}
progress{
  cursor: pointer;
}
i{
  cursor: pointer
}
/* 숨긴영역 */
.a11y-hidden{
  position: absolute;
  margin: -1px;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
}
  /* 전체 감싸는 영역 */
.wrapper{
  width:100%;
  height: 100vh;
  background: rgba(0,0,0,0.3);
  font-size: 1.6rem;
}
.hide{
  display: none;
}
</style>