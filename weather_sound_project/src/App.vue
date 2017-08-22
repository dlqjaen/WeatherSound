<template lang="pug">
  .wrapper(v-cloak, :style="backgroundImg")
    main-header
    transition(name="settingAction" mode="out-in" appear)
      component(:is="changeComponent")
    login-modal
    music-player
    UserProfile
    Spinner
</template>

<script>
import MainHeader from './components/Main';
import RecomendMusic from './components/RecomendMusic';
import MusicPlayer from './components/MusicPlayer';
import LoginModal from './components/LoginModal';
import UserProfile from './components/Sign/UserProfile';
import MyList from './components/Sign/MyList';
import MyListDetail from './components/Sign/MyListDetail';
import Spinner from './components/Spinner';
// Vue 로드
import Vue from 'vue';
// axios 호출
import axios from 'axios';
// axios 사용준비
import VueAxios from 'vue-axios';
import {mapGetters} from 'vuex';

Vue.use(VueAxios, axios);
// setInterval(Vue)
export default {
  name: 'app',
  components: {
    MainHeader, RecomendMusic, MusicPlayer, LoginModal, UserProfile, MyList, MyListDetail, Spinner
  },
  computed: {
    ...mapGetters([
      'backgroundImg',
      'changeComponent'
    ])
  }
};
</script>

<style lang="scss">
// *{
//   transition: all 0.5s ease-in-out;
// }
[v-cloak]{
  display: none;
}
// *{
//   outline: none;
// }
html{
  font-size: 10px;
  box-sizing: border-box;
  font-family: 'Khula', sans-serif;
}
body{
  overflow: hidden;
  margin: 0;
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
button{
  background: none;
  border:none;
  cursor: pointer;
}
/* 숨긴영역 */
.a11y-hidden{
  position: absolute;
  margin: -1px;
  top: -9999px;
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
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.settingAction-enter-active{
  animation: settingAction 1s ease-in-out forwards;
}
.settingAction-move{
  transition: transform 1s;
}
@keyframes settingAction{
  0%{
    transform: translateX(0);
    opacity: 0;
  };
  50%{
    transform: translateX(100px);
  };
  100%{
    transform: translateX(0);
    opacity: 1;
  };
}
</style>