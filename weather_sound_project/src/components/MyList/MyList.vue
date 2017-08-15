<template lang="pug">
  section.my-music-list
    h2.a11y-hidden(tabindex="0") My Music List
    transition-group.recomend-wrapper(name="settingMusic" appear tag="ul")
      li.music-recomend-list(v-for="(music, index) in getMusic" :key="'music'+index")
        label.a11y-hidden(:for='music.name_music')
        button.recomend-music-btn(type='button', :id="music.name_music" @click="selectMusic(index)" @mouseenter="changeEventIn" @mouseleave="changeEventOut")
          p.recomend-music-info
            span.recomend-music-title {{music.name_music}}
            span.recomend-music-singger {{music.name_artist}}
          img(:src='music.img_music', alt='앨범커버')
    input.a11y-hidden(type="button" aria-label="메인메뉴로 바로가기" @keyup.enter="focusMenu")
</template>
  
<script>
import {mapGetters} from 'vuex';
export default {
  name: 'MyList',
  computed: {
    ...mapGetters([
    ])
  },
  methods: {
    selectMusic (index) {
      this.$store.dispatch('selectMusic', index);
    },
    changeEventIn (e) {
      this.$store.commit('changeEventIn', e);
    },
    changeEventOut (e) {
      this.$store.commit('changeEventOut', e);
    },
    focusPlayer () {
      this.$store.commit('focusPlayer');
    },
    focusMenu () {
      this.$store.commit('focusMenu');
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
  max-width: 200px;
  max-height: 200px;
  position: relative;
  overflow: hidden;
  background: none;
  font-size: 1.6rem;
  text-align: center;
  cursor: pointer;
  border: none;
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
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
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
  transition: all 0.5s ease-in-out;
}
.recomend-music-title, .recomend-music-singger{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  color: white;
  margin-top: 2%;
}
.settingMusic-enter-active{
  animation: settingMusicIn 2s ease forwards;
}
.settingMusic-move{
  transition: transform 2s;
}
@keyframes settingMusicIn{
  0%{
    transform: translateX(-20%);
  };
  50%{
    opacity: 0;
    transform: translateX(50%);
  };
  100%{
    transform: translateX(0);
    opacity: 1;
  };
}
</style>