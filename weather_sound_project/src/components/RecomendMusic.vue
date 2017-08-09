<template lang="pug">
  section.main.recomend-song
    h2.a11y-hidden 날씨별 추천 음악
    ul.recomend-wrapper
      li.music-recomend-list
        label.a11y-hidden(for='')
        button.recomend-music-btn(type='button')
          img(src='../assets/music-album.png', alt='')
          p.recomend-music-info
            span.recomend-music-title 네어게 쓰는 편지
            span.recomend-music-singger MC몽
      li.music-recomend-list
        label.a11y-hidden(for='')
        button.recomend-music-btn(type='button')
          p.recomend-music-info
            span.recomend-music-title 네어게 쓰는 편지
            span.recomend-music-singger MC몽
          img(src='../assets/music-album.png', alt='')
      li.music-recomend-list
        label.a11y-hidden(for='')
        button.recomend-music-btn(type='button')
          p.recomend-music-info
            span.recomend-music-title 네어게 쓰는 편지
            span.recomend-music-singger MC몽
          img(src='../assets/music-album.png', alt='')
      li.music-recomend-list
        label.a11y-hidden(for='')
        button.recomend-music-btn(type='button')
          p.recomend-music-info
            span.recomend-music-title 네어게 쓰는 편지
            span.recomend-music-singger MC몽
          img(src='../assets/music-album.png', alt='')
      li.music-recomend-list
        label.a11y-hidden(for='')
        button.recomend-music-btn(type='button')
          p.recomend-music-info
            span.recomend-music-title 네어게 쓰는 편지
            span.recomend-music-singger MC몽
          img(src='../assets/music-album.png', alt='')
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
.main{
  overflow: auto;
  text-align: center;
  float: left;
  margin-left: 150px;
  width: 87%;
  height: 90vh;
}
.recomend-wrapper{
  flex-wrap: wrap;
  display: flex;
  justify-content: flex-start;
}
.music-recomend-list{
  height: 200px;
}
.recomend-music-btn{
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
}
.recomend-music-btn img{
  width: 100%;
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