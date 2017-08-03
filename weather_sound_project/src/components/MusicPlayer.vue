<template lang="pug">
  aside.music-player
    h2.a11y-hidden MusicPlayer
    .music-info
      img.album(src='../assets/music-album.png', alt='album')
      p.album-text
        span.music-title 너에게 쓰는 편지
        span.music-singger MC몽
    .music-controlor
      .music-btn-box
        i.fa.fa-plus(tabindex='0', aria-hidden='true' aria-label="마이리스트 추가 버튼")
        i.fa.fa-step-backward(tabindex='0', aria-hidden='true' aria-label="이전 곡 재생" @click="prevMusic")
        i.fa(tabindex='0', aria-hidden='true' :class="toggle_play" aria-label="곡 재생버튼 곡이 재생중일 때는 정지버튼" @click="play")
        i.fa.fa-step-forward(tabindex='0', aria-hidden='true' @click="nextMusic")
        i.fa.fa-repeat(tabindex='0', aria-hidden='true')
      .music-time
        span.music-currnet-time 0:00
        progress.music-time-line(value='0', max='100', tabindex='0')
        span.music-max-time 3:00
    .music-volum
      i.fa(tabindex='0', aria-hidden='true' :class="toggle_volum" @click="volumeOff")
      progress.volum-size(value='100', max='100', tabindex='0')
</template>

<script>
const musicPlayer = document.createElement('audio');
export default {
  name: 'MusicPlayer',
  data: function () {
    return {
      sun: [
        {
          title: '너에게 쓰는 편지',
          artist: 'Mc몽',
          src: 'https://doc-0g-1s-docs.googleusercontent.com/docs/securesc/092q69t2ohrgde4e41oihepk7gf5u6a2/bfel4j07hvhpetnnc0nofr5rc65jgodt/1501754400000/15780926998673753947/15780926998673753947/0ByYLBJQe6C_EemlCZHV1RG4wMzA?e=download'
        },
        {
          title: 'Gone',
          artist: '다이나믹듀오',
          src: 'https://doc-00-1s-docs.googleusercontent.com/docs/securesc/092q69t2ohrgde4e41oihepk7gf5u6a2/eraej3ercko267ti1317apvm2oa31ee1/1501754400000/15780926998673753947/15780926998673753947/0ByYLBJQe6C_EYmdYcWprSGR6Rms?e=download'
        },
        {
          title: '몽환의 숲',
          artist: '키스틱 플로우',
          src: 'https://doc-10-1s-docs.googleusercontent.com/docs/securesc/092q69t2ohrgde4e41oihepk7gf5u6a2/llp36tiq6e4vc0vupm15ege3phn6055n/1501754400000/15780926998673753947/15780926998673753947/0ByYLBJQe6C_EZ2ZHMkdjd25IQlk?e=download'
        }
      ],
      toggle_play: 'fa-play',
      toggle_volum: 'fa-volume-up',
      min: '',
      sec: ''
    };
  },
  mounted () {
    musicPlayer.src = this.sun[0].src;
    musicPlayer.index = 0;
  },
  methods: {
    play: function () {
      if (this.toggle_play === 'fa-pause') {
        this.toggle_play = 'fa-play';
        musicPlayer.pause();
      } else {
        this.toggle_play = 'fa-pause';
        musicPlayer.play();
      }
    },
    readableDuration: function (seconds) {
      seconds = Math.floor(seconds);
      this.min = Math.floor(seconds / 60);
      this.min = this.min >= 10 ? this.min : '0' + this.min;
      this.sec = Math.floor(seconds % 60);
      this.sec = this.sec >= 10 ? this.sec : '0' + this.sec;
      return this.min + ':' + this.sec;
    },
    volumeOff: function () {
      if (this.toggle_volum === 'fa-volume-up') {
        this.toggle_volum = 'fa-volume-off';
        musicPlayer.volume = 0;
      } else {
        this.toggle_volum = 'fa-volume-up';
        musicPlayer.volume = 1;
      }
    },
    nextMusic () {
      for (let i = 0, l = this.sun.length; i < l; i++) {
        if ((musicPlayer.index === i) && !(i === l - 1)) {
          musicPlayer.src = this.sun[++i].src;
          musicPlayer.index = i;
          break;
        } else if ((musicPlayer.index === i) && (i === l - 1)) {
          musicPlayer.src = this.sun[0].src;
          musicPlayer.index = 0;
          break;
        }
      }
      musicPlayer.play();
      this.toggle_play = 'fa-pause';
    },
    prevMusic () {
      for (let i = 0, l = this.sun.length; i < l; i++) {
        let j = this.sun.length;
        if (musicPlayer.index === i) {
          if (i !== 0) {
            musicPlayer.src = this.sun[--i].src;
            musicPlayer.index = i;
            break;
          } else if (i === 0) {
            musicPlayer.src = this.sun[--j].src;
            musicPlayer.index = j;
            break;
          }
        }
      }
      musicPlayer.play();
      this.toggle_play = 'fa-pause';
    }
  }
};
</script>

<style lang="scss" scoped>
.music-player{
  width: 100%;
  height: 10vh;
  background: rgba(0,0,0,0.5);
  float: left;
}
.music-player::after{
  content:'';
  display:block;
  clear:both;
}
.music-info{
  width:25%;
  float: left;
}
.music-info::after{
  content:'';
  display:block;
  clear:both;
}
.album{
  float: left;
  margin: 1vh;
  height: 8vh;
}
.album-text{
  float: left;
}
.music-title, .music-singger{
  display: block;
}
.music-singger{
  color: gray;
}
.music-controlor{
  display: inline-block;
  height: 10vh;
  width: 50%;
  text-align: center;
}
.music-btn-box{
  box-sizing: border-box;
  height: 50%;
  padding-top: 1%;
  line-height: 50px;
}
.music-time{
  padding-top: 1%;
}
.music-btn-box .fa{
  vertical-align: middle;
}
.music-controlor i, .music-volum i{
  font-size: 1.6rem;
  padding: 1%;
  margin-right: 2%;
}
.music-volum{
  text-align: center;
  width: 25%;
  float: right;
  line-height: 100px;
  height: 10vh;
}
.music-volum i{
  font-size: 1.8rem;
  padding: 1%;
  margin-right: 2%;
}
.music-time-line{
  width: 70%;
  margin: 0 2%;
}
.volum-size{
  width: 30%;
}
</style>
