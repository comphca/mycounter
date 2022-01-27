<template>
  <div>
    <!--信息提示文字-->
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-s-order">查询</i>
        </el-breadcrumb-item>

        <el-breadcrumb-item>历史委托</el-breadcrumb-item>
      </el-breadcrumb>

    </div>

    <el-card shadow="hover" class="container">
      <his-order-list></his-order-list>
    </el-card>

  </div>

</template>

<script>

//1.引入组件
import HisOrderList from '../components/HisOrderList'

export default {
  components: {HisOrderList},  //2.声明组件
  name: "his-order-query",

}
</script>

<style scoped>

</style>
