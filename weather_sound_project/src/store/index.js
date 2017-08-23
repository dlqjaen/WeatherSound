// Vue 로드
import Vue from 'vue';
// Vuex 로드
import Vuex from 'vuex';
// axios 호출
import axios from 'axios';
// axios 사용준비
import VueAxios from 'vue-axios';
// Vuex, VueAxios, axios 사용준비
Vue.use(Vuex, VueAxios, axios);
// Dom에서 Audio객체를 생성
const musicPlayer = document.createElement('audio');
// 현재 곡의 진행 시간, 정도, 런닝타임을 속성에 할당하는 함수
const showPrograss = (state) => {
  setInterval(() => {
    state.currentTime = readableDuration(state, musicPlayer.currentTime);
    state.prograss = (Math.floor(musicPlayer.currentTime) / Math.floor(musicPlayer.duration)) * 100;
    readableDuration(state, musicPlayer.duration) === '0NaN:0NaN' ? state.runningTime = '로딩중...' : state.runningTime = readableDuration(state, musicPlayer.duration);
  }, 1000);
};
// 정수로된 숫자값을 넣으면 분, 초 단위로 나타내주는 함수
const readableDuration = (state, seconds) => {
  let min = '';
  let sec = '';
  seconds = Math.floor(seconds);
  min = Math.floor(seconds / 60);
  min = min >= 10 ? min : '0' + min;
  sec = Math.floor(seconds % 60);
  sec = sec >= 10 ? sec : '0' + sec;
  return min + ':' + sec;
};
// 재생될 곡의 주소, 순서, 곡명, 곡아티스트를 뮤직플레이어에 할당 하는 함수
const musicSeting = (state, index, init = false, detail = false) => {
  musicPlayer.src = state.music_data[index].source_music;
  musicPlayer.index = index;
  musicPlayer.pk = state.music_data[index].pk;
  if (detail) {
    state.detail_select_music_img = state.music_data[index].img_music;
  }
  let musicImg = state.music_data[index].img_music;
  musicImg ? musicImg = state.music_data[index].img_music : musicImg = '/static/img/music-album.e85c277.png';
  state.musicInfo = {
    music_img: musicImg,
    music_title: state.music_data[index].name_music,
    music_artist: state.music_data[index].name_artist
  };
  if (!init) {
    state.toggle_play = 'fa-pause';
    musicPlayer.play();
  }
};
const dataClear = (state) => {
  state.email = '';
  state.userName = '';
  state.password = '';
  state.re_password = '';
};
const signModalAnimationOff = (state) => {
  setTimeout(function () {
    state.change_login = {};
    state.change_sign_up = {};
    state.add_list = {};
  }, 1);
};
export const store = new Vuex.Store({
  // strict: process.env.NODE_ENV !== 'production',
  state: {
    // -----------------------------------------------------------메인페이지 데이터
    // 현재 위치의 도시를 할당
    currentCity: null,
    // 현재 위치의 날씨를 할당
    currentWeather: null,
    // 현재 위치의 위도, 경도를 객체로 할당
    // geo: null,
    // 배경 이미지를 할당
    background_img: null,
    // 페이스북 로그인 버튼을 로그인에서 보이고 회원가입에서 안보이게 토글기능 역할
    facebookLogin: true,
    // 배경이미지 데이터
    random_background: {
      sunny: [
        'https://s-media-cache-ak0.pinimg.com/originals/cf/04/4c/cf044cd15b0ac8595e50bdf05e9e0842.jpg',
        'https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/4ATR6Ce6giltbo8pp/beautiful-flowers-in-field-on-sunset-background-sunny-outdoor-bright-evening-autumn-theme-background-closeup-full-hd-video_r3bdu7-f__F0000.png',
        'https://i.ytimg.com/vi/BQxBh-Oen1w/maxresdefault.jpg'
      ],
      cloudy: [
        'https://orig05.deviantart.net/db62/f/2012/006/9/b/cloudy_mountains_no_3_by_neonen-d4lh2jx.jpg',
        'https://static.pexels.com/photos/2083/city-clouds-cloudy-ray-of-sunshine.jpg',
        'http://awesomwallpaper.com/img2/4592802E83E6F2C9/full-nature.jpg'
      ],
      rainy: [
        'https://s-media-cache-ak0.pinimg.com/originals/97/24/af/9724af499d514757aba41069eca633f9.jpg',
        'https://cdn.wallpapersafari.com/20/84/WOE1ok.jpg',
        'http://www.wallpaperbetter.com/wallpaper/516/76/948/rainy-fall-day-1080P-wallpaper.jpg'
      ],
      snowy: [
        'https://s-media-cache-ak0.pinimg.com/originals/3d/8a/7f/3d8a7f3c9380cabe3847d6c2b4c115a9.jpg',
        'https://s-media-cache-ak0.pinimg.com/originals/fc/fe/f8/fcfef8d496ff62850d642db024e9e93e.jpg',
        'https://assets.mutelife.com/wp-content/uploads/2013/03/snowy-vermont-01.jpg'
      ],
      foggy: [
        'https://cdn.wallpapersafari.com/50/11/zWH0KC.jpg',
        'https://cdn.wallpapersafari.com/80/65/GA1R9s.jpg',
        'https://i.ytimg.com/vi/gHSeRfGhYS0/maxresdefault.jpg'
      ]
    },
    // 로그인 후 보여지는 리스트 토글 기능 할당
    login_after_list: false,
    check_nav: {},
    // 메인화면에 바뀔 컴포넌트 명을 할당
    change_component: 'recomend-music',
    // 추천음악 목록을 할당
    recomend_music: [],
    spinner: false,
    // -----------------------------------------------------------로그인 데이터
    // 로그인 창을 보이거나 안보이게 토글기능 할당
    show_modal: false,
    // username입력창에 입력된 값이 할당
    email: '',
    // password입력창에 입력된 값이 할당
    password: '',
    // password를 할당 (email, password, userName은 로그인, 회원가입 후 데이터가 사라진다)
    password_remember: '',
    // nickname입력창에 입력된 값이 할당
    userName: '',
    // 회원가입에 필요한 리스트를 보여주고 안보여주게 토글 기능
    sign_up_list: false,
    // 이메일 검증이 통과되면 true로 바뀌는 토글기능
    login_check: false,
    // 로그인 / 회원가입으로 전환될때 버튼 타입을 변경하는 객체
    submit_toggle_btn: {
      login: 'submit',
      signUp: 'button'
    },
    // 로그인 모달창 트렌지션
    login_transition: {},
    // -----------------------------------------------------------회원가입 데이터
    // 프로필수정 - 현재 비밀번호
    input_current_password: '',
    // 비밀번호 확인 입력창에 값을 할당
    re_password: '',
    // 회원가입 검증이 통과되면 true로 전환되는 토글기능
    sign_up_check: false,
    // 로그인 후 사용자의 정보가 할당
    user_data: {
      userInfo:
      {
        nickname: '',
        img_profile: 'https://s3.ap-northeast-2.amazonaws.com/weather-sound-test-s3-bucket/media/member/basic_profile.png'
      }
    },
    // 회원가입창으로 전환 시 로그인버튼의 스타일변경이 할당
    change_login: {},
    // 회원가입창으로 전환 시 회원가입버튼의 스타일변경이 할당
    change_sign_up: {},
    // 리스트 추가시 트렌지션
    add_list: {},
    // -----------------------------------------------------------개인정보 수정 데이터
    // 개인정보 창을 보이거나 안보이게 하는 토글기능
    showPopup: false,
    // 새롭게 선택한 이미지의 정보를 할당
    img_profile: null,
    // 개인정보 수정창 트렌지션
    edit_transition: {},
    // -----------------------------------------------------------마이리스트 데이터
    my_list: [],
    input_list_name: '',
    active_create_btn: false,
    detail_set_list_data: [],
    detail_select_music_img: 'http://images.gofreedownload.net/sidebar-music-34404.jpg',
    disabled_check: false,
    // -----------------------------------------------------------뮤직플레이어 데이터
    // 뮤직플레이어 정보(곡명, 가수, 이미지)를 할당
    musicInfo: {},
    // 재생 버튼에 할당되는 클래스명 pause아이콘과 play아이콘이 토글로 할당
    toggle_play: 'fa-play',
    // 볼륨 버튼에 할당되는 클래스명 음소거 아이콘과 소리아이콘이 토글로 할당
    toggle_volume: 'fa-volume-up',
    // 음소거 토글버튼이 현재 눌러져있는지를 확인
    volume_active_check: false,
    // 곡의 현재 플레이 시간이 할당되는 속성
    currentTime: '',
    // 곡의 현재 플레이 진행도가 보이도록 바의 움직임이 할당되는 속성 1 ~ 100
    prograss: 0,
    // 분의 정보를 할당
    min: 0,
    // 초의 정보를 할당
    sec: 0,
    // 볼륨의 크기가 할당되는 속성 1 ~ 100
    volume: 100,
    // 곡의 러닝타임이 할당되는 속성
    runningTime: '',
    // repeat_label: '한 곡 반복 듣기 설정버튼: 클릭시 설정함',
    // repeat 아이콘의 스타일이 토글로 할당되는 객체
    active: {
      color: '#ffffff'
    },
    // 마이리스트에 현재 곡 추가 버튼을 클릭할 시 변하는 토글 움직임을 할당하는 객체
    active_add_btn: {
      transform: 'rotate(0)',
      transition: 'all 0.2s ease-in-out',
      color: '#ffffff'
    },
    // 음악 api로부터 받은 정보를 할당
    music_data: [],
    show_mini_my_list: false
  },
  getters: {
    // -----------------------------------------------------------메인페이지 getters
    showModal (state) {
      return state.show_modal;
    },
    loginAfterList (state) {
      return state.login_after_list;
    },
    getCity (state) {
      return state.currentCity;
    },
    getWeather (state) {
      return state.currentWeather;
    },
    getGeo (state) {
      return state.geo;
    },
    backgroundImg (state) {
      return state.background_img;
    },
    currentPassword (state) {
      return state.input_current_password;
    },
    checkNav (state) {
      return state.check_nav;
    },
    changeComponent (state) {
      return state.change_component;
    },
    showSpinner (state) {
      return state.spinner;
    },
    // -----------------------------------------------------------로그인 getters
    email (state) {
      return state.email;
    },
    password (state) {
      return state.password;
    },
    signUpList (state) {
      return state.sign_up_list;
    },
    userInfo (state) {
      return state.user_data.userInfo;
    },
    submitToggleBtn (state) {
      return state.submit_toggle_btn;
    },
    loginTransition (state) {
      return state.login_transition;
    },
    // -----------------------------------------------------------회원가입 getters
    loginTab (state) {
      return state.loginTab;
    },
    facebookLogin (state) {
      return state.facebookLogin;
    },
    rePassWord (state) {
      return state.re_password;
    },
    userName (state) {
      return state.userName;
    },
    changeLogin (state) {
      return state.change_login;
    },
    changeSignUp (state) {
      return state.change_sign_up;
    },
    addList (state) {
      return state.add_list;
    },
    // -----------------------------------------------------------개인정보 수정 getters
    editTransition (state) {
      return state.edit_transition;
    },
    // -----------------------------------------------------------마이리스트 getters
    myList (state) {
      console.log(state.my_list);
      for (let i = 0, l = state.my_list.length; i < l; i++) {
        if (!state.my_list[i].playlist_musics[0]) {
          state.my_list[i].default = 'http://images.gofreedownload.net/sidebar-music-34404.jpg';
        } else {
          state.my_list[i].default = state.my_list[i].playlist_musics[0].img_music;
        }
      }
      return state.my_list;
    },
    activeCreateBtn (state) {
      return state.active_create_btn;
    },
    getListName (state) {
      return state.input_list_name;
    },
    detailGetMusicMyList (state) {
      return state.detail_set_list_data;
    },
    detailSelectMusicImg (state) {
      return state.detail_select_music_img;
    },
    disabled (state) {
      return state.disabled_check;
    },
    // -----------------------------------------------------------뮤직플레이어 getters
    getMusic (state) {
      return state.music_data;
    },
    musicInfo (state) {
      return state.musicInfo;
    },
    toggleVolume (state) {
      return state.toggle_volume;
    },
    volumeActiveCheck (state) {
      return state.volume_active_check;
    },
    volume (state) {
      return state.volume;
    },
    activeAddBtn (state) {
      return state.active_add_btn;
    },
    togglePlay (state) {
      return state.toggle_play;
    },
    // repeatLabel (state) {
    //   return state.repeat_label;
    // },
    active (state) {
      return state.active;
    },
    currentTime (state) {
      return state.currentTime;
    },
    prograss (state) {
      return state.prograss;
    },
    runningTime (state) {
      return state.runningTime;
    },
    showMiniMyList (state) {
      return state.show_mini_my_list;
    },
    showPopup (state) {
      return state.showPopup;
    }
  },
  mutations: {
    // -----------------------------Spinner.vue------------------------------------
    spinnerChange (state, action) {
      state.spinner = action;
    },
    // -----------------------------Main.vue------------------------------------
    showModal (state) {
      state.show_modal = true;
      state.sign_up_list = false;
      setTimeout(function () {
        state.login_transition = {
          top: 0,
          opacity: 1
        };
        document.querySelector('#email').focus();
      }, 1);
    },
    setBackgroundData (state, setValue) {
      let randomNumber = Math.floor(Math.random() * 3);
      switch (setValue) {
      case 'sunny':
        state.background_img = {'background-image': 'url("' + store.state.random_background.sunny[randomNumber] + '")'};
        break;
      case 'cloudy':
        state.background_img = {'background-image': 'url("' + store.state.random_background.cloudy[randomNumber] + '")'};
        break;
      case 'rainy':
        state.background_img = {'background-image': 'url("' + store.state.random_background.rainy[randomNumber] + '")'};
        break;
      case 'snowy':
        state.background_img = {'background-image': 'url("' + store.state.random_background.snowy[randomNumber] + '")'};
        break;
      case 'foggy':
        state.background_img = {'background-image': 'url("' + store.state.random_background.foggy[randomNumber] + '")'};
        break;
      }
    },
    changeEventIn (state, e) {
      e.target.children[0].style = 'opacity: 1';
    },
    changeEventOut (state, e) {
      e.target.children[0].style = 'opacity: 0';
    },
    focusPlayer () {
      document.querySelector('.album').focus();
    },
    focusMenu () {
      document.querySelector('.logo').parentNode.focus();
    },
    // -----------------------------LoginAfterMain.vue------------------------------------
    loginAfterList (state) {
      state.login_after_list = true;
    },
    saveUserImage (state, e) {
      state.img_profile = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(state.img_profile);
      reader.onload = (f) => {
        state.user_data.userInfo.img_profile = f.srcElement.result;
      };
    },
    inputCurrentPassword (state, e) {
      state.input_current_password = e.target.value;
    },
    setRecomendSelect (state) {
      state.detail_select_music_img = 'http://images.gofreedownload.net/sidebar-music-34404.jpg';
      state.active_create_btn = false;
      state.change_component = 'recomend-music';
      state.check_nav = {
        'top': 146 + 'px',
        'animation': 'changeUpNav 0.3s ease-in-out forwards'
      };
    },
    setMylistSelect (state) {
      state.detail_select_music_img = 'http://images.gofreedownload.net/sidebar-music-34404.jpg';
      state.change_component = 'my-list';
      state.check_nav = {
        'top': 197 + 'px',
        'animation': 'changeDownNav 0.3s ease-in-out forwards'
      };
    },
    mylistLoad (state) {
      state.spinner = true;
      Vue.axios.get('https://weather-sound.com/api/member/' + localStorage.getItem('userPk') + '/playlists/', {
        headers: {
          'Authorization': 'Token ' + localStorage.getItem('userToken')
        }
      })
      .then((response) => {
        state.spinner = false;
        state.my_list = response.data.User.playlists;
        state.input_list_name = '';
        state.active_create_btn = false;
      }).catch(() => {
        state.spinner = false;
        alert('마이리스트 불러오기 오류');
      });
    },
    // -----------------------------LoginModal.vue------------------------------------
    closeModal (state) {
      state.login_transition = {};
      state.change_login = {};
      state.change_sign_up = {};
      state.facebookLogin = true;
      document.querySelector('.logo-list a').focus();
      dataClear(state);
      setTimeout(function () {
        state.show_modal = false;
      }, 500);
    },
    loginBtn (state) {
      if (state.sign_up_list === true) {
        dataClear(state);
        state.submit_toggle_btn = {
          login: 'submit',
          signUp: 'button'
        };
        state.add_list = {};
        setTimeout(function () {
          state.change_login = {};
          state.change_sign_up = {};
        }, 1);
        setTimeout(function () {
          state.sign_up_list = false;
        }, 500);
        state.facebookLogin = true;
      } else {
        let emailCheck = /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/;
        let passwordCheck = /^.*(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&+=*()-_]).*$/;
        if (state.email.trim() === '') {
          alert('이메일을 입력해 주세요.');
        } else if (!emailCheck.test(state.email)) {
          alert('이메일은 영문,숫자로 @와 .이 있어야 합니다.');
        } else if (!passwordCheck.test(state.password)) {
        // 정규표현식을 활용하여 문자, 숫자, 특수문자 사용해야 함.
          alert('비밀번호는 문자, 숫자, 특수 문자를 조합하여 입력해주세요.');
          // 비밀번호는 8자리에서 16자리 사이로 써야 함.
        } else if (state.password.length < 8 || state.password.length > 16) {
          alert('비밀번호는 8자리 이상, 16자리 이하로 입력해주세요');
        } else {
          state.login_check = true;
        }
      }
    },
    signUpBtn (state) {
      let passwordCheck = /^.*(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&+=*()-_]).*$/;
      if (state.sign_up_list === false) {
        state.sign_up_list = true;
        dataClear(state);
        state.submit_toggle_btn = {
          login: 'button',
          signUp: 'submit'
        };
        setTimeout(function () {
          state.change_login = {
            'position': 'absolute',
            'margin-top': 60 + 'px',
            'left': 0
          };
          state.change_sign_up = {
            'position': 'absolute',
            'left': 0
          };
          state.add_list = {
            'opacity': 1,
            'margin-top': 0
          };
        }, 1);
        state.facebookLogin = false;
      } else if (state.sign_up_list === true) {
        if (state.email.trim() === '') {
          alert('이메일을 입력해 주세요.');
        } else if (state.userName.trim() === '') {
          alert('닉네임을 입력해 주세요.');
        } else if (state.password.trim() === '') {
          alert('비밀번호를 입력해주세요');
        } else if (state.re_password !== state.password) {
          // 회원가입 모달에서 입력한 비밀번호와 비밀번호 확인란이 동일하면 패스하고 아니면 경고창 띄움.
          alert('비밀번호를 확인해주세요');
        } else if (!passwordCheck.test(state.password)) {
          alert('비밀번호는 문자, 숫자, 특수 문자를 조합하여 입력해주세요.');
          // 비밀번호는 8자리에서 16자리 사이로 써야 함.
        } else if (state.password.length < 8 || state.password.length > 16) {
          alert('비밀번호는 8자리 이상, 16자리 이하로 입력해주세요');
        } else {
          state.sign_up_check = true;
        }
      }
    },
    // 이메일, 패스워드가 vue에 보여질 수 있게 작성한 메서드, 재사용 가능하므로 합쳐야 함
    inputText (state, e) {
      state.email = e.target.value;
    },
    inputUserName (state, e) {
      state.userName = e.target.value;
    },
    inputPassword (state, e) {
      state.password = e.target.value;
    },
    inputRePassword (state, e) {
      state.re_password = e.target.value;
    },
    prevFocusChange (state, e) {
      if (e.keyCode === 9) {
        document.querySelector('#login-modal-close').focus();
      }
    },
    nextFocusChange () {
      document.querySelector('.main-skip-btn').focus();
    },
    closePrevFocusChange (state, e) {
      if (e.keyCode === 9) {
        document.querySelector('#password').focus();
      }
    },
    // -----------------------------UserProfile.vue------------------------------------
    closePopup (state) {
      state.edit_transition = {};
      dataClear(state);
      state.input_current_password = '';
      document.querySelector('.logo-list a').focus();
      setTimeout(function () {
        state.showPopup = false;
      }, 1000);
    },
    showPopup (state) {
      state.showPopup = true;
      setTimeout(function () {
        state.edit_transition = {
          top: 0,
          opacity: 1
        };
        document.querySelector('.user-img-change-btn').focus();
      }, 1);
    },
    editShiftTab (state, e) {
      if (e.keyCode === 9) {
        document.querySelector('.edit-close').focus();
      }
    },
    editNextTab (state, e) {
      document.querySelector('.user-img-change-btn').focus();
    },
    // -----------------------------MyList.vue------------------------------------
    showMakeModal (state) {
      state.active_create_btn = !state.active_create_btn;
    },
    inputListName (state, e) {
      state.input_list_name = e.target.value;
    },
    createList (state) {
      state.spinner = true;
      let data = new FormData();
      data.append('create_playlist', state.input_list_name);
      Vue.axios.post('https://weather-sound.com/api/member/' + localStorage.getItem('userPk') + '/playlists/', data, {
        headers: {
          Authorization: 'Token ' + localStorage.getItem('userToken')
        }
      }).then((response) => {
        state.spinner = false;
        state.my_list = response.data.lists;
        console.log(response.data.lists);
      }).catch((error) => {
        state.spinner = false;
        console.log('마이리스트 생성 에러', error);
      });
    },
    // -----------------------------MyListDetail.vue------------------------------------
    detailSetMusicMyList (state, listData) {
      state.detail_set_list_data = listData;
      if (!listData.playlist_musics[0]) {
        state.disabled_check = 'disabled';
      } else {
        state.disabled_check = false;
      }
      state.change_component = 'my-list-detail';
      if (!state.disabled_check) {
        for (let i = 0, l = listData.playlist_musics.length; i < l; i++) {
          listData.playlist_musics[i].time_music = readableDuration(store.state, listData.playlist_musics[i].time_music);
        }
      }
    },
    detailAddToMyMusic (state, newMusic) {
      state.detail_set_list_data.playlist_musics.push(newMusic);
    },
    // -----------------------------MusicPlayer.vue------------------------------------
    init (state) {
      musicPlayer.addEventListener('ended', () => {
        for (let i = 0, l = state.music_data.length; i < l; i++) {
          if ((musicPlayer.index === i) && !(i === l - 1)) {
            musicSeting(state, ++i);
            break;
          } else if ((musicPlayer.index === i) && (i === l - 1)) {
            musicSeting(state, 0);
            break;
          }
        }
        showPrograss(state);
      });
    },
    // 뮤직플레이어의 소리값을 0 또는 100으로 변경해주는 토글 함수 (소리업/음소거 아이콘도 변경)
    volumeOff (state) {
      if (state.toggle_volume !== 'fa-volume-off') {
        state.toggle_volume = 'fa-volume-off';
        musicPlayer.volume = 0;
        state.volume_active_check = true;
      } else if (state.toggle_volume === 'fa-volume-off') {
        if (state.volume < 99) {
          state.toggle_volume = 'fa-volume-down';
        } else {
          state.toggle_volume = 'fa-volume-up';
        }
        musicPlayer.volume = state.volume / 100;
        state.volume_active_check = false;
      }
    },
    // 볼륨을 설정해주는 함수
    setVolume (state, e) {
      state.volume = e.target.value;
      musicPlayer.volume = e.target.value / 100;
      if (state.volume < 1) {
        state.toggle_volume = 'fa-volume-off';
      } else if ((state.volume > 0) && (state.volume < 100)) {
        state.toggle_volume = 'fa-volume-down';
      } else if (state.volume > 99) {
        state.toggle_volume = 'fa-volume-up';
      }
    },
    volumeKeyValueControlor (state, e) {
      if (e.keyCode === 37) {
        state.volume = state.volume - 5;
      } else if (e.keyCode === 39) {
        state.volume = state.volume + 5;
      }
      if (state.volume < 0) {
        state.volume = 0;
      } else if (state.volume > 100) {
        state.volume = 100;
      }
      if (state.volume < 1) {
        state.toggle_volume = 'fa-volume-off';
      } else if ((state.volume > 0) && (state.volume < 100)) {
        state.toggle_volume = 'fa-volume-down';
      } else if (state.volume > 99) {
        state.toggle_volume = 'fa-volume-up';
      }
      musicPlayer.volume = state.volume / 100;
    },
    // 현재 곡을 마이리스트에 추가해주는 함수(현재 아이콘 변화만 구현)
    addToMyList (state) {
      if (state.active_add_btn.transform === 'rotate(0)') {
        state.active_add_btn.transform = 'rotate(45deg)';
        state.active_add_btn.color = '#3b99fc';
        state.show_mini_my_list = true;
      } else {
        state.active_add_btn.transform = 'rotate(0)';
        state.active_add_btn.color = '#ffffff';
        state.show_mini_my_list = false;
      }
    },
    // 뮤직플레이어를 재생/일시정지 하는 함수(재생/일시정지 아이콘도 변경)
    play (state) {
      if (state.toggle_play === 'fa-pause') {
        state.toggle_play = 'fa-play';
        musicPlayer.pause();
      } else {
        state.toggle_play = 'fa-pause';
        musicPlayer.play();
      }
      showPrograss(state);
    },
    // 다음 곡을 재생해주는 함수
    nextMusic (state) {
      for (let i = 0, l = state.music_data.length; i < l; i++) {
        if ((musicPlayer.index === i) && !(i === l - 1)) {
          musicSeting(state, ++i);
          break;
        } else if ((musicPlayer.index === i) && (i === l - 1)) {
          musicSeting(state, 0);
          break;
        }
      }
      showPrograss(state);
    },
    // 이전 곡을 재생해주는 함수
    prevMusic (state) {
      for (let i = 0, l = state.music_data.length; i < l; i++) {
        let j = state.music_data.length;
        if (musicPlayer.index === i) {
          if (i !== 0) {
            musicSeting(state, --i);
            break;
          } else if (i === 0) {
            musicSeting(state, --j);
            break;
          }
        }
      }
      showPrograss(state);
    },
    // 한 곡 반복재생을 설정해주는 함수
    repeat (state) {
      if (musicPlayer.loop === false) {
        musicPlayer.loop = true;
        state.active.color = '#3b99fc';
        // state.repeat_label = '한 곡 반복 듣기 설정버튼: 클릭시 설정 해제함';
      } else if (musicPlayer.loop === true) {
        musicPlayer.loop = false;
        state.active.color = '#ffffff';
      }
    },
    // 곡의 진행 바 컨트롤 함수
    setTime (state, e) {
      state.prograss = e.target.value;
      musicPlayer.currentTime = (musicPlayer.duration / 100 * e.target.value);
    },
    musicRunningKeyControlor (state, e) {
      if (e.keyCode === 37) {
        state.prograss = state.prograss - 5;
      } else if (e.keyCode === 39) {
        state.prograss = state.prograss + 5;
      }
      if (state.prograss < 0) {
        state.prograss = 0;
      } else if (state.prograss > 100) {
        state.prograss = 100;
      }
      musicPlayer.currentTime = (musicPlayer.duration / 100 * state.prograss);
    },
    setCity (state, e) {
      state.currentCity = e;
    },
    setWeather (state, e) {
      state.currentWeather = e;
    },
    // setGeo (state, e) {
    //   state.geo = e;
    // },
    pushMusic (state, e) {
      store.state.music_data = e;
    },
    recomendPushMusic (state, e) {
      store.state.recomend_music = e;
    },
    signAfterInit (state, login) {
      dataClear(state);
      state.facebookLogin = true;
      state.input_current_password = '';
      state.login_transition = {};
      state.sign_up_check = false;
      setTimeout(function () {
        state.show_modal = false;
      }, 1000);
      document.querySelector('.logo-list a').focus();
      if (login) {
        state.login_after_list = true;
      } else {
        signModalAnimationOff(state);
        state.login_after_list = false;
        state.token = '';
        state.user_data = {
          userInfo: {
            nickname: '유저닉네임',
            img_profile: 'https://s3.ap-northeast-2.amazonaws.com/weather-sound-test-s3-bucket/media/member/basic_profile.png'
          }
        };
      }
    },
    saveUserData (state, e) {
      state.user_data = e;
      store.state.password_remember = store.state.password;
    },
    resetMiniMyList (state) {
      state.my_list = [];
    }
  },
  actions: {
    getCityAction: ({commit, dispatch}) => {
      commit('spinnerChange', true);
      // 서버통신을 위한 axios 코드
      Vue.axios.get('http://ip-api.com/json')
      .then((response) => {
        commit('spinnerChange', false);
        commit('setCity', response.data.city.split('(').shift());
        // commit('setGeo', {
        //   lat: response.data.lat,
        //   lon: response.data.lon
        // });
        dispatch('musicGet', {
          lat: response.data.lat,
          lon: response.data.lon
        });
      }).catch((error) => {
        console.log('위도경도 받아오기 에러', error);
        commit('spinnerChange', false);
      });
      // .then(() => {
      //   dispatch('getWeatherAction');
      // });
    },
    // getWeatherAction: (store) => {
    //   let address = 'http://api.openweathermap.org/data/2.5/weather?lat=' + store.state.geo.lat + '&lon=' + store.state.geo.lon + '&units=metric&APPID=f63c992320644b675405158f284ba653';
    //   Vue.axios.get(address).then((response) => {
    //     let weather = response.data.weather[0].icon.slice(0, -1);
    //     if (weather === '01') {
    //       weather = 'Sunny';
    //     } else if (weather === '02' || weather === '03' || weather === '04') {
    //       weather = 'Cloudy';
    //     } else if (weather === '09' || weather === '10' || weather === '11') {
    //       weather = 'Rainy';
    //     } else if (weather === '13') {
    //       weather = 'Snowy';
    //     } else if (weather === '50') {
    //       weather = 'Foggy';
    //     }
    //     store.commit('setWeather', weather);
    //     store.commit('setBackgroundData', weather);
    //   });
    // },
    signUpPost: (store) => {
      store.commit('signUpBtn');
      if (store.state.sign_up_check) {
        store.commit('spinnerChange', true);
        let data = new FormData();
        data.append('username', store.state.email);
        data.append('nickname', store.state.userName);
        data.append('password1', store.state.password);
        data.append('password2', store.state.re_password);
        Vue.axios.post('https://weather-sound.com/api/member/signup/', data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((response) => {
          Vue.axios.post('https://weather-sound.com/api/member/login/', {
            'username': store.state.email,
            'password': store.state.password
          }).then((response) => {
            store.commit('spinnerChange', false);
            localStorage.setItem('userPk', response.data.userInfo.pk);
            localStorage.setItem('userToken', response.data.token);
            store.commit('mylistLoad');
            store.commit('saveUserData', response.data);
            store.commit('signAfterInit', true);
          }).catch((error) => {
            console.log('회원가입 후 로그인 에러', error);
            store.commit('spinnerChange', false);
          });
        })
        .catch((error) => {
          alert('이미 가입되어있는 회원입니다. 이메일과 닉네임을 변경해주세요.');
          console.log('회원가입에러', error);
          store.commit('spinnerChange', false);
        });
      }
    },
    signInPost: (store, e) => {
      store.commit('loginBtn', e);
      if (store.state.login_check) {
        store.commit('spinnerChange', true);
        Vue.axios.post('https://weather-sound.com/api/member/login/', {
          'username': store.state.email,
          'password': store.state.password
        }).then((response) => {
          store.commit('spinnerChange', false);
          localStorage.setItem('userPk', response.data.userInfo.pk);
          localStorage.setItem('userToken', response.data.token);
          store.commit('mylistLoad');
          store.commit('saveUserData', response.data);
          store.commit('signAfterInit', true);
        }).catch((error) => {
          store.commit('spinnerChange', false);
          alert('이메일 혹은 비밀번호가 틀렸습니다.');
          console.log('로그인에러', error);
        });
      }
    },
    musicGet: (store, location) => {
      store.commit('spinnerChange', true);
      Vue.axios.post('https://weather-sound.com/api/music/', {
        'latitude': location.lat,
        'longitude': location.lon
      }).then((response) => {
        store.commit('spinnerChange', false);
        store.commit('pushMusic', response.data.listInfo.playlist_musics);
        store.commit('recomendPushMusic', response.data.listInfo.playlist_musics);
        store.commit('setWeather', response.data.listInfo.weather);
        store.commit('setBackgroundData', response.data.listInfo.weather);
        musicSeting(store.state, 0, true);
      }).catch((error) => {
        store.commit('spinnerChange', false);
        console.log('추천음악 불러오기 오류', error);
      });
      // Vue.axios.get('https://weather-sound.com/api/music/')
      // .then((response) => {
      //   console.log(response);
      //   store.commit('pushMusic', response.data);
      //   musicSeting(store.state, 0, true);
      // });
    },
    selectMusic: (store, index) => {
      musicSeting(store.state, index);
      showPrograss(store.state);
    },
    editComplete: (store, e) => {
      let passwordCheck = /^.*(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
      if (store.state.input_current_password === '') {
        alert('현재 비밀번호를 입력해주세요.');
      } else if (store.state.password.trim() !== '') {
        if (!passwordCheck.test(store.state.password)) {
          // 정규표현식을 활용하여 문자, 숫자, 특수문자 사용해야 함.
          alert('비밀번호는 문자, 숫자, 특수 문자를 조합하여 입력해주세요.');
          // 비밀번호는 8자리에서 16자리 사이로 써야 함.
        } else if (store.state.password.length < 8 || store.state.password.length > 16) {
          alert('비밀번호는 8자리 이상, 16자리 이하로 입력해주세요');
        } else if (store.state.re_password !== store.state.password) {
          // 회원가입 모달에서 입력한 비밀번호와 비밀번호 확인란이 동일하면 패스하고 아니면 경고창 띄움.
          alert('새로운 비밀번호가와 비밀번호 확인이 일치하지 않습니다. 비밀번호를 확인해주세요');
        } else {
          store.commit('spinnerChange', true);
          let data = new FormData();
          data.append('nickname', store.state.userName);
          if (store.state.img_profile) {
            data.append('img_profile', store.state.img_profile);
          }
          data.append('password', store.state.input_current_password);
          data.append('new_password1', store.state.password);
          data.append('new_password2', store.state.re_password);
          Vue.axios.put('https://weather-sound.com/api/member/profile/' + localStorage.getItem('userPk') + '/edit/', data, {
            headers: {
              Authorization: 'Token ' + localStorage.getItem('userToken'),
              'Content-Type': 'multipart/form-data'
            }
          }).then((response) => {
            store.commit('spinnerChange', false);
            // Vue.axios.post('https://weather-sound.com/api/member/login/', {
            //   'username': store.state.user_data.userInfo.username,
            //   'password': store.state.password
            // }).then((response) => {
            //   // console.log(response);
            //   store.commit('saveUserData', response.data);
            // });
            store.commit('signAfterInit', true);
            store.commit('closePopup');
          }).catch((error) => {
            store.commit('spinnerChange', false);
            alert('현재 비밀번호가 맞지 않습니다. 다시 확인해주세요.');
            console.log('개인정보수정 에러', error);
          });
        }
      } else {
        store.commit('spinnerChange', true);
        let data = new FormData();
        if (store.state.userName) {
          data.append('nickname', store.state.userName);
          store.state.user_data.userInfo.nickname = store.state.userName;
        }
        if (store.state.img_profile) {
          data.append('img_profile', store.state.img_profile);
        }
        data.append('password', store.state.input_current_password);
        data.append('new_password1', store.state.input_current_password);
        data.append('new_password2', store.state.input_current_password);
        Vue.axios.put('https://weather-sound.com/api/member/profile/' + store.state.user_data.userInfo.pk + '/edit/', data, {
          headers: {
            Authorization: 'Token ' + localStorage.getItem('userToken'),
            'Content-Type': 'multipart/form-data'
          }
        }).then((response) => {
          store.commit('spinnerChange', false);
          // let changedImgProfile = response.data.userInfo.img_profile.replace(/media\//, 'media/member/');
          // response.data.userInfo.img_profile = changedImgProfile;
          // console.log(response.data.userInfo);
          // Vue.axios.post('https://weather-sound.com/api/member/login/', {
          //   'username': store.state.user_data.userInfo.username,
          //   'password': store.state.input_current_password
          // }).then((response) => {
          //   // console.log(response);
          //   store.commit('saveUserData', response.data);
          // });
          store.commit('signAfterInit', true);
          store.commit('closePopup');
        }).catch((error) => {
          store.commit('spinnerChange', false);
          alert('현재 비빌번호가 맞지 않습니다. 다시 확인해주세요.');
          console.log('개인정보수정 에러', error);
        });
      }
    },
    logOut: (store) => {
      store.commit('spinnerChange', true);
      Vue.axios.get('https://weather-sound.com/api/member/logout/', {
        headers: {
          Authorization: 'Token ' + localStorage.getItem('userToken')
        }
      }).then((response) => {
        store.commit('spinnerChange', false);
        store.commit('closePopup');
        store.commit('signAfterInit');
        store.commit('setRecomendSelect');
        store.commit('resetMiniMyList');
        store.commit('pushMusic', store.state.recomend_music);
        localStorage.clear();
        document.querySelector('.logo-list a').focus();
      }).catch((error) => {
        console.log('로그아웃 에러', error);
        store.commit('spinnerChange', false);
      });
    },
    myListGet: (store) => {
      store.commit('createList');
      store.commit('mylistLoad');
    },
    facebookToken: (store) => {
      var FB = window.FB;
      var scopes = 'email,public_profile';
      FB.login(function (response) {
        if (response.status === 'connected') {
          console.log('The user has logged in!');
          FB.api('/me', function (response) {
            console.log('페이스북 로그인 리스폰스', response);
          });
        }
      }, { scope: scopes });
      FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
          console.log('Logged in.');
          Vue.axios.post('https://weather-sound.com/api/member/facebook-login/', {
            'token': response.authResponse.accessToken
          }).then((response) => {
            console.log('페이스북 토큰 리스폰스', response);
            localStorage.setItem('userPk', response.data.userInfo.pk);
            localStorage.setItem('userToken', response.data.token);
            store.commit('saveUserData', response.data);
            store.commit('signAfterInit', true);
            store.commit('closeModal');
            store.commit('mylistLoad');
          }).catch(() => {

          });
          localStorage.setItem('facebook', response.authResponse.accessToken);
        } else if (response.status === 'not_authorized') {
          // 허가 받지 않은 사용자가 재접근 시 로그인페이지로 이동
          window.location.replace('/login');
          console.log('허가 받지 않음');
        } else {
          console.log('unknown');
        }
      });
    },
    loging: (store, userData) => {
      store.commit('spinnerChange', true);
      Vue.axios.get('https://weather-sound.com/api/member/' + userData.userPk + '/', {
        headers: {
          'Authorization': 'Token ' + userData.userToken
        }
      }).then((response) => {
        store.commit('spinnerChange', false);
        store.commit('mylistLoad');
        store.commit('saveUserData', response.data);
        store.commit('signAfterInit', true);
      }).catch((error) => {
        console.log('새로고침 자동로그인 에러', error);
        store.commit('spinnerChange', false);
      });
    },
    listDeleteBtn: (store, listpk) => {
      store.commit('spinnerChange', true);
      Vue.axios.put('https://weather-sound.com/api/member/' + localStorage.getItem('userPk') + '/playlists/', {
        'delete_playlist': listpk.toString()
      }, {
        headers: {
          'Authorization': 'Token ' + localStorage.getItem('userToken')
        }
      }).then((response) => {
        store.commit('spinnerChange', false);
        store.commit('mylistLoad');
      }).catch((error) => {
        store.commit('spinnerChange', false);
        console.log('마이리스트 삭제 오류', error);
      });
    },
    myListAddToMusic (store, data) {
      store.commit('spinnerChange', true);
      Vue.axios.post('https://weather-sound.com/api/member/' + localStorage.getItem('userPk') + '/playlists/', {
        'create_playlist': data,
        'music': musicPlayer.pk.toString()
      }, {
        headers: {
          'Authorization': 'Token ' + localStorage.getItem('userToken')
        }
      }).then((response) => {
        store.commit('spinnerChange', false);
        store.commit('addToMyList');
        // store.commit('detailAddToMyMusic', response.data.lists.playlist_musics[response.data.lists.playlist_musics.length]);
      }).catch((error) => {
        store.commit('spinnerChange', false);
        console.log('곡 추가 실패', error);
      });
    },
    enterDetailMyList: (store, data) => {
      store.commit('detailSetMusicMyList', data);
      store.commit('pushMusic', data.playlist_musics);
    },
    recomendSelect: (store) => {
      store.commit('setRecomendSelect');
      store.commit('pushMusic', store.state.recomend_music);
    },
    mylistSelect: (store) => {
      store.commit('mylistLoad');
      store.commit('setMylistSelect');
      showPrograss(store.state);
    },
    detailSelectMusic: (store, index) => {
      musicSeting(store.state, index, false, true);
      showPrograss(store.state);
    },
    detailMusicPlay: (store) => {
      musicSeting(store.state, 0);
    },
    detailDelete: (store, data) => {
      store.commit('spinnerChange', true);
      let formData = new FormData();
      formData.append('music', data.pk);
      Vue.axios.put('https://weather-sound.com/api/member/' + localStorage.getItem('userPk') + '/playlists/' + store.state.detail_set_list_data.pk + '/', formData, {
        headers: {
          Authorization: 'Token ' + localStorage.getItem('userToken')
        }
      }).then((response) => {
        store.commit('spinnerChange', false);
        store.commit('detailSetMusicMyList', response.data.playlist);
      }).catch((error) => {
        store.commit('spinnerChange', false);
        console.log('세부삭제 에러', error);
      });
    },
    deleteAccount: (store) => {
      if (store.state.input_current_password === '') {
        alert('현재 비밀번호를 입력해주세요.');
      } else {
        store.commit('spinnerChange', true);
        let token = localStorage.getItem('userToken');
        Vue.axios.delete('https://weather-sound.com/api/member/profile/' + localStorage.getItem('userPk') + '/edit/', {
          'username': store.state.user_data.userInfo.username,
          'password': store.state.input_current_password,
          headers: {
            'Authorization': 'token ' + token
          }
        }).then((response) => {
          store.commit('spinnerChange', false);
          localStorage.clear();
          // store.commit('closeModal');
          store.commit('signAfterInit');
          store.commit('closePopup');
        }).catch((error) => {
          store.commit('spinnerChange', false);
          console.log('계정삭제 에러', error);
        });
      }
    }
  }
});
