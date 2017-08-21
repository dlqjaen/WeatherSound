<template lang="pug">
  aside.spinner-background
    .spinner-wrapper
      img(src="http://www.collidemus.com/assets/loader/loader.gif" alt="페이지 로딩중")
</template>

<script>
export default {
  name: 'Spinner'
};
</script>

<style lang="scss" scoped>
.spinner-background{
  position: relative;
  z-index: 10001;
  background: rgba(255,255,255,0.5);
  height: 100vh;
}
.spinner-wrapper{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%), translateY(-50%);
}
</style>
