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
        i.fa.fa-plus(tabindex='0', aria-hidden='true')
        i.fa.fa-step-backward(tabindex='0', aria-hidden='true')
        i.fa.fa-play(tabindex='0', aria-hidden='true' @click="play")
        i.fa.fa-step-forward(tabindex='0', aria-hidden='true')
        i.fa.fa-repeat(tabindex='0', aria-hidden='true')
      .music-time
        span.music-currnet-time 0:00
        progress.music-time-line(value='0', max='100', tabindex='0')
        span.music-max-time 3:00
    .music-volum
      i.fa.fa-volume-up(tabindex='0', aria-hidden='true')
      progress.volum-size(value='100', max='100', tabindex='0')
</template>

<script>
const musicPlayer = document.createElement('audio');
export default {
  name: 'MusicPlayer',
  data: function () {
    return {
      music_info: [
        {
          title: '너에게 쓰는 편지',
          artist: 'Mc몽',
          src: 'https://doc-00-1s-docs.googleusercontent.com/docs/securesc/092q69t2ohrgde4e41oihepk7gf5u6a2/0us4g3g53119uepfc87pkg9hukq4ss31/1501740000000/15780926998673753947/15780926998673753947/0ByYLBJQe6C_EWVp2ekk3UE5QaDg?e=download'
        }
      ]
    };
  },
  methods: {
    play: function () {
      musicPlayer.src = this.music_info[0].src;
      musicPlayer.play();
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
