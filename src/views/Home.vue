<template>
  <div class="home">
    <!--3.这里使用组件的办法有很多  <vHeader/> 等同于 <v-header></v-header>-->
    <v-header></v-header>
    <v-sidebar></v-sidebar>



    <!--主页面业务-->
    <!--这个地方使用导入组件使用组件就有问题  -->
    <!--后面的class的意思是如果collaspe为true的时候就加入content-collapse的class的属性，可查找main.css文件-->
    <div class="content-box" :class="{'content-collapse':collapse}">
      <div class="content">
        <transition name="move" mode="out-in">
          <router-view></router-view>
        </transition>

      </div>
    </div>
  </div>



</template>

<script>

//1.导入组件
import vHeader from '../components/Header.vue'
import vSidebar from '../components/Sidebar.vue'

export default {
  name: 'Home',
  //2.导入组件后对应的声明
  components: {
    vHeader,
    vSidebar,
  },
  /*主页面声明变量保存折叠状态*/
  data(){
    return {
      collapse: false,
    }
  },
  created() {
    this.$bus.on("collapse-content",msg => {
      this.collapse = msg;
    })
  },
  beforeDestroy() {
    this.$bus.off("collapse-content", msg => {
      this.collapse = msg;
    })
  }

}
</script>
