<template lang="pug">
  .hello
    h1 {{ msg }}
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: 'Vue.js 앱 개발을 시작해볼까요?',
    };
  },
};
</script>

<style scoped  lang="sass">

</style>
