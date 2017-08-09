<template lang="pug">
  aside.music-player
    //-  접근성을 고려한 타이틀
    h2.a11y-hidden MusicPlayer
    //- 곡 정보가 표시되는 영역
    MusicInfo
    //- 뮤직플레이어를 컨트롤하는 영역
    MusicControlor
    //- 뮤직플레이어 볼륨 바
    MusicVolume
</template>

<script>
// Vue 로드
import Vue from 'vue';
import MusicInfo from './MusicControlor/MusicInfo';
import MusicControlor from './MusicControlor/MusicControlor';
import MusicVolume from './MusicControlor/MusicVolume';

export default {
  name: 'MusicPlayer',
  components: {
    MusicInfo, MusicVolume, MusicControlor
  },
  mounted () {
    this.$store.commit('init');
  }
};
</script>

<style lang="scss">
// 뮤직플레이어 wrapper
.music-player{
  width: 100%;
  height: 10vh;
  background: rgba(0,0,0,0.5);
  float: left;
}
// 자식요소의 float정렬을 감지
.music-player::after{
  content:'';
  display:block;
  clear:both;
}
// 뮤직플레이어 버튼들
.music-controlor-btn{
  background: none;
  border: none;
  color: white;
  font-size: 1.6rem;
  padding: 1%;
  margin-right: 2%;
}
// ----------------------- 곡 진행 바와 볼륨 바 스타일 적용
input[type='range'] {
  border-radius: 5px 5px 5px 5px;
  overflow: hidden;
  cursor: pointer;
}
input[type='range'],
input[type='range']::-webkit-slider-runnable-track,
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
}
input[type='range']::-webkit-slider-runnable-track {
  width: 200px;
  height: 10px;
  background: rgba(100,100,100,0.9);
}
input[type='range']::-webkit-slider-thumb {
  position: relative;
  border-radius: 5px;
  height: 10px;
  width: 15px;
  background: #fff;
}
input[type='range']::-webkit-slider-thumb::before {
  position: absolute;
  content: '';
  height: 10px; /* equal to height of runnable track */
  width: 500px; /* make this bigger than the widest range input element */
  left: -502px; /* this should be -2px - width */
  top: 8px; /* don't change this */
  background: #777;
}
</style>
