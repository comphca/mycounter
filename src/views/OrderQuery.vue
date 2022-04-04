<!--当日委托查询管理-->
<template>
  <div>
    <!--信息提示文字-->
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-s-order">查询</i>
        </el-breadcrumb-item>

        <el-breadcrumb-item>当日委托</el-breadcrumb-item>
      </el-breadcrumb>

    </div>

    <el-card shadow="hover" class="container">
      <order-list :isCurrentDate="true"></order-list>
    </el-card>
  </div>
</template>

<script>

import OrderList from '../components/OrderList'

export default {
  name: "order-query",
  components: {
    OrderList,
  }
}
</script>

<style scoped>

</style>
