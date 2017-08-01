<template lang="pug">
  .hello
    h1 {{ msg }}
    router-link(tag="li" to="/a01055255417")
      button(type="button") Login
    router-view
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Vue.js 앱 개발을 시작해볼까요?'
    };
  }
};
</script>

<style scoped lang="sass">

</style>
