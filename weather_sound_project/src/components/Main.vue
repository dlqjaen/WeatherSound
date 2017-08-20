<template lang="pug">
  transition(name="settingHeader" appear)
    header.header
      h1.a11y-hidden(key="webTitle" click)
        | WeatherSound
      nav.menu-bar(key="navigation")
        h2.a11y-hidden
          | WeatherSound 메뉴바
        li.menu-list.logo-list
          a(href='#')
            img.logo(src='../assets/logo.svg', alt='WeatherSound Home Link')
        li.menu-list.weather-info(tabindex='0')
          p {{getCity}} / {{getWeather}}
        li.menu-list.link-list(v-show="!loginAfterList")
          button.login-btn.login(type='bntton' id="login" aria-label="로그인" @click="showModal")
            | Login
        LoginAfterMain
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';
import LoginAfterMain from './LoginAfterMain';

export default {
  name: 'main_header',
  components: {
    LoginAfterMain
  },
  computed: {
    ...mapGetters([
      'getCity',
      'getWeather',
      'loginAfterList'
    ])
  },
  methods: {
    ...mapMutations([
      'showModal'
    ])
  }
};
</script>

<style scoped lang="scss">
/* header영역 Menubar*/
.header{
  float: left;
  position: fixed;
  width: 150px;
  height: 90vh;
  background: rgba(0,0,0,0.5);
}
.menu-list{
  position: relative;
  width: 84%;
  margin-left: 8%;
}
.login-btn::after{
  content: '';
  z-index: -1;
  border-radius: 0 5px 5px 0;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  right: 100%;
  transition: right 0.3s ease-in-out;
}
.login-btn:hover::after, .login-btn:focus::after{
  right: 0;
  background: rgba(59, 153, 252, 0.7);
}
.logo-list{
  padding-top: 10%;
  text-align: center;
  border-bottom: none;
}
.logo{
  width: 70%;
}
.menu-bar{
  position: relative;
  height: 90vh;
}
.link-list{
  height: 51px;
  padding: 0;
}
.weather-info{
  text-align: center;
  border: none;
}
.login-btn{
  font-size: 1.6rem;
  text-align: left;
  color: white;
  padding: 10% 0;
  width: 100%;
}
.settingHeader-enter-active{
  animation: settingHeaderIn 2s ease forwards;
}
.settingHeader-move{
  transition: transform 2s;
}
@keyframes settingHeaderIn{
  0%{
    transform: translateX(-100%);
    opacity: 0;
  };
  50%{
    transform: translateX(5%);
  };
  100%{
    transform: translateX(0);
    opacity: 1;
  };
}
</style>
