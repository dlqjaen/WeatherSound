<template lang="pug">
  .music-volume
    button.music-controlor-btn(@click="volumeOff" aria-label="볼륨 음소거 / 소리켜기", :aria-pressed="volumeActiveCheck" title="음소거 버튼")
      i.fa(aria-hidden='true' :class="toggleVolume")
    input.volume-size(type="range" :value='volume' min="0" max='100',aria-label="볼륨 조절바" @mouseup="setVolume" @keydown="volumeKeyValueControlor")
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';
export default {
  name: 'MusicVolume',
  computed: {
    ...mapGetters([
      'toggleVolume',
      'volume',
      'volumeActiveCheck'
    ])
  },
  methods: {
    ...mapMutations([
      'volumeOff',
      'setVolume',
      'volumeKeyValueControlor'
    ])
  }
};
</script>
<style lang="scss" scoped>
// ----------------------- 뮤직플레이어 볼륨 wrapper
.music-volume{
  text-align: center;
  width: 25%;
  float: right;
  line-height: 100px;
  height: 10vh;
}
// 뮤직플레이어 볼륨 아이콘
.music-volume i{
  font-size: 1.8rem;
  padding: 1%;
  margin-right: 2%;
}
// 볼륨 조절 바
.volume-size{
  width: 75px;
  margin-right: 30px;
}
.music-controlor-btn{
  transform: scale(1);
  transition: transform 0.2s ease-in-out;
}
.music-controlor-btn:hover, .music-controlor-btn:focus{
  transition: transform 0.2s ease-in-out;
  transform: scale(1.4);
}
</style>
