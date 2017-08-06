<template lang="pug">
  aside.music-player
    //-  접근성을 고려한 타이틀
    h2.a11y-hidden MusicPlayer
    //- 곡 정보가 표시되는 영역
    MusicInfo
    //- 뮤직플레이어를 컨트롤하는 영역
    .music-controlor
      //- 뮤직플레이어 버튼들
      .music-btn-box
        button.music-controlor-btn(aria-label="마이리스트 추가 버튼" @click="addToMyList")
          i.fa.fa-plus(aria-hidden='true' :style="active_add_btn")
        button.music-controlor-btn(aria-label="이전 곡 재생" @click="prevMusic")
          i.fa.fa-step-backward(aria-hidden='true')
        button.music-controlor-btn(aria-label="곡 재생버튼 곡이 재생중일 때는 정지버튼" @click="play")
          i.fa(aria-hidden='true' :class="toggle_play")
        button.music-controlor-btn(@click="nextMusic")
          i.fa.fa-step-forward(aria-hidden='true')
        button.music-controlor-btn(@click="repeat")
          i.fa.fa-repeat(aria-hidden='true' :style="active")
      //- 뮤직플레이어 진행 바
      .music-time
        span.music-currnet-time {{currentTime}}
        input.music-time-line(type="range" :value='prograss', max='100', tabindex='0' aria-label="곡 진행 상태바" @mouseup="setTime")
        span.music-max-time {{runningTime}}
    //- 뮤직플레이어 볼륨 바
    .music-volum
      button.music-controlor-btn(@click="volumeOff")
        i.fa(aria-hidden='true' :class="toggle_volum")
      input.volum-size(type="range" :value='volum' min="0" max='100', aria-label="볼륨 조절바" @mouseup="setVolume")
</template>

<script>
// Vue 로드
import Vue from 'vue';
import MusicInfo from './MusicControlor/MusicInfo';
// Dom에서 Audio객체를 생성
const musicPlayer = document.createElement('audio');
export default {
  name: 'MusicPlayer',
  components: {
    MusicInfo
  },
  data: function () {
    return {
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
      ],
      // 뮤직플레이어 곡 정보에서 곡 제목이 할당되는 속성
      // music_title: '',
      // 뮤직플레이어 곡 정보에서 곡 아티스트가 할당되는 속성
      // music_artist: '',
      // data: null,
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
      }
    };
  },
  // 루트 엘리먼트에 객체들이 마운트 되는 시점
  mounted () {
    // 초기 뮤직플레이어에 첫 번째 곡을 셋팅
    musicPlayer.src = this.sun[0].src;
    // 뮤직플레이어에 현재 순서를 기억
    musicPlayer.index = 0;
    // 곡의 제목을 속성에 할당
    this.$store.state.music_title = this.sun[0].title;
    // 곡의 아티스트를 속성에 할당
    this.$store.state.music_artist = this.sun[0].artist;
    // 곡 재생이 끝났을 때 다음 곡으로 자동 재생되게 하는 이벤트
    musicPlayer.addEventListener('ended', this.nextMusic);
    // 서버통신을 위한 axios 코드
    // Vue.axios.get('example.json').then((response) => {
    //   console.log(response.data);
    // });
  },
  methods: {
    // 재생될 곡의 주소, 순서, 곡명, 곡아티스트를 뮤직플레이어에 할당 하는 함수
    musicSeting (index) {
      musicPlayer.src = this.sun[index].src;
      musicPlayer.index = index;
      this.$store.state.music_title = this.sun[index].title;
      this.$store.state.music_artist = this.sun[index].artist;
    },
    // 현재 곡의 진행 시간, 정도, 런닝타임을 속성에 할당하는 함수
    showPrograss () {
      setInterval(() => {
        this.currentTime = this.readableDuration(musicPlayer.currentTime);
        this.prograss = (Math.floor(musicPlayer.currentTime) / Math.floor(musicPlayer.duration)) * 100;
        this.runningTime = this.readableDuration(musicPlayer.duration);
      }, 1000);
    },
    // 뮤직플레이어를 재생/일시정지 하는 함수(재생/일시정지 아이콘도 변경)
    play: function () {
      if (this.toggle_play === 'fa-pause') {
        this.toggle_play = 'fa-play';
        musicPlayer.pause();
      } else {
        this.toggle_play = 'fa-pause';
        musicPlayer.play();
      }
      this.showPrograss();
    },
    // 정수로된 숫자값을 넣으면 분, 초 단위로 나타내주는 함수
    readableDuration: function (seconds) {
      seconds = Math.floor(seconds);
      this.min = Math.floor(seconds / 60);
      this.min = this.min >= 10 ? this.min : '0' + this.min;
      this.sec = Math.floor(seconds % 60);
      this.sec = this.sec >= 10 ? this.sec : '0' + this.sec;
      return this.min + ':' + this.sec;
    },
    // 뮤직플레이어의 소리값을 0 또는 100으로 변경해주는 토글 함수 (소리업/음소거 아이콘도 변경)
    volumeOff: function () {
      if (this.toggle_volum !== 'fa-volume-off') {
        this.toggle_volum = 'fa-volume-off';
        musicPlayer.volume = 0;
      } else if (this.toggle_volum === 'fa-volume-off') {
        if (this.volum < 99) {
          this.toggle_volum = 'fa-volume-down';
        } else {
          this.toggle_volum = 'fa-volume-up';
        }
        musicPlayer.volume = this.volum / 100;
      }
    },
    // 다음 곡을 재생해주는 함수
    nextMusic () {
      for (let i = 0, l = this.sun.length; i < l; i++) {
        if ((musicPlayer.index === i) && !(i === l - 1)) {
          this.musicSeting(++i);
          break;
        } else if ((musicPlayer.index === i) && (i === l - 1)) {
          this.musicSeting(0);
          break;
        }
      }
      this.toggle_play = 'fa-pause';
      this.showPrograss();
      musicPlayer.play();
    },
    // 이전 곡을 재생해주는 함수
    prevMusic () {
      for (let i = 0, l = this.sun.length; i < l; i++) {
        let j = this.sun.length;
        if (musicPlayer.index === i) {
          if (i !== 0) {
            this.musicSeting(--i);
            break;
          } else if (i === 0) {
            this.musicSeting(--j);
            break;
          }
        }
      }
      musicPlayer.play();
      this.showPrograss();
      this.toggle_play = 'fa-pause';
    },
    // 한 곡 반복재생을 설정해주는 함수
    repeat () {
      if (musicPlayer.loop === false) {
        musicPlayer.loop = true;
        this.active.color = '#3b99fc';
      } else if (musicPlayer.loop === true) {
        musicPlayer.loop = false;
        this.active.color = '#ffffff';
      }
    },
    // 현재 곡을 마이리스트에 추가해주는 함수(현재 아이콘 변화만 구현)
    addToMyList () {
      if (this.active_add_btn.transform === 'rotate(0)') {
        this.active_add_btn.transform = 'rotate(45deg)';
      } else {
        this.active_add_btn.transform = 'rotate(0)';
      }
    },
    // 볼륨을 설정해주는 함수
    setVolume (e) {
      this.volum = e.target.value;
      musicPlayer.volume = e.target.value / 100;
      if (this.volum < 1) {
        this.toggle_volum = 'fa-volume-off';
      } else if ((this.volum > 0) && (this.volum < 100)) {
        this.toggle_volum = 'fa-volume-down';
      } else if (this.volum > 99) {
        this.toggle_volum = 'fa-volume-up';
      }
    },
    // 곡의 진행 바 컨트롤 함수
    setTime (e) {
      this.prograss = e.target.value;
      musicPlayer.currentTime = (musicPlayer.duration / 100 * e.target.value);
    }
  }
};
</script>

