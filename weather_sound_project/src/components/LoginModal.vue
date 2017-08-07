<template lang="pug">
  section.main.login-modal(v-show="showModal")
    h2.a11y-hidden 로그인/회원가입 모달창
    i.fa.fa-times.close(tabindex='0', aria-hidden='true' @click="closeModal")
    form.input-box
      ul
        li
          label(for='email') Email
          input#email.sign-input(type='email', :value="email" @input="inputText" name='id(email)', placeholder='이메일 입력창')
        li.sign-up-list
          label(for='user-name') User Name
          input#user-name.sign-input(type='name', name='username', placeholder='닉네임 입력창')
        li
          label(for='password') Password
          input#password.sign-input(type='password', name='password', @input="inputPassword" :value="password" placeholder='비밀번호 입력창')
        li.sign-up-list
          label(for='password-check') Password Check
          input#password-check.sign-input(type='password', name='repPassword', @input="inputRepPassword" :value="repPassword" placeholder='비밀번호 입력확인창')
        li
          input.sign-button(type='submit', aria-label='로그인 버튼', value='Sign In' @click="checkPassword")
        li
          button.sign-button(type='button', aria-label='회원가입 버튼' @click="validatePassword") Sign Up
        li
          button.sign-button.facebook(type='button', aria-label='페이북으로 로그인 버튼')
            i.fa.fa-facebook-square.facebook-logo(aria-hidden='true')
            | Facebook
</template>


<script>
import {mapGetters} from 'vuex';

export default {
  name: 'LoginModal',
  data: function () {
    return {
      password: '',
      email: ''
    };
  },
  computed: {
    ...mapGetters([
      'showModal'
    ])
  },
  methods: {
    stopAction: function (e) {
      e.preventDefault();
    },

    checkPassword: function (e) {
      // 정규표현식을 활용하여 문자, 숫자, 특수문자 사용해야 함.
      var passwordCheck = /^.*(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
      if (!passwordCheck.test(this.password)) {
        alert('비밀번호는 문자, 숫자, 특수 문자를 조합하여 입력해주세요.');
        this.stopAction(e);
        return false;
       // 비밀번호는 8자리에서 16자리 사이로 써야 함.
      } else if (this.password.length < 8 || this.password.length > 16) {
        alert('비밀번호는 8자리 이상, 16자리 이하로 입력해주세요');
        this.stopAction(e);
        return false;
      }
    },
    // 비밀번호 중복 관련된 함수인데, 위 함수로 재사용 가능하기 때문에 빼도 됨
    repPassword: function (e) {
      var passwordCheck = /^.*(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
      if (!passwordCheck.test(this.password)) {
        alert('비밀번호는 문자, 숫자, 특수 문자의 조합으로 입력해주세요.');
        this.stopAction(e);
      } else if (this.password.length < 8 || this.password.length > 16) {
        alert('비밀번호는 8자리 이상, 16자리 이하로 입력해주세요');
        this.stopAction(e);
        return;
      }
    },
    // 회원가입 모달에서 입력한 비밀번호와 비밀번호 확인란이 동일하면 패스하고 아니면 경고창 띄움.
    validatePassword: function (e) {
      if (this.repPassword !== this.password) {
        alert('비밀번호를 확인해주세요');
        this.stopAction(e);
      }
    },
    // 이메일, 패스워드가 vue에 보여질 수 있게 작성한 메서드, 재사용 가능하므로 합쳐야 함
    inputText: function (e) {
      this.email = e.target.value;
    },

    inputPassword: function (e) {
      this.password = e.target.value;
    },
    inputRepPassword: function (e) {
      this.repPassword = e.target.value;
    },
    closeModal () {
      this.$store.commit('closeModal');
    }
  }
};
</script>

<style lang="scss" scoped>
.login-modal{
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
  right: 30%;
  top: 20%;
}
.sign-input{
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
  width: 25%;
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
.sign-up-list{
  display: none;   
}
</style>
