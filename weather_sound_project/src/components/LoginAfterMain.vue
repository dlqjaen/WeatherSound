<template lang="pug">
  li.login-after(v-show='loginAfterList')
    ul
      li.navigation(:style="checkNav")
      li.menu-list.link-list
        a.recomend-btn.link-focus(href='#' @click.prevent="recomendSelect")
          | Recomend Music
      li.menu-list.link-list
        a.mylist-btn.link-focus(href='#' @click.prevent="mylistSelect")
          | My List
      li.profile-list.login-affter-list
        label.a11y-hidden(for='user-profile')
        button#user-profile(type='button' @click="showPopup")
          img.user-picture(:src='userInfo.img_profile', alt='현재 사용자사진')
          span {{userInfo.nickname}}
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex';
export default {
  name: 'LoginAfterMain',
  computed: {
    ...mapGetters([
      'loginAfterList',
      'userInfo',
      'checkNav'
    ])
  },
  methods: {
    ...mapMutations([
      'showPopup'
    ]),
    ...mapActions([
      'recomendSelect',
      'mylistSelect'
    ])
  }
};
</script>
<style lang="scss" scoped>
.menu-list{
  position: relative;
  width: 84%;
  margin-left: 8%;
}
.link-focus::after{
  content: '';
  z-index: -1;
  position: absolute;
  left: 0;
  height: 2px;
  bottom: 0;
  right: 100%;
  transition: all 0.3s ease-in-out;
}
.link-focus:hover::after, .link-focus:focus::after, #user-profile:hover::after, #user-profile:focus::after{
  right: 0;
  background: rgba(59, 153, 252, 0.7);
}
.link-list{
  height: 51px;
  padding: 0;
}
.navigation{
  border-radius: 0 10px 10px 0;
  content: '';
  position: absolute;
  left: 0;
  height: 51px;
  width: 5px;
  background: rgb(59, 153, 252);
  top: 146px;
  transition: all 0.3s ease-in-out;
}
/* 로그인 후 메인메뉴 */
#user-profile{
  padding: 0;
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
  height: 51px;
}
#user-profile::after{
  content: '';
  z-index: -1;
  position: absolute;
  left: 0;
  height: 2px;
  top: 0;
  right: 100%;
  transition: all 0.3s ease-in-out;
}
#user-profile{
  padding: 10% 0;
}
@keyframes changeDownNav{
  0%{
    top: 146px;
  };
  50%{
    top: 210px;
  };
  100%{
    top: 197px;
  };
}
@keyframes changeUpNav{
  0%{
    top: 197px;
  };
  50%{
    top: 130px;
  };
  100%{
    top: 146px;
  };
}
</style>