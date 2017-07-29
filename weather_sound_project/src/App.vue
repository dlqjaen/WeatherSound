<template lang="pug">
  #app
    img(src="./assets/logo.png" alt="Vue")
    router-view
</template>

<script>
export default {
  name: 'app',
};
</script>

<style lang="sass">
html
  font-size: 100%
  background: #fff
body
  margin: 0
#app
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  margin-top: 60px
  text-align: center
  color: #2c3e50
</style>