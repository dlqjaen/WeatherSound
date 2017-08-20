<template lang="pug">
  section.main.recomend-song
    h2.a11y-hidden(tabindex="0") {{getWeather}} 추천 음악들
    input.a11y-hidden(type="button" aria-label="뮤직플레이어로 바로가기" @keyup.enter="focusPlayer")
    ul.recomend-wrapper
      li.music-recomend-list(v-for="(music, index) in getMusic")
        label.a11y-hidden(:for='music.name_music')
        button.recomend-music-btn(type='button', :id="music.name_music" @click="selectMusic(index)" @mouseenter="changeEventIn" @mouseleave="changeEventOut" @focus="changeEventIn" @blur="changeEventOut")
          p.recomend-music-info
            span.recomend-music-title {{music.name_music}}
            span.recomend-music-singger {{music.name_artist}}
          img(:src='music.img_music', alt='앨범커버')
    input.a11y-hidden.main-skip-btn(type="button" aria-label="메인메뉴로 바로가기" @keyup.enter="focusMenu")
</template>
  
<script>
import {mapGetters, mapMutations, mapActions} from 'vuex';
export default {
  name: 'RecomendMusic',
  computed: {
    ...mapGetters([
      'getMusic',
      'getWeather'
    ])
  },
  methods: {
    ...mapMutations([
      'focusPlayer',
      'focusMenu',
      'changeEventIn',
      'changeEventOut'
    ]),
    ...mapActions([
      'selectMusic'
    ])
    // selectMusic (index) {
    //   this.$store.dispatch('selectMusic', index);
    // }
  }
};
</script>

<style lang="scss" scoped>
.recomend-music-btn:hover{
  opacity: 1;
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
.recomend-music-btn:hover, .recomend-music-btn:focus{
  animation: scaleAnimation 0.5s ease-in-out;
  transform: scale(1.1);
  z-index: 2;
}
.recomend-music-btn{
  padding: 10px;
  max-width: 200px;
  max-height: 200px;
  position: relative;
  overflow: hidden;
  font-size: 1.6rem;
  text-align: center;
  opacity: 0.8;
}
.recomend-music-btn img{
  width: 100%;
  border-radius: 5px;
  height: auto;
}
.recomend-music-btn::after {
  border-radius: 5px;
  content: '';
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  background: rgba(0,0,0,0.2);
}
.recomend-music-info{
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  margin: 0;
  padding: 0;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}
.recomend-music-title, .recomend-music-singger{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  color: white;
  margin-top: 2%;
}
@keyframes scaleAnimation{
  0%{
    transform: scale(0.9);
  };
  50%{
    transform: scale(1.2);
  };
  100%{
    transform: scale(1.1);

  };
}
</style>