<style lang="scss">
// 뮤직플레이어 wrapper
.music-player{
  width: 100%;
  height: 10vh;
  background: rgba(0,0,0,0.5);
  float: left;
}
// 자식요소의 float정렬을 감지
.music-player::after{
  content:'';
  display:block;
  clear:both;
}
// ----------------------- 뮤직플레이어를 컨트롤하는 버튼과 진행 바 wrapper
.music-controlor{
  display: inline-block;
  height: 10vh;
  width: 50%;
  text-align: center;
}
// 뮤직플레이어 버튼 wrapper
.music-btn-box{
  box-sizing: border-box;
  height: 50%;
  padding-top: 1%;
  line-height: 50px;
}
// 뮤직플레이어 버튼들
.music-controlor-btn{
  background: none;
  border: none;
  color: white;
  font-size: 1.6rem;
  padding: 1%;
  margin-right: 2%;
}
// 뮤직플레이어 진행 바 wrapper
.music-time{
  padding-top: 1%;
}
// 뮤직플레이어 진행 바
.music-time-line{
  width: 70%;
  margin: 0 2%;
}
// 뮤직플레이어 버튼 아이콘들
.music-btn-box .fa{
  vertical-align: middle;
}
// ----------------------- 뮤직플레이어 볼륨 wrapper
.music-volum{
  text-align: center;
  width: 25%;
  float: right;
  line-height: 100px;
  height: 10vh;
}
// 뮤직플레이어 볼륨 아이콘
.music-volum i{
  font-size: 1.8rem;
  padding: 1%;
  margin-right: 2%;
}
// 볼륨 조절 바
.volum-size{
  width: 30%;
}
// ----------------------- 곡 진행 바와 볼륨 바 스타일 적용
input[type='range'] {
  border-radius: 5px 5px 5px 5px;
  overflow: hidden;
  cursor: pointer;
}
input[type='range'],
input[type='range']::-webkit-slider-runnable-track,
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
}
input[type='range']::-webkit-slider-runnable-track {
  width: 200px;
  height: 10px;
  background: rgba(100,100,100,0.9);
}
input[type='range']::-webkit-slider-thumb {
  position: relative;
  border-radius: 5px;
  height: 10px;
  width: 15px;
  background: #fff;
}
input[type='range']::-webkit-slider-thumb::before {
  position: absolute;
  content: '';
  height: 10px; /* equal to height of runnable track */
  width: 500px; /* make this bigger than the widest range input element */
  left: -502px; /* this should be -2px - width */
  top: 8px; /* don't change this */
  background: #777;
}
</style>
