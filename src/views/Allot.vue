<template>
  <div>

    <!--信息提示文字-->
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-s-order">委托</i>
        </el-breadcrumb-item>

        <el-breadcrumb-item>申购</el-breadcrumb-item>
      </el-breadcrumb>

    </div>


    <el-card shadow="hover" class="container">
      <el-row style="padding: 0 0%">
        <el-form label-width="80px"  size="mini">
          <el-row>
            <el-col span="6">
              <el-form-item label="客户编号">
                <el-input v-model="custno" type="text"></el-input>
              </el-form-item>
            </el-col>

            <el-col span="6">
              <el-form-item label="交易密码">
                <el-input v-model="dealpwd" type="text"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item>
            <el-button type= "danger"
                       @click="doAllot">
              买入
            </el-button>

          </el-form-item>
        </el-form>
      </el-row>



    </el-card>

  </div>
</template>

<script>
import OrderWidget from '../components/OrderWidget'
import PosiList from "../components/PostiList";
import OrderBook from "../components/OrderBook";
export default {
  name: "Allot",
  components: {
    OrderWidget,
  },
  data(){
    return {
      custno: '',
      dealpwd: '',
    }
  },
  methods:{
    doAllot(){
      alert("allot")
    }
  }
}
</script>

<style scoped>

</style>
