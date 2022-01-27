<template>
  <div>
    <!--信息提示文字-->
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-baseball">资金股份</i>
        </el-breadcrumb-item>
      </el-breadcrumb>

    </div>


    <!--自进持仓-->
    <el-card class="container">
      <!--3.使用资金持仓的组件-->
      <posi-list></posi-list>
    </el-card>
  </div>
</template>

<script>
//1.引入资金持仓的组件
  import PosiList from "../components/PostiList"
  export default {
    name: "Dashboard",
    components: {
      PosiList,     //2.声明组件
    }
  }
</script>

<style scoped>

</style>
