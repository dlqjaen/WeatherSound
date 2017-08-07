<template lang="pug">
  .music-info
    img.album(src='../../assets/music-album.png', alt='album')
    p.album-text
      span.music-title {{musicTitle}}
      span.music-singger {{musicArtist}}
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: 'MusicInfo',
  computed: {
    ...mapGetters([
      'musicTitle',
      'musicArtist'
    ])
  }
};
</script>
<style lang="scss" scoped>
// ----------------------- 곡 정보 표시 요소
.music-info{
  width:25%;
  float: left;
}
// 자식요소의 float정렬을 감지
.music-info::after{
  content:'';
  display:block;
  clear:both;
}
// 곡 정보 중 커버앨범
.album{
  float: left;
  margin: 1vh;
  height: 8vh;
}
// 곡 정보 텍스트 wrapper
.album-text{
  float: left;
}
// 곡 명, 곡 아티스트 텍스트
.music-title, .music-singger{
  display: block;
}
.music-singger{
  color: gray;
}
</style>
