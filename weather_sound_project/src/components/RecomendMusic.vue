<template lang="pug">
  section.main.recomend-song
    h2.a11y-hidden 날씨별 추천 음악
    ul.recomend-wrapper
      li.music-recomend-list(v-for="(music, index) in getMusic")
        label.a11y-hidden(:for='music.name_music')
        button.recomend-music-btn(type='button', :id="music.name_music" @click="selectMusic(index)")
          p.recomend-music-info
            span.recomend-music-title {{music.name_music}}
            span.recomend-music-singger {{music.name_artist}}
          img(:src='music.img_music', alt='앨범커버')
</template>
  
<script>
import {mapGetters} from 'vuex';
export default {
  name: 'RecomendMusic',
  computed: {
    ...mapGetters([
      'getMusic'
    ])
  },
  methods: {
    selectMusic (index) {
      this.$store.dispatch('selectMusic', index);
    }
  }
};
</script>

<style lang="scss" scoped>
.recomend-music-btn:hover{
  opacity: 1;
  transition: all 0.5s ease-in-out;
}
.main{
  overflow: auto;
  text-align: center;
  float: left;
  margin-left: 150px;
  height: 90vh;
}
.recomend-wrapper{
  flex-wrap: wrap;
  display: flex;
  justify-content: space-around;
}
.music-recomend-list{
  height: 200px;
}
.recomend-music-btn{
  padding: 5px;
  border-radius: 10px;
  max-width: 200px;
  max-height: 200px;
  position: relative;
  overflow: hidden;
  background: none;
  font-size: 1.6rem;
  text-align: center;
  cursor: pointer;
  border: none;
  opacity: 0.6;
}
.recomend-music-btn img{
  width: 100%;
  border-radius: 10px;
  height: auto;
}
.recomend-music-info{
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  margin: 0;
  padding: 0;
}
.recomend-music-title, .recomend-music-singger{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  color: white;
  margin-top: 2%;
}
</style>