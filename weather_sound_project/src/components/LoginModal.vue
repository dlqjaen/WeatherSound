<template lang="pug">
  section.main.login-modal(v-show="showModal")
    h2.a11y-hidden 로그인/회원가입 모달창
    form.input-box
      i.fa.fa-times.close(tabindex='0', aria-hidden='true' @click="closeModal")
      ul
        li
          label(for='email') Email
          input#email.sign-input(type='email', :value="email" @input="inputText" name='id(email)', placeholder='이메일 입력창')
        li(v-show='signUpList')
          label(for='user-name') User Name
          input#user-name.sign-input(type='name', name='username', placeholder='닉네임 입력창')
        li
          label(for='password') Password
          input#password.sign-input(type='password', name='password', @input="inputPassword" :value="password" placeholder='비밀번호 입력창')
        li(v-show='signUpList')
          label(for='password-check') Password Check
          input#password-check.sign-input(type='password', name='repPassword', @input="inputRepPassword" :value="rePassWord" placeholder='비밀번호 입력확인창')
        li
          input.sign-button(type='submit', aria-label='로그인 버튼', value='Sign In' @click="checkPassword")
        li
          button.sign-button(type='button', aria-label='회원가입 버튼' @click="signUpBtn") Sign Up
        li
          button.sign-button.facebook(type='button', aria-label='페이북으로 로그인 버튼')
            i.fa.fa-facebook-square.facebook-logo(aria-hidden='true')
            | Facebook
</template>


<script>
import {mapGetters} from 'vuex';

export default {
  name: 'LoginModal',
  computed: {
    ...mapGetters([
      'email',
      'password',
      'rePassWord',
      'showModal',
      'signUpList'
    ])
  },
  methods: {
    showModal () {
      this.$store.commit('showModal');
    },
    closeModal () {
      this.$store.commit('closeModal');
    },
    signUpBtn (e) {
      this.$store.commit('signUpBtn', e);
    },
    checkPassword: function (e) {
      this.$store.commit('checkPassword', e);
    },
    // 이메일, 패스워드가 vue에 보여질 수 있게 작성한 메서드, 재사용 가능하므로 합쳐야 함
    inputText: function (e) {
      this.$store.commit('inputText', e);
    },
    inputPassword: function (e) {
      this.$store.commit('inputPassword', e);
    },
    inputRepPassword: function (e) {
      this.$store.commit('inputRepPassword', e);
    }
  }
};
</script>

<style lang="scss" scoped>
.login-modal{
  z-index: 10000;
  font-size: 1.6rem;
  text-align: center;
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(0,0,0,0.8);
}
.close{
  font-size: 3rem;
  position: absolute;
  padding: 5px;
  right: 0;
  top: 0;
}
.sign-input{
  width: 60%;
  font-size: 1.4rem;
  color: white;
  text-align: center;
  background: none;
  border: none;
  border-bottom: 1px solid white;
}
.sign-button{
  cursor: pointer;
  border-radius: 5px;
  padding: 7px 0;
  border: none;
  font-size: 1.6rem;
  color: white;
  width: 80%;
  background: #e56b6b;
}
.input-box{
  width: 50%;
  padding: 50px 50px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translateY(-50%) translateX(-50%);
}
.input-box li{
  margin-bottom: 5%;
}
.facebook{
  background-color: rgb(59,89,152);
}
.facebook-logo{
  margin-right: 10px;
}
</style>
