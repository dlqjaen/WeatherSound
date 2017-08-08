<template lang="pug">
  .login-after(v-show='loginAfterList')
    li.menu-list.link-list
      a.mylist-btn(href='#')
        | MyList
    li.menu-list.link-list
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
  name: 'LoginAfterMain',
  computed: {
    ...mapGetters([
      'loginAfterList'
    ])
  }
};
</script>
<style lang="scss" scoped>
.menu-list{
  width: 84%;
  margin-left: 8%;
  border-bottom: 1px solid rgba(255,255,255,0.5);
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
</style>