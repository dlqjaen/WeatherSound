<template lang="pug">
  .music-controlor
    //- 뮤직플레이어 버튼들
    ul.music-btn-box
      li.btn-list
        button.music-controlor-btn(aria-label="마이리스트 추가" @click="addToMyList" title="마이리스트 추가")
          i.fa.fa-plus(aria-hidden='true' :style="activeAddBtn")
        ul.mini-music-list(v-show="showMiniMyList")
          li(v-for="list in myList")
            button.select-mylist(@click="myListAddToMusic(list.name_playlist)") {{list.name_playlist}}
      li.btn-list
        button.music-controlor-btn(aria-label="이전 곡 재생" @click="prevMusic" title="이전 곡 재생")
          i.fa.fa-step-backward(aria-hidden='true')
      li.btn-list
        button.music-controlor-btn(aria-label="곡 재생버튼 곡이 재생중일 때는 정지" @click="play" title="곡 재생")
          i.fa(aria-hidden='true' :class="togglePlay")
      li.btn-list
        button.music-controlor-btn(aria-label="다음 곡 재생" @click="nextMusic" title="다음 곡 재생")
          i.fa.fa-step-forward(aria-hidden='true')
      li.btn-list
        button.music-controlor-btn(aria-label="한 곡 반복재생" @click="repeat" title="한 곡 반복 재생")
          i.fa.fa-repeat(aria-hidden='true' :style="active")
    //- 뮤직플레이어 진행 바
    .music-time
      span.music-currnet-time {{currentTime}}
      input.music-time-line(type="range" :value='prograss', max='100', tabindex='0' aria-label="곡 진행 상태바" @keydown.left.right="musicRunningKeyControlor" @mouseup="setTime")
      span.music-max-time {{runningTime}}
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex';

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
      'runningTime',
      'myList',
      'showMiniMyList'
    ])
  },
  methods: {
    ...mapMutations([
      'addToMyList',
      'prevMusic',
      'play',
      'nextMusic',
      'repeat',
      'setVolume',
      'setTime',
      'musicRunningKeyControlor'
    ]),
    ...mapActions([
      'myListAddToMusic'
    ])
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
  margin: 0 auto;
  box-sizing: border-box;
  height: 50%;
  max-width: 200px;
  padding-top: 1%;
  display: flex;
  justify-content: space-around;
}
.music-controlor-btn{
  transform: scale(1);
  transition: transform 0.2s ease-in-out;
}
.music-controlor-btn:hover, .music-controlor-btn:focus{
  transition: transform 0.2s ease-in-out;
  transform: scale(1.4);
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
  padding: 5px;
  cursor: pointer;
}
.mini-music-list{
  position: absolute;
  text-align: left;
  z-index: 10000;
  left: -65px;
  bottom: 45px;
  width: 150px;
  font-size: 2rem;
  background: rgba(0,0,0,0.5);
  border-radius: 5px 5px 0 0;
}
.btn-list{
  padding-top: 10px;
  position: relative;
}
.select-mylist{
  cursor: pointer;
  color: white;
  width: 100%;
  background: none;
  border: none;
}
</style>
