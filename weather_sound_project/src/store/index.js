// Vue 로드
import Vue from 'vue';
// Vuex 로드
import Vuex from 'vuex';
// axios 호출
import axios from 'axios';
// axios 사용준비
import VueAxios from 'vue-axios';

Vue.use(Vuex, VueAxios, axios);
const stopAction = function (e) {
  e.preventDefault();
};
// Dom에서 Audio객체를 생성
const musicPlayer = document.createElement('audio');
// 현재 곡의 진행 시간, 정도, 런닝타임을 속성에 할당하는 함수
const showPrograss = function (state) {
  setInterval(() => {
    state.currentTime = readableDuration(state, musicPlayer.currentTime);
    state.prograss = (Math.floor(musicPlayer.currentTime) / Math.floor(musicPlayer.duration)) * 100;
    state.runningTime = readableDuration(state, musicPlayer.duration);
  }, 1000);
};
// 정수로된 숫자값을 넣으면 분, 초 단위로 나타내주는 함수
const readableDuration = function (state, seconds) {
  seconds = Math.floor(seconds);
  state.min = Math.floor(seconds / 60);
  state.min = state.min >= 10 ? state.min : '0' + state.min;
  state.sec = Math.floor(seconds % 60);
  state.sec = state.sec >= 10 ? state.sec : '0' + state.sec;
  return state.min + ':' + state.sec;
};
// 재생될 곡의 주소, 순서, 곡명, 곡아티스트를 뮤직플레이어에 할당 하는 함수
const musicSeting = function (state, index) {
  musicPlayer.src = state.sun[index].src;
  musicPlayer.index = index;
  state.music_title = state.sun[index].title;
  state.music_artist = state.sun[index].artist;
};
export const store = new Vuex.Store({
  // strict: process.env.NODE_ENV !== 'production',
  state: {
    // -----------------------------------------------------------메인페이지 데이터
    show_modal: false,
    login_after_list: false,
    currentCity: null,
    currentWeather: null,
    geo: null,
    background_img: null,
    // -----------------------------------------------------------로그인 데이터
    email: '',
    password: '',
    userName: '',
    sign_up_list: false,
    login_check: false,
    // -----------------------------------------------------------회원가입 데이터
    re_password: '',
    members: [],
    sign_up_check: false,
    // -----------------------------------------------------------뮤직플레이어 데이터
    // 뮤직플레이어 곡 정보에서 곡 제목이 할당되는 속성
    music_title: '',
    // 뮤직플레이어 곡 정보에서 곡 아티스트가 할당되는 속성
    music_artist: '',
    // 재생 버튼에 할당되는 클래스명 pause아이콘과 play아이콘이 토글로 할당
    toggle_play: 'fa-play',
    // 볼륨 버튼에 할당되는 클래스명 음소거 아이콘과 소리아이콘이 토글로 할당
    toggle_volume: 'fa-volume-up',
    // 곡의 현재 플레이 시간이 할당되는 속성
    currentTime: '',
    // 곡의 현재 플레이 진행도가 보이도록 바의 움직임이 할당되는 속성 1 ~ 100
    prograss: 0,
    min: 0,
    sec: 0,
    // 볼륨의 크기가 할당되는 속성 1 ~ 100
    volume: 100,
    // 곡의 러닝타임이 할당되는 속성
    runningTime: '',
    // repeat 아이콘의 스타일이 토글로 할당되는 객체
    active: {
      color: '#ffffff'
    },
    // 마이리스트에 현재 곡 추가 버튼을 클릭할 시 변하는 토글 움직임을 할당하는 객체
    active_add_btn: {
      transform: 'rotate(0)',
      transition: 'all 0.2s ease-in-out'
    },
    // 임시 데이터 객체
    sun: [
      {
        title: '교생쌤',
        artist: 'NC.A',
        src: 'https://firebasestorage.googleapis.com/v0/b/todo-68dcb.appspot.com/o/NC.A%20-%20%E1%84%80%E1%85%AD%E1%84%89%E1%85%A2%E1%86%BC%E1%84%8A%E1%85%A2%E1%86%B7.mp3.mp3?alt=media&token=2c9c0359-af7b-46e6-a8f9-585c67a9a6fc'
      },
      {
        title: 'Gone',
        artist: '다이나믹듀오',
        src: 'https://firebasestorage.googleapis.com/v0/b/todo-68dcb.appspot.com/o/Dynamic%20Duo%20-%20Gone.mp3?alt=media&token=d1e02113-25c9-4d20-a5b9-8beb9c50bbfb'
      },
      {
        title: '몽환의 숲',
        artist: '키스틱 플로우',
        src: 'https://firebasestorage.googleapis.com/v0/b/todo-68dcb.appspot.com/o/Kinetic%20Flow%20-%20%E1%84%86%E1%85%A9%E1%86%BC%E1%84%92%E1%85%AA%E1%86%AB%E1%84%8B%E1%85%B4%20%E1%84%89%E1%85%AE%E1%87%81.mp3?alt=media&token=9548eddf-9794-483f-9417-f8f8da897e53'
      },
      {
        title: '너에게 쓰는 편지',
        artist: 'MC몽',
        src: 'https://firebasestorage.googleapis.com/v0/b/todo-68dcb.appspot.com/o/MC%E1%84%86%E1%85%A9%E1%86%BC-%E1%84%82%E1%85%A5%E1%84%8B%E1%85%A6%E1%84%80%E1%85%A6%20%E1%84%8A%E1%85%B3%E1%84%82%E1%85%B3%E1%86%AB%20%E1%84%91%E1%85%A7%E1%86%AB%E1%84%8C%E1%85%B5.mp3?alt=media&token=75daef23-3afa-4e8b-94b9-1501943d5b0d'
      }
    ]
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
    // -----------------------------------------------------------회원가입 getters
    rePassWord (state) {
      return state.re_password;
    },
    userName (state) {
      return state.userName;
    },
    // -----------------------------------------------------------뮤직플레이어 getters
    musicTitle (state) {
      return state.music_title;
    },
    musicArtist (state) {
      return state.music_artist;
    },
    toggleVolume (state) {
      return state.toggle_volume;
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
    }
  },
  mutations: {
    // -----------------------------Main.vue------------------------------------
    showModal (state) {
      state.show_modal = true;
      state.sign_up_list = false;
    },
    // -----------------------------LoginAfterMain.vue------------------------------------
    loginAfterList (state) {
      state.login_after_list = true;
    },
    // -----------------------------LoginModal.vue------------------------------------
    closeModal (state) {
      state.show_modal = false;
    },
    loginBtn (state, e) {
      stopAction(e);
      if (state.sign_up_list === false) {
        var emailCheck = /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/;
        var passwordCheck = /^.*(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
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
      } else {
        state.email = '';
        state.userName = '';
        state.password = '';
        state.re_password = '';
        state.sign_up_list = false;
      }
    },
    signUpBtn (state, e) {
      stopAction(e);
      var passwordCheck = /^.*(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
      if (state.sign_up_list === false) {
        state.sign_up_list = true;
      } else {
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
          for (var i = 0, l = state.members.length; i < l; i++) {
            if (state.email === state.members[i].email) {
              alert('이미 회원가입된 이메일 입니다.');
              return;
            }
          }
          console.log(state.email, state.members[10].email);
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
    // -----------------------------MusicPlayer.vue------------------------------------
    init (state) {
      // 초기 뮤직플레이어에 첫 번째 곡을 셋팅
      musicPlayer.src = state.sun[0].src;
      // 뮤직플레이어에 현재 순서를 기억
      musicPlayer.index = 0;
      // 곡의 제목을 속성에 할당
      state.music_title = state.sun[0].title;
      // 곡의 아티스트를 속성에 할당
      state.music_artist = state.sun[0].artist;
      musicPlayer.addEventListener('ended', function () {
        for (let i = 0, l = state.sun.length; i < l; i++) {
          if ((musicPlayer.index === i) && !(i === l - 1)) {
            musicSeting(state, ++i);
            break;
          } else if ((musicPlayer.index === i) && (i === l - 1)) {
            musicSeting(state, 0);
            break;
          }
        }
        state.toggle_play = 'fa-pause';
        showPrograss(state);
        musicPlayer.play();
      });
    },
    // 뮤직플레이어의 소리값을 0 또는 100으로 변경해주는 토글 함수 (소리업/음소거 아이콘도 변경)
    volumeOff (state) {
      if (state.toggle_volume !== 'fa-volume-off') {
        state.toggle_volume = 'fa-volume-off';
        musicPlayer.volume = 0;
      } else if (state.toggle_volume === 'fa-volume-off') {
        if (state.volume < 99) {
          state.toggle_volume = 'fa-volume-down';
        } else {
          state.toggle_volume = 'fa-volume-up';
        }
        musicPlayer.volume = state.volume / 100;
      }
    },
    // 볼륨을 설정해주는 함수
    setVolume (state, e) {
      state.voluem = e.target.value;
      musicPlayer.volumee = e.target.value / 100;
      if (state.volume < 1) {
        state.toggle_volume = 'fa-volume-off';
      } else if ((state.volume > 0) && (state.volume < 100)) {
        state.toggle_volume = 'fa-volume-down';
      } else if (state.volume > 99) {
        state.toggle_volume = 'fa-volume-up';
      }
    },
    // 현재 곡을 마이리스트에 추가해주는 함수(현재 아이콘 변화만 구현)
    addToMyList (state) {
      if (state.active_add_btn.transform === 'rotate(0)') {
        state.active_add_btn.transform = 'rotate(45deg)';
      } else {
        state.active_add_btn.transform = 'rotate(0)';
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
      for (let i = 0, l = state.sun.length; i < l; i++) {
        if ((musicPlayer.index === i) && !(i === l - 1)) {
          musicSeting(state, ++i);
          break;
        } else if ((musicPlayer.index === i) && (i === l - 1)) {
          musicSeting(state, 0);
          break;
        }
      }
      state.toggle_play = 'fa-pause';
      showPrograss(state);
      musicPlayer.play();
    },
    // 이전 곡을 재생해주는 함수
    prevMusic (state) {
      for (let i = 0, l = state.sun.length; i < l; i++) {
        let j = state.sun.length;
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
      musicPlayer.play();
      showPrograss(state);
      state.toggle_play = 'fa-pause';
    },
    // 한 곡 반복재생을 설정해주는 함수
    repeat (state) {
      if (musicPlayer.loop === false) {
        musicPlayer.loop = true;
        state.active.color = '#3b99fc';
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
    setCity (state, e) {
      state.currentCity = e;
    },
    setWeather (state, e) {
      state.currentWeather = e;
    },
    setGeo (state, e) {
      state.geo = e;
    }
  },
  actions: {
    getCityAction: function ({commit}) {
      // 서버통신을 위한 axios 코드
      Vue.axios.get('http://ip-api.com/json')
      .then((response) => {
        commit('setCity', response.data.city);
        commit('setGeo', {
          lat: response.data.lat,
          lon: response.data.lon
        });
      });
    },
    getWeatherAction: function (store) {
      var address = 'http://api.openweathermap.org/data/2.5/weather?lat=' + store.state.geo.lat + '&lon=' + store.state.geo.lon + '&units=metric&APPID=f63c992320644b675405158f284ba653';
      Vue.axios.get(address).then((response) => {
        var weather = response.data.weather[0].icon.slice(0, -1);
        if (weather === '01') {
          weather = 'Sunny';
        } else if (weather === '02' || '03' || '04') {
          weather = 'Cloudy';
        } else if (weather === '09' || '10' || '11') {
          weather = 'Rainny';
        } else if (weather === '13') {
          weather = 'Snow';
        } else if (weather === '50') {
          weather = 'Mist';
        }
        console.log(weather);
        store.commit('setWeather', weather);
      });
    },
    fireBase: function ({commit}) {
      Vue.axios.get('https://weather-sound.com/api/member/signup').then((response) => {
        console.log(response);
      });
    },
    backgroundImg: function (store) {
      Vue.axios.get('https://api.unsplash.com/photos/random/?client_id=7c9e74548c6a6e5faa509c665e9e0f9da156e9695d4552d2c115b59743208024', {
        params: {
          query: store.state.currentWeather,
          count: 1
        }
      }).then((response) => {
        for (var i = 0, l = response.data.length; i < l; i++) {
          if (response.data[i].width > response.data[i].height) {
            store.state.background_img = {
              'background-image': 'url("' + response.data[i].links.download + '")',
              'background-size': 'cover',
              'background-repeat': 'no-repeat',
              'background-position': 'center'
            };
            break;
          }
        }
        console.log(store.state.background_img.background);
      });
    },
    signUpPost: function (store, e) {
      store.commit('signUpBtn', e);
      if (store.state.sign_up_check) {
        Vue.axios.post('https://weather-sound.com/api/member/signup/', {
          'email': store.state.email,
          'nickname': store.state.userName,
          'password1': store.state.password,
          'password2': store.state.re_password
        }).then((response) => {
          store.state.email = '';
          store.state.password = '';
          store.state.userName = '';
          store.state.re_password = '';
          store.dispatch('signUpGet');
          store.state.show_modal = false;
        });
      }
    },
    signInPost: function (store, e) {
      store.commit('loginBtn', e);
      console.log(store.state.login_check);
      if (store.state.login_check) {
        Vue.axios.post('https://weather-sound.com/api/member/login/', {
          'email': store.state.email,
          'password': store.state.password
        }).then((response) => {
          console.log(response);
          store.state.email = '';
          store.state.password = '';
          store.state.show_modal = false;
          store.state.login_after_list = true;
        });
      }
    },
    signUpGet: function (store) {
      Vue.axios.get('https://weather-sound.com/api/member/signup/').then((response) => {
        for (var i = 0, l = response.data.results.length; i < l; i++) {
          store.state.members.push({
            email: response.data.results[i].email,
            username: response.data.results[i].username
          });
        }
        console.log(store.state.members);
      });
    }
  }
});
