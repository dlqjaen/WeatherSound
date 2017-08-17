<template lang="pug">
  section.my-music-box
    h2.a11y-hidden(tabindex="0") My Music List
    ul.mylist-wrapper
      li.my-list(v-for="(list, index) in myList")
        label.a11y-hidden(for='')
        button.my-list-btn(type='button', id="" @mouseenter="changeEventIn" @mouseleave="changeEventOut")
          p.my-list-info
            span.my-list-title 마이리스트
            span.my-list-singger 마이리스트
          img(src='#', alt='앨범커버')
      li.my-list
        label.a11y-hidden(for='add_list')
        button.my-list-btn.add_list(type='button', id="add_list" @mouseenter="changeEventIn" @mouseleave="changeEventOut")
          p.my-list-info
            span.my-list-title 플러스버튼
            span.my-list-singger 마이리스트
          img(src='#', alt='앨범커버')
</template>
  
<script>
import {mapGetters, mapMutations, mapActions} from 'vuex';
export default {
  name: 'MyList',
  computed: {
    ...mapGetters([
      'myList'
    ])
  },
  methods: {
    ...mapMutations([
      'changeEventIn',
      'changeEventOut'
    ])
    // selectMusic (index) {
    //   this.$store.dispatch('selectMusic', index);
    // },
  }
};
</script>

<style lang="scss" scoped>
.my-music-box{
  overflow: auto;
  text-align: center;
  float: left;
  margin-left: 150px;
  height: 90vh;
}
.mylist-wrapper{
  flex-wrap: wrap;
  display: flex;
  justify-content: space-around;
}
.my-list{
  height: 200px;
}
.my-list-btn:hover{
  opacity: 1;
  transition: all 0.5s ease-in-out;
}
.my-list-btn{
  padding: 5px;
  max-width: 200px;
  max-height: 200px;
  position: relative;
  overflow: hidden;
  background: none;
  font-size: 1.6rem;
  text-align: center;
  cursor: pointer;
  border: none;
  opacity: 0.8;
}
.my-list-btn img{
  width: 100%;
  border-radius: 5px;
  height: auto;
}
.my-list-btn::after {
  border-radius: 5px;
  content: '';
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  background: rgba(0,0,0,0.2);
}
.my-list-info{
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  margin: 0;
  padding: 0;
  opacity: 0;
  transition: all 0.5s ease-in-out;
}
.my-list-title, .my-list-singger{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  color: white;
  margin-top: 2%;
}
.add_list{
  width: 200px;
  height: 200px;
}
</style>