<template lang="pug">
  header.header
    h1.a11y-hidden
      | WeatherSound
    nav.menu-bar
      h2.a11y-hidden
        | WeatherSound 메뉴바
      li.menu-list.logo-list
        a(href='#')
          img.logo(src='../assets/logo.svg', alt='WeatherSound Home Link')
      li.menu-list.weather-info
        | {{getCity}} / {{getWeather}}
      li.menu-list.link-list
        label.login-btn(for='login', tabindex='0' @click="showModal" v-show="!loginAfterList") Login
        button.login.a11y-hidden.hide(type='bntton')
      LoginAfterMain
</template>

<script>
import {mapGetters} from 'vuex';
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
    showModal () {
      this.$store.commit('showModal');
    },
    getCityAction () {
      this.$store.dispatch('getCityAction');
    },
    getWeatherAction () {
      this.$store.dispatch('getWeatherAction');
    },
    backgroundImg () {
      this.$store.dispatch('backgroundImg');
    },
    signUpGet () {
      this.$store.dispatch('signUpGet');
    }
  },
  beforeMount () {
    this.getCityAction();
    this.signUpGet();
  },
  beforeUpdate () {
    this.getWeatherAction();
    // this.backgroundImg();
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
  width: 84%;
  margin-left: 8%;
  border-bottom: 1px solid rgba(255,255,255,0.5);
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
  padding: 0;
}
.weather-info{
  text-align: center;
  padding-bottom: 10%;
}
.login-btn{
  display: block;
  padding: 10% 0;
  width: 100%;
  cursor: pointer;
}
</style>
