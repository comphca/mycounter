<template>
  <div class="home">
    <!--3.这里使用组件的办法有很多  <vHeader/> 等同于 <v-header></v-header>-->
    <v-header></v-header>
    <v-sidebar></v-sidebar>
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

}
</script>
