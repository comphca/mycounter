<template>
  <div>
    <!--信息提示文字-->
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-baseball">资金存入</i>
        </el-breadcrumb-item>
      </el-breadcrumb>

    </div>

    <el-card shadow="hover" class="container">
      <el-row style="padding: 0 15%;">
        <el-form label-width="80px">
          <!--转账方式-->
          <el-form-item label="转账方式">
            <el-select style="width: 100%" v-model="type">  <!--这里关联最后的选中项和一个变量  type-->
              <el-option v-for="item in form.type"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id"/>   <!--这里关联的是每一个下拉选项-->
            </el-select>
          </el-form-item>

          <!--银行-->
          <el-form-item label="选择银行">
            <el-select style="width: 100%" v-model="bank">  <!--这里关联最后的选中项和一个变量  type-->
              <el-option v-for="item in form.bank"
                         :key="item.id"
                         :label="item.name"
                         :value="item.name"/>   <!--这里关联的是每一个下拉选项 key代表下拉选项的索引，label表示显示在下拉选项的内容，value表示选中这个选项的时候传到绑定的最终选定的变量值中-->
            </el-select>
          </el-form-item>


          <!--银行密码-->
          <!--el-input有个特性在el-form-item下面是默认占100%的顶格显示，所以要调整select-->
          <el-form-item label="交易密码">
            <!--password 外面的单引号表示这个值是一个变量而不是一个字符串-->
            <el-input :type="'password'" v-model="form.password"/>
          </el-form-item>


          <!--选择币种-->
          <el-form-item label="选择币种">
            <el-select style="width: 100%" v-model="moneytype">  <!--这里关联最后的选中项和一个变量  type-->
              <el-option v-for="item in form.moneytype"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id"/>   <!--这里关联的是每一个下拉选项 key代表下拉选项的索引，label表示显示在下拉选项的内容，value表示选中这个选项的时候传到绑定的最终选定的变量值中-->
            </el-select>
          </el-form-item>


          <!--金额-->
          <el-form-item label="金额">
            <!--password 外面的单引号表示这个值是一个变量而不是一个字符串-->
            <el-input v-model="form.money"/>
          </el-form-item>

          <el-form-item>
            <el-button style="float: right" size="small" type="primary">转账</el-button>
          </el-form-item>


        </el-form>
      </el-row>
    </el-card>

  </div>
</template>

<script>
import ElCard from "element-ui/packages/card/src/main";
import ElRow from "element-ui/packages/row/src/row";

export default {
  components: {
    ElRow,
    ElCard},
  name: "transfer",
  data() {
    return {
      form: {
        type: [{id: 1,name: '银行转证券（转入）'},{id: 0, name: '证券转银行（转出）'}],
        bank: [{id: 0,name: '招商银行'},{id: 1, name: '建设银行'}],
        password: '',
        moneytype: [{id: 0,name: '人民币'},{id: 1, name: '美元'}],
        money: 0,
      },

      type: 0,   //前面下拉菜单最后的选中项关联的变量，给个默认值
      bank: '招商银行',
      moneytype: 0,
    }
  }
}
</script>

<style scoped>

</style>
