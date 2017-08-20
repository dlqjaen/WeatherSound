<template lang="pug">
  section.detail-my-list
    h2(tabindex="0") {{detailGetMusicMyList.name_playlist}} ({{detailGetMusicMyList.weather}})
    .detail-my-list-wrapper
      .music-info
        img.album(:src='detailSelectMusicImg.img', :alt='detailGetMusicMyList.music_title+"의 앨범커버"' tabindex="0")
        button.detail-music-play(@click="detailMusicPlay(detailGetMusicMyList.playlist_id)") Play
      table.music-list
        tr
          th.music-index 순번
          th.music-title 곡 제목
          th.music-singger 가수 명
          th.music-play-time 재생시간
          td.delete-btn 삭제
        tr.my-list-music-info(v-for="(list, index) in detailGetMusicMyList.playlist_musics" tabindex="0" @click="detailSelectMusic(index)")
          td {{index+1}}
          td {{list.name_music}}
          td {{list.name_artist}}
          td {{list.time_music}}
          td
            button.detail-music-delete(@click.stop="detailDelete(list)") 삭제
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
      'detailSelectMusic',
      'detailMusicPlay',
      'detailDelete'
    ])
  }
};
</script>
<style lang="scss" scoped>
h2{
  background: rgba(0,0,0,0.5);
  margin: 0 0 40px 0;
  padding: 10px 0;
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
  padding: 10px;
  border-radius: 5px;
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
.detail-music-play{
  display: block;
  width: 100%;
  background: white;
}
.detail-music-delete{
  color: white;
  width: 100%;
}
.detail-music-delete:hover, .detail-music-delete:focus{
  color: black;
  background: white;
}
</style>
