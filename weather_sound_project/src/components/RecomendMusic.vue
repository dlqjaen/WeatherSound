<template lang="pug">
  .recomend-music
    section.main.recomend-song
      h2.a11y-hidden 날씨별 추천 음악
      p.today-mood
        | Today Mood is 
        em Sad
      ul.recomend-wrapper
        li.music-recomend-list
          label.a11y-hidden(for='')
          button.recomend-music-btn(type='button')
            p.recomend-music-info
              span.recomend-music-title 네어게 쓰는 편지
              span.recomend-music-singger MC몽
            img(src='../assets/music-album.png', alt='')
</template>
  
<script>
export default {
};
</script>

<style lang="scss" scoped>
button:hover{
  opacity: 1;
}
.main{
  overflow: auto;
  text-align: center;
  float: left;
  width: 87%;
  height: 90vh;
}
.today-mood{
  margin-left: -13%;
  font-size: 2.2rem;
}
.recomend-wrapper{
  margin: 0 auto;
}
.recomend-wrapper::after{
  content:'';
  display:block;
  clear:both;
}
.music-recomend-list{
  width: 17.6%;
  margin: 0 0 2% 2%;
  float: left;
}
.recomend-wrapper:last-child{
  margin-right: 0;
}
.recomend-music-btn{
  border-radius: 10px;
  width: 100%;
  height: 170px;
  position: relative;
  overflow: hidden;
  background: none;
  font-size: 1.6rem;
  text-align: center;
  cursor: pointer;
  opacity: 0.5;
  border: none;
}
.recomend-music-btn img{
  position: absolute;
  z-index: -1;
  width: 100%;
  height: auto;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
}
.recomend-music-info{
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