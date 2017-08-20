<template lang="pug">
//- 팝업창
section.user-profile.edit-popup(v-if="showPopup" role ="dialog" :style="editTransition")
  h2.a11y-hidden 로그인/회원가입 모달창
  .user-profile-edit-wrapper
    .userprofile-update
      label.user-img-change-btn(for="user-img-change" tabindex="0" @keydown.shift.prevent="editShiftTab")
        img.current-user-img(:src='userInfo.img_profile', alt='현재 사용자사진')
      input.user_img_input(id="user-img-change" type="file" @change="saveUserImage")
    .profile-edit-input-box
      form.input-box
        ul.edit-userinfo
          li
            p.user-email(tabindex="0") Email : {{userInfo.username}}
          li
            label.a11y-hidden(for='username-profile') 새로운 유저닉네임 입력창 기존 닉네임: {{userInfo.nickname}}
            input.edit-input(:placeholder="'기존 닉네임: '+userInfo.nickname" type="username", :value="userName", @input="inputUserName" id="username-profile" title="새로운 닉네임")
          li
            label.a11y-hidden(for='currentpassword-profile') 현재 비밀번호
            input.edit-input(placeholder="현재 비밀번호" type="password" title="현재 비밀번호" id="currentpassword-profile", :value="currentPassword" @input="inputCurrentPassword")
          li
            label.a11y-hidden(for='newpassword-profile') 새로운 비밀번호
            input.edit-input(placeholder="새로운 비밀번호" type="password" @input="inputPassword", title="새로운 비밀번호" :value="password" id="newpassword-profile" aria-describedby="password-helper")
            span#password-edit-helper.a11y-hidden
              | 문자, 숫자, 특수문자가 포함되어 있어야 하며 8 ~ 15 자리 이내여야 합니다.
          li
            label.a11y-hidden(for='newpassword-confirm-profile') 새 비밀번호 재확인 입력
            input.edit-input(placeholder="새 비밀번호 확인" type="password" @input="inputRePassword", :value="rePassWord" id="newpassword-confirm-profile" title="새 비밀번호 확인")
        button.profile-update-btn.complete(type="submit" aria-label='개인정보 수정완료 버튼' @click.prevent="editComplete") 수정완료
        button.profile-update-btn.logout-btn(type='submit' aria-label='로그아웃 버튼' @click.prevent="logOut") 로그아웃
      button.close.edit-close(type="button" @click="closePopup" aria-label="사용자정보 수정창 닫기" @keydown.tab.prevent="editNextTab")
        i.fa.fa-times(aria-hidden="true")
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'showPopup',
      'complete',
      'userInfo',
      'password',
      'rePassWord',
      'userName',
      'currentPassword',
      'editTransition'
    ])
  },
  methods: {
    ...mapMutations([
      'editShiftTab',
      'editNextTab',
      'closePopup'
    ]),
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
    editComplete (e) {
      this.$store.dispatch('editComplete', e);
    }
  }
};
</script>

<style lang="scss" scoped>
.user-profile {
  overflow: hidden;
  top: -100%;
  width: 100%;
  height: 100%;
  z-index: 10000;
  opacity: 0;
  font-size: 1.6rem;
  text-align: center;
  position: absolute;
  background: rgba(0,0,0,0.8);
  transition: all 0.5s ease-in-out;
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
  color: white;
  position: absolute;
  padding: 5px;
  right: -100px;
  top: -50px;
}
.profile-update-btn {
  margin-top: 10px;
  font-size: 1.6rem;
  color: white;
  width: 100px;
  height: 40px;
  background: #1a53ff;
  border-radius: 3px;
}
.complete{
  margin-right: 30px;
}
.user_img_input{
  display: none;
}
</style>


