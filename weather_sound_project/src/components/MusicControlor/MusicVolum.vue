<template lang="pug">
  .music-volum
    button.music-controlor-btn(@click="volumeOff")
      i.fa(aria-hidden='true' :class="toggleVolum")
    input.volum-size(type="range" :value='volum' min="0" max='100', aria-label="볼륨 조절바" @mouseup="setVolume")
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: 'MusicVolum',
  computed: {
    ...mapGetters([
      'toggleVolum',
      'volum'
    ])
  },
  methods: {
    volumeOff () {
      this.$store.commit('volumeOff');
    },
    setVolume (e) {
      this.$store.commit('setVolume', e);
    }
  }
};
</script>
<style lang="scss" scoped>
// ----------------------- 뮤직플레이어 볼륨 wrapper
.music-volum{
  text-align: center;
  width: 25%;
  float: right;
  line-height: 100px;
  height: 10vh;
}
// 뮤직플레이어 볼륨 아이콘
.music-volum i{
  font-size: 1.8rem;
  padding: 1%;
  margin-right: 2%;
}
// 볼륨 조절 바
.volum-size{
  width: 30%;
}
</style>
