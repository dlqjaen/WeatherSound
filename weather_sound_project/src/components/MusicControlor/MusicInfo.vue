<template lang="pug">
  .music-info
    img.album(:src='musicInfo.music_img || musicInfo.defult', :alt='musicInfo.music_title+"의 앨범커버"' tabindex="0")
    p.album-text(tabindex="0")
      span.music-title(:aria-label="'현재곡: '+musicInfo.music_title") {{musicInfo.music_title}}
      span.music-singger(:aria-label="', 현재곡 가수: '+musicInfo.music_artist") {{musicInfo.music_artist}}
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: 'MusicInfo',
  computed: {
    ...mapGetters([
      'musicInfo'
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
  margin: 10px;
  float: left;
  height: 8vh;
}
// 곡 정보 텍스트 wrapper
.album-text{
  width: 40%;
  float: left;
}
// 곡 명, 곡 아티스트 텍스트
.music-title, .music-singger{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}
.music-singger{
  color: gray;
}
</style>
