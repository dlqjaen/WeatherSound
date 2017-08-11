<template lang="pug">
//- 팝업창
section.user-profile.edit-popup(v-show="showPopup")
  h2.a11y-hidden 로그인/회원가입 모달창
  .user-profile-edit-wrapper
    .userprofile-update
      label.user-img-change-btn(for="user-img-change")
        img.current-user-img(:src='userInfo.img_profile', alt='현재 사용자사진')
      input.a11y-hidden(id="user-img-change" type="file" @change="saveUserImage")
    .profile-edit-input-box
      form.input-box
        ul.edit-userinfo
          li
            p.user-email Email : {{userInfo.email}}
          li
            label.a11y-hidden(for='username') User name
            input#user-name.edit-input(:placeholder="'기존 닉네임: '+userInfo.username" type="username", :value="userName", @input="inputUserName" name="username")
          li
            label.a11y-hidden(for='currentpassword') currentpassword
            input#currentpassword.edit-input(placeholder="현재 비밀번호" type="password" name="currentpassword" :value="currentPassword" @input="inputCurrentPassword")
          li
            label.a11y-hidden(for='newpassword') newpassword
            input#new-password.edit-input(placeholder="새로운 비밀번호" type="password" @input="inputPassword", :value="password" name="newpassword")
          li
            label.a11y-hidden(for='newpassword-confirm') newpassword-confirm
            input#newpassword-confirm.edit-input(placeholder="새 비밀번호 확인" type="password" @input="inputRePassword", :value="rePassWord" name="newpassword-confirm")
        button.profile-update-btn.complete(type="submit" aria-label='개인정보 수정완료 버튼' @click="editComplete") DONE
        button.profile-update-btn.logout-btn(type='submit' aria-label='로그아웃 버튼' @click="logOut") Logout
    button(href="").close
      i.fa.fa-times.close(@click="closePopup" aria-hidden="true")
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'showPopup',
      'complete',
      'userInfo',
      'password',
      'rePassWord',
      'userName',
      'currentPassword'
    ])
  },
  methods: {
    closePopup () {
      this.$store.commit('closePopup');
    },
    logOut () {
      this.$store.dispatch('logOut');
    },
    saveUserImage (e) {
      this.$store.commit('saveUserImage', e);
    },
    inputUserName (e) {
      this.$store.commit('inputUserName', e);
    },
    inputPassword (e) {
      this.$store.commit('inputPassword', e);
    },
    inputRePassword (e) {
      this.$store.commit('inputRePassword', e);
    },
    inputCurrentPassword (e) {
      this.$store.commit('inputCurrentPassword', e);
    },
    editComplete () {
      this.$store.dispatch('editComplete');
    }
  }
};
</script>

<style lang="scss">
.user-profile {
  transition: all 0.5s ease-in-out;
  background: rgba(0, 0, 0, 0.9);
  margin: 0 auto;
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  text-align: center;
}
.user-email{
  margin: 0;
  font-size: 2rem;
  padding: 5px 0;
}
.user-profile-edit-wrapper{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateY(-50%) translateX(-50%);
}
.user-img-change-btn{
  cursor: pointer;
}
.current-user-img {
  width: 150px;
  border-radius: 100px;
}
li {
  padding: 10px 0;
  display: list-item;
}
.edit-input {
  width: 224px;
  padding: 10px 0;
  font-size: 1.4rem;
  color: white;
  text-align: center;
  background: none;
  border: 1px solid rgba(255,255,255, 0.2);
  border-radius: 5px;
}
.close{
  font-size: 3rem;
  background: none;
  border: none;
  color: white;
  position: absolute;
  right: 0;
  top: 0;
}
.profile-update-btn {
  margin-top: 10px;
  font-size: 1.6rem;
  color: white;
  width: 100px;
  height: 40px;
  background: #1a53ff;
  cursor: pointer;
  border-radius: 3px;
  border: none;
}
.complete{
  margin-right: 30px;
}


</style>


