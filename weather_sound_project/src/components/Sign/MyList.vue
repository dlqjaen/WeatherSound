<template lang="pug">
  section.my-music-box
    h2.a11y-hidden(tabindex="0") My Music List
    ul.mylist-wrapper
      li.my-list(v-for="(list, index) in myList")
        button.my-list-btn(type='button', aria-label="list.name_playlist" @mouseenter="changeEventIn" @mouseleave="changeEventOut" @click="enterDetailMyList(list)")
          p.my-list-info
            span.my-list-title {{list.name_playlist}}
          img(:src='list.default', :alt='list.name_playlist + "대표이미지"')
        button.list-delete-btn(type='button', aria-label="리스트 삭제버튼" @click="listDeleteBtn(list.playlist_id)")
          <i class="fa fa-times" aria-hidden="true"></i>
      li.my-list
        .add_list(id="add_list" aria-label="리스트 추가")
          button.plus-btn(type="button" @click="showMakeModal" v-if="!activeCreateBtn" title="리스트 추가 입력창으로 전환 버튼" aria-label="리스트 추가 입력창으로 전환 버튼")
            i.fa.fa-plus(aria-hidden='true')
          .create-box(v-if="activeCreateBtn")
            input.input-list-name(type="text" aria-label="새로만들 리스트이름 입력창" @input="inputListName" placeholder="생성할 리스트 이름" :value="getListName")
            .btn-box
              button.agree-btn(type="submit" title="리스트 추가 버튼" aria-label="리스트 추가 버튼" @click.prevent="myListGet")
                <i class="fa fa-check" aria-hidden="true"></i>
              button.cancel-btn(type="button" title="리스트 추가를 취소하는 버튼" aria-label="리스트 추가를 취소하는 버튼" @click="showMakeModal")
                <i class="fa fa-times" aria-hidden="true"></i>

</template>
  
<script>
import {mapGetters, mapMutations, mapActions} from 'vuex';
export default {
  name: 'MyList',
  computed: {
    ...mapGetters([
      'myList',
      'getListName',
      'activeCreateBtn'
    ])
  },
  methods: {
    ...mapMutations([
      'changeEventIn',
      'changeEventOut',
      'showMakeModal',
      'inputListName',
      'createList'
    ]),
    ...mapActions([
      'myListGet',
      'listDeleteBtn',
      'enterDetailMyList'
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
  padding: 10px;
  flex-wrap: wrap;
  display: flex;
  justify-content: space-around;
}
.my-list{
  position: relative;
  margin: 5px;
}
.my-list-btn:hover{
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}
.my-list-btn{
  padding: 5px;
  width: 200px;
  height: 200px;
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
.my-list-title{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  color: white;
  margin-top: 2%;
}
.add_list{
  box-sizing: border-box;
  border-radius: 5px;
  width: 190px;
  height: 190px;
  position: relative;
  background: rgba(0,0,0,0.5);
  margin-top: 5px;
  padding: 5px;
  font-size: 1.6rem;
  text-align: center;
}
.plus-btn{
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 50%;
  transform: translateY(-50%);
  transition: all 0.5s ease-in-out;
  color: white;
  font-size: 5rem;
  transition: transform 0.5s ease-in-out;
}
.plus-btn:hover{
  color: rgb(59, 153, 252);
  transform: translateY(-50%) rotate(90deg);
}
.input-list-name{
  width: 70%;
  height: 40px;
  border: 1px solid rgba(255,255,255,0.5);
  text-align: center;
  background: none;
  border-radius: 5px;
  color: white;
  transition: all 0.5s ease-in-out;
  font-size: 1.4rem;
}
.create-box{
  margin-top: 50%;
  transform: translateY(-50%);
}
.agree-btn, .cancel-btn {
  margin-top: 20px;
  cursor: pointer;
  color: white;
  background: none;
  border: none;
  font-size: 2rem;
  padding: 10px;
}
.agree-btn{
  margin-right: 40px;
}
.list-delete-btn{
  padding: 5px;
  background: none;
  border: none;
  font-size: 2rem;
  position: absolute;
  right: 10px;
  top: 5px;
  color: white;
  transition: all 0.2s ease-in-out;
}
.list-delete-btn:hover {
  transform: rotate(90deg);
  color: rgb(0, 0, 0);
}
</style>