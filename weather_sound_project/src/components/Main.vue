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
        | Seoul / Sunny
      li.menu-list.link-list
        label.login-btn(for='login', tabindex='0' @click="showModal") Login
        button.login.a11y-hidden.hide(type='bntton')
      li.menu-list.link-list.login-affter-list
        a.mylist-btn(href='#')
          | MyList
      li.menu-list.link-list.login-affter-list
        a.share-btn(href='#')
          | Share
      li.profile-list.login-affter-list
        label.a11y-hidden(for='user-profile') 유저닉네임
        button#user-profile(type='button')
          img.user-picture(src='../assets/user-profile.png', alt='user-profile')
          span 유저닉네임

</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'main_header',
  methods: {
    showModal () {
      this.$store.commit('showModal');
    }
  }
};
</script>

<style scoped lang="scss">
/* header영역 Menubar*/
.header{
  float: left;
  width: 13%;
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
/* 로그인 후 메인메뉴 */
#user-profile{
  padding: 0;
  cursor: pointer;
  background: none;
  border: none;
  color: white;
  vertical-align: middle;
  text-align: left;
  font-size: 1.4rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.user-picture{
  border-radius: 100%;
  overflow: hidden;
  width: 20%;
  vertical-align: middle;
  margin-right: 10%;
}
.mylist-btn, .share-btn{
  padding: 10% 0;
}
.profile-list{
  position: absolute;
  bottom: 0;
  width: 84%;
  margin-left: 8%;
  border-top: 1px solid rgba(255,255,255,0.5);
}
#user-profile{
  padding: 10% 0;
}
.login-affter-list{
  //  display: none; 
}
</style>
