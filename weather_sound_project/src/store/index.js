// Vue 로드
import Vue from 'vue';
// Vuex 로드
import Vuex from 'vuex';
// Vuex 사용준비
Vue.use(Vuex);

export const store = new Vuex.Store({
  // strict: process.env.NODE_ENV !== 'production',
  state: {
    // -----------------------------------------------------------메인페이지 데이터
    // -----------------------------------------------------------로그인 데이터
    // -----------------------------------------------------------회원가입 데이터
    // -----------------------------------------------------------뮤직플레이어 데이터
    // 뮤직플레이어 곡 정보에서 곡 제목이 할당되는 속성
    music_title: '',
    // 뮤직플레이어 곡 정보에서 곡 아티스트가 할당되는 속성
    music_artist: '',
    // 재생 버튼에 할당되는 클래스명 pause아이콘과 play아이콘이 토글로 할당
    toggle_play: 'fa-play',
    // 볼륨 버튼에 할당되는 클래스명 음소거 아이콘과 소리아이콘이 토글로 할당
    toggle_volum: 'fa-volume-up',
    // 곡의 현재 플레이 시간이 할당되는 속성
    currentTime: '',
    // 곡의 현재 플레이 진행도가 보이도록 바의 움직임이 할당되는 속성 1 ~ 100
    prograss: 0,
    // 볼륨의 크기가 할당되는 속성 1 ~ 100
    volum: 100,
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
    musicTitle () {
      return this.$store.state.music_title;
    },
    musicArtist () {
      return this.$store.state.music_artist;
    }
  }
});
