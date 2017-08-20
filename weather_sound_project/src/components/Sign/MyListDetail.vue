<template lang="pug">
  section.detail-my-list
    h2(tabindex="0") {{detailGetMusicMyList.name_playlist}}
    .detail-my-list-wrapper
      .music-info
        img.album(:src='detailSelectMusicImg', :alt='detailGetMusicMyList.music_title+"의 앨범커버"' tabindex="0")
        button(@click="detailMusicPlay") Play
      table.music-list
        tr
          th.music-index 순번
          th.music-title 곡 제목
          th.music-singger 가수 명
          th.music-play-time 재생시간
          td.delete-btn 삭제
        tr.my-list-music-info(v-for="(list, index) in detailGetMusicMyList.playlist_musics" tabindex="0" @click="selectMusic(index)")
          td {{index+1}}
          td {{list.name_music}}
          td {{list.name_artist}}
          td {{list.time_music}}
          td
            button(@click.stop="") 삭제
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
export default {
  name: 'DetailMyList',
  computed: {
    ...mapGetters([
      'detailGetMusicMyList',
      'mylist',
      'detailSelectMusicImg'
    ])
  },
  methods: {
    ...mapActions([
      'selectMusic',
      'detailMusicPlay'
    ])
  }
};
</script>
<style lang="scss" scoped>
h2{
  margin-left: 5%;
  text-align: left;
}
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
  background: rgba(0,0,0,0.5);
  width: 65%;
}
.my-list-music-info{
  height: 30px;
  cursor: pointer;
}
.my-list-music-info:focus, .my-list-music-info:hover{
  background: rgba(59, 153, 252, 0.7);
}
</style>
