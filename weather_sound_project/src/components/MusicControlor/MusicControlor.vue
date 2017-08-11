<template lang="pug">
  .music-controlor
    //- 뮤직플레이어 버튼들
    .music-btn-box
      button.music-controlor-btn(aria-label="마이리스트 추가" @click="addToMyList")
        i.fa.fa-plus(aria-hidden='true' :style="activeAddBtn")
      button.music-controlor-btn(aria-label="이전 곡 재생" @click="prevMusic")
        i.fa.fa-step-backward(aria-hidden='true')
      button.music-controlor-btn(aria-label="곡 재생버튼 곡이 재생중일 때는 정지" @click="play")
        i.fa(aria-hidden='true' :class="togglePlay")
      button.music-controlor-btn(aria-label="다음 곡 재생" @click="nextMusic")
        i.fa.fa-step-forward(aria-hidden='true')
      button.music-controlor-btn(aria-label="한 곡 반복재생" @click="repeat")
        i.fa.fa-repeat(aria-hidden='true' :style="active")
    //- 뮤직플레이어 진행 바
    .music-time
      span.music-currnet-time {{currentTime}}
      input.music-time-line(type="range" :value='prograss', max='100', tabindex='0' aria-label="곡 진행 상태바" @keydown="musicRunningKeyControlor" @mouseup="setTime")
      span.music-max-time {{runningTime}}
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'MusicControlor',
  computed: {
    ...mapGetters([
      'activeAddBtn',
      'togglePlay',
      'active',
      // 'repeatLabel',
      'currentTime',
      'prograss',
      'runningTime'
    ])
  },
  methods: {
    addToMyList () {
      this.$store.commit('addToMyList');
    },
    setVolume (e) {
      this.$store.commit('setVolume', e);
    },
    prevMusic () {
      this.$store.commit('prevMusic');
    },
    play () {
      this.$store.commit('play');
    },
    nextMusic () {
      this.$store.commit('nextMusic');
    },
    repeat () {
      this.$store.commit('repeat');
    },
    setTime (e) {
      this.$store.commit('setTime', e);
    },
    musicRunningKeyControlor (e) {
      this.$store.commit('musicRunningKeyControlor', e);
    }
  }
};
</script>
<style lang="scss" scoped>
// ----------------------- 뮤직플레이어를 컨트롤하는 버튼과 진행 바 wrapper
.music-controlor{
  display: inline-block;
  height: 10vh;
  width: 50%;
  text-align: center;
}
// 뮤직플레이어 버튼 wrapper
.music-btn-box{
  box-sizing: border-box;
  height: 50%;
  padding-top: 1%;
  line-height: 50px;
}
// 뮤직플레이어 진행 바 wrapper
.music-time{
  padding-top: 1%;
}
// 뮤직플레이어 진행 바
.music-time-line{
  width: 70%;
  margin: 0 2%;
}
// 뮤직플레이어 버튼 아이콘들
.music-btn-box .fa{
  vertical-align: middle;
}
.music-controlor-btn{
  cursor: pointer;
}
</style>
