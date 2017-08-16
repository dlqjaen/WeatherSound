<template lang="pug">
  .login-after(v-show='loginAfterList')
    li.menu-list.link-list
      a.recomend-btn(href='#')
        | Recomend Music
    li.menu-list.link-list
      a.mylist-btn(href='#')
        | My List
    li.profile-list.login-affter-list
      label.a11y-hidden(for='user-profile')
      button#user-profile(type='button' @click="showPopup")
        img.user-picture(:src='userInfo.img_profile', alt='현재 사용자사진')
        span {{userInfo.nickname}}
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: 'LoginAfterMain',
  computed: {
    ...mapGetters([
      'loginAfterList',
      'userInfo'
    ])
  },
  methods: {
    showPopup () {
      this.$store.commit('showPopup');
    }
  }
};
</script>
<style lang="scss" scoped>
.menu-list{
  position: relative;
  width: 84%;
  margin-left: 8%;
}
.link-list::after{
  content: '';
  z-index: -1;
  border-radius: 0 5px 5px 0;
  position: absolute;
  left: 0;
  height: 2px;
  bottom: 0;
  right: 100%;
  transition: all 0.3s ease-in-out;
}
.link-list:hover::after{
  right: 0;
  background: rgba(59, 153, 252, 0.7);
}
.link-list{
  padding: 0;
}
/* 로그인 후 메인메뉴 */
#user-profile{
  padding: 0;
  cursor: pointer;
  background: none;
  border: none;
  color: white;
  vertical-align: middle;
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
.mylist-btn, .recomend-btn{
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
</style>