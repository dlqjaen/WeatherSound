<template lang="pug">
  section.main.login-modal(v-show="showModal")
    h2.a11y-hidden 로그인/회원가입 모달창
    form.input-box
      label.a11y-hidden(for="login-modal-close")
      button#login-modal-close.close(type="button" @click="closeModal")
        i.fa.fa-times(aria-hidden='true')
      ul
        li
          label.a11y-hidden(for='email') Email
          input#email.sign-input(type='email', :value="email" @input="inputText" name='id(email)', placeholder='이메일 입력창')
        li(v-show='signUpList')
          label.a11y-hidden(for='user-name') User Name
          input#user-name.sign-input(type='nickname', name='username', placeholder='닉네임 입력창', :value="userName", @input="inputUserName")
        li
          label.a11y-hidden(for='password') Password
          input#password.sign-input(type='password', name='password', @input="inputPassword" :value="password" placeholder='비밀번호 입력창')
        li(v-show='signUpList')
          label.a11y-hidden(for='password-check') Password Check
          input#password-check.sign-input(type='password', name='repPassword', @input="inputRePassword" :value="rePassWord" placeholder='비밀번호 입력확인창')
        li
          input.sign-button(type='submit', aria-label='로그인 버튼', value='Sign In' @click="signInPost")
        li
          input.sign-button(type='submit', aria-label='회원가입 버튼', value="Sign Up" @click="signUpPost")
        .fb-login-button(data-max-rows="1" data-size="large" data-button-type="login_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="false" aria-label="페이스북 로그인")
          //- <fb:login-button class="sign-button facebook" type='button' aria-label='페이북으로 로그인 버튼' scope="public_profile,email" onlogin="checkLoginState();">
          //-   i.fa.fa-facebook-square.facebook-logo(aria-hidden='true')
          //-   | Facebook
          //- </fb:login-button>
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
      'signUpList',
      'userName'
    ])
  },
  methods: {
    closeModal () {
      this.$store.commit('closeModal');
    },
    signUpPost (e) {
      this.$store.dispatch('signUpPost', e);
    },
    signInPost (e) {
      this.$store.dispatch('signInPost', e);
    },
    inputUserName (e) {
      this.$store.commit('inputUserName', e);
    },
    // 이메일, 패스워드가 vue에 보여질 수 있게 작성한 메서드, 재사용 가능하므로 합쳐야 함
    inputText (e) {
      this.$store.commit('inputText', e);
    },
    inputPassword (e) {
      this.$store.commit('inputPassword', e);
    },
    inputRePassword (e) {
      this.$store.commit('inputRePassword', e);
    }
  }
};
</script>

<style lang="scss" scoped>
.login-modal{
  top: 0;
  z-index: 10000;
  font-size: 1.6rem;
  text-align: center;
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(0,0,0,0.8);
}
.close{
  background: none;
  color: white;
  border: none;
  font-size: 3rem;
  position: absolute;
  padding: 5px;
  right: 0;
  top: 0;
}
.sign-input{
  width: 224px;
  height: 40px;
  font-size: 1.4rem;
  border: 1px solid rgba(255,255,255, 0.2);
  text-align: center;
  background: none;
  border-radius: 5px;
  color: white;
}
.sign-button{
  cursor: pointer;
  border-radius: 5px;
  border: none;
  font-size: 1.6rem;
  color: white;
  width: 224px;
  height: 40px;
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
  margin-bottom: 20px;
}
</style>
