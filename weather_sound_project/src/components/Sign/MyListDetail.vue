<template lang="pug">
  section.detail-my-list
    h2(tabindex="0") {{detailGetMusicMyList.name_playlist}}
    .detail-my-list-wrapper
      .music-info
        img.album(:src='detailGetMusicMyList.playlist_musics[0].img_music', :alt='detailGetMusicMyList.music_title+"의 앨범커버"' tabindex="0")
        p title
        p singger
        button Play
      table.music-list
        tr
          th.music-index 순번
          th.music-title 곡 제목
          th.music-singger 가수 명
          th.music-play-time 재생시간
        tr.my-list-music-info(v-for="(list, index) in detailGetMusicMyList.playlist_musics" tabindex="0" @click="selectMusic(index)")
          td {{index+1}}
          td {{list.name_music}}
          td {{list.name_artist}}
          td 러닝타임
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
export default {
  name: 'DetailMyList',
  computed: {
    ...mapGetters([
      'detailGetMusicMyList',
      'mylist'
    ])
  },
  methods: {
    ...mapActions([
      'selectMusic'
    ])
  }
};
</script>
<style lang="scss" scoped>
.detail-my-list{
  box-sizing: border-box;
  overflow: auto;
  text-align: center;
  float: left;
  padding-left: 150px;
  height: 90vh;
  width: 100%;
}
.album{
  border-radius: 5px;
  max-width: 200px;
  max-height: 200px;
}
.detail-my-list-wrapper{
  display: flex;
  justify-content: space-around;
}
.music-title{
  width: 50%;
}
.music-singger{
  width: 20%;
}
.music-list{
  width: 65%;
}
.my-list-music-info{
  height: 30px;
  cursor: pointer;
}
</style>
