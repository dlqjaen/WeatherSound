<template lang="pug">
  section.main.login-modal(v-show="showModal" role="dialog", :style="loginTransition")
    h2.a11y-hidden 로그인/회원가입 모달창
    form.input-box
      label.a11y-hidden(for="login-modal-close") 로그인 / 회원가입창 닫기버튼
      ul
        li
          input#email.sign-input(type='email', :value="email" @input="inputText" title="이메일", aria-label="이메일" placeholder='이메일 입력창' aria-describedby="id-helper")
          span#id-helper.a11y-hidden
            | 한글, 영어, 숫자 사용가능, @와 .이 포함되어있어야 합니다.
        li.add-list(v-show='signUpList', :style="addList")
          input#user-name.sign-input(type='nickname' title="닉네임", aria-label="닉네임", placeholder='닉네임 입력창', :value="userName", @input="inputUserName")
        li
          input#password.sign-input(type='password', title="비밀번호", aria-label="비밀번호" @input="inputPassword" :value="password" placeholder='비밀번호 입력창' aria-describedby="password-helper")
          span#password-helper.a11y-hidden
            | 문자, 숫자, 특수문자가 포함되어 있어야 하며 8 ~ 15 자리 이내여야 합니다.
        li.add-list(v-show='signUpList', :style="addList")
          input#password-check.sign-input(type='password',  title="비밀번호 확인", aria-label="비밀번호 확인" @input="inputRePassword" :value="rePassWord" placeholder='비밀번호 입력확인창')
        li.login-btn
          input.sign-button(:type='submitToggleBtn.login', aria-label='로그인', :style="changeLogin" value='로그인' @click.prevent="signInPost")
        li.sign-up-btn
          input.sign-button(:type='submitToggleBtn.signUp', aria-label='회원가입', :style="changeSignUp" value="회원가입" @click.prevent="signUpPost")
        li
          button.sign-button.facebook-button(type="button" aria-label="페이스북 로그인" v-show="facebookLogin" @click="facebookToken")
            <i class="fa fa-facebook-official" aria-hidden="true"></i> Facebook 로그인
      button#login-modal-close.close(type="button" @click="closeModal")
        i.fa.fa-times(aria-hidden='true')
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex';

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
      'submitToggleBtn',
      'changeLogin',
      'changeSignUp',
      'loginTransition',
      'addList'

    ])
  },
  methods: {
    ...mapMutations([
      'closeModal',
      'inputUserName',
      'inputText',
      'inputPassword',
      'inputRePassword'
      // 'prevFocusChange',
      // 'nextFocusChange',
      // 'closePrevFocusChange'
    ]),
    ...mapActions([
      'facebookToken',
      'signUpPost',
      'signInPost'
    ])
  }
};
</script>

<style lang="scss" scoped>
.login-modal{
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
  transition: top 0.5s ease-in-out, opacity 0.5s ease-in-out;
}
.close{
  color: white;
  font-size: 3rem;
  position: absolute;
  padding: 5px;
  right: -50px;
  top: -50px;
}
.sign-input{
  width: 100%;
  height: 40px;
  font-size: 1.4rem;
  border: 1px solid rgba(255,255,255, 0.2);
  text-align: center;
  background: none;
  border-radius: 5px;
  color: white;
  transition: all 0.5s ease-in-out;
}
.sign-button{
  border-radius: 5px;
  font-size: 1.6rem;
  color: white;
  width: 100%;
  height: 40px;
  background: #e56b6b;
  transition: all 0.5s ease-in-out;
  border: none;
  cursor: pointer;
}
.facebook-button{
  background: #3b5998;
}
.input-box{
  width: 250px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translateY(-50%) translateX(-50%);
}
.input-box li{
  margin-bottom: 20px;
}
.add-list{
  margin-top: -10%;
  opacity: 0;
  transition: all 0.5s ease-in-out;
}
.fa-facebook-official{
  font-size: 2rem;
}
</style>
