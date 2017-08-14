<template lang="pug">
  section.main.login-modal(v-show="showModal" role="dialog")
    h2.a11y-hidden 로그인/회원가입 모달창
    form.input-box
      label.a11y-hidden(for="login-modal-close") 로그인 / 회원가입창 닫기버튼
      ul
        li
          input#email.sign-input(type='email', tabindex="-1" :value="email" @input="inputText" title="이메일", aria-label="이메일" placeholder='이메일 입력창' aria-describedby="id-helper")
          span#id-helper.a11y-hidden
            | 한글, 영어, 숫자 사용가능, @와 .이 포함되어있어야 합니다.
        li(v-show='signUpList')
          input#user-name.sign-input(type='nickname' title="닉네임", aria-label="닉네임", placeholder='닉네임 입력창', :value="userName", @input="inputUserName")
        li
          input#password.sign-input(type='password', title="비밀번호", aria-label="비밀번호" @input="inputPassword" :value="password" placeholder='비밀번호 입력창' aria-describedby="password-helper")
          span#password-helper.a11y-hidden
            | 문자, 숫자, 특수문자가 포함되어 있어야 하며 8 ~ 15 자리 이내여야 합니다.
        li(v-show='signUpList')
          input#password-check.sign-input(type='password',  title="비밀번호 확인", aria-label="비밀번호 확인" @input="inputRePassword" :value="rePassWord" placeholder='비밀번호 입력확인창')
        li
          input.sign-button(:type='submitToggleBtn.login', aria-label='로그인', value='로그인' @click="signInPost")
        li
          input.sign-button(:type='submitToggleBtn.signUp', aria-label='회원가입', value="회원가입" @click="signUpPost")
        .fb-login-button(data-max-rows="1" data-size="large" data-button-type="login_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="false" aria-label="페이스북 로그인" v-show="facebookLogin")
          //- <fb:login-button class="sign-button facebook" type='button' aria-label='페이북으로 로그인 버튼' scope="public_profile,email" onlogin="checkLoginState();">
          //-   i.fa.fa-facebook-square.facebook-logo(aria-hidden='true')
          //-   | Facebook
          //- </fb:login-button>
      button#login-modal-close.close(type="button" @click="closeModal")
        i.fa.fa-times(aria-hidden='true')
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
      'userName',
      'facebookLogin',
      'submitToggleBtn'
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
