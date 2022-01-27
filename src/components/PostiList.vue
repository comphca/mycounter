<template>
  <div>


    <!--可用资金-->
    <el-row>
      <el-col :span="5">
        可用资金:{{balance}}
      </el-col>
    </el-row>

    <!--持仓列表 表格-->
    <!--table有几个属性 data数据源；border展示属性-->
    <!--数据源要进行划分才能在按照每页多少    完成分页后排序就会在当前页的数据排序不是全部数据，要对全部数据排序就要加一个sort-change事件-->
    <el-table
        :data="tableData.slice(
            (query.currentPage - 1) * query.pageSize,
            query.currentPage * query.pageSize
            )"
        @sort-change="changeTableSort"
        border
        :cell-style="cellStyle">   <!--cell-style属性可以定制单元格的属性，要一个函数写在最下面，这里先控制了padding属性，让单元格紧凑一点-->
      <el-table-column prop="code" label="代码" align="center"
                       sortable :sort-orders="['ascending','descending']"
                       />   <!--实现可排序-->
      <el-table-column prop="name" label="名称" align="center"/>
      <el-table-column prop="count" label="股票数量" align="center"/>
      <el-table-column prop="cost" label="总投入" align="center"
                       />
      <el-table-column prop="成本" align="center"
                      />
    </el-table>


    <!--分页控件 刷新按钮-->
    <div class="pagination">
      <el-button round
                 type="primary"
                 size="mini"
                 style="margin-top: 2px;float: right"
                 icon="el-icon-refresh"
                 @click="queryRefresh">
        刷新
      </el-button>

      <!--分页控件  total：当前表格一共有多少记录；prev：上一页；pager：翻页控件；next：下一页-->
      <!--分页控件  :current-page：当前所在页；page-size：上一页、下一个的控件显示或者不显示（可用或者不可用）；total：上面total的值显示的变量-->
      <el-pagination
          background
          layout="total,prev,pager,next"
          :current-page="query.currentPage"
          :page-size="query.pageSize"
          :total="dataTotalCount"
          @current-change="handlePageChange">   <!--分页控件在处理点击分页按钮时的函数 能够点击第二页跳转到第二页-->
        <!--上面引号内的都和下面的具体变量进行了绑定-->

      </el-pagination>
    </div>
  </div>
</template>

<script>
/*import {constants} from '../api/constants'
import {codeFormat, moneyFormat} from '../api/formatter'
import {queryPosi,queryBalance} from '../api/orderApi'*/
export default {
  name: "posti-list",
/*  created() {
    this.tableData = this.posiData;
    this.balance = this.balanceData;
  },*/
  //对vuwx中的数据进行监听需要使用computed的watched两个
/*  computed: {*/
    //把  this.$store.state.posiData  映射到   posiData()  中
    //vuex中变量发生变化的时候，posiData()和下面一个计算属性就会发生变化，计算属性变化watch中的函数就会执行
/*    posiData(){
      return this.$store.state.posiData;
    },
    balanceData(){
      return this.$store.state.balance;
    },
  },*/
/*  watch: {
    posiData: function (val){
      this.tableData = val;
      this.dataTotalCount = val.length;
    },
    balanceData: function (val){
      this.balance = val;
    },
  },*/
  //对vuwx中的数据进行监听需要使用computed的watched两个
  data(){
    return {
      //声明的这个变量就是绑定到持仓列表的数据源上的
      tableData: [
        {code: '600025', name: '华能水电', count: 100, cast: 20},
        {code: '600000', name: '浦发银行', count: 100, cast: 20},
        {code: '600001', name: '平安银行', count: 100, cast: 20},
        {code: '600886', name: '国投电力', count: 100, cast: 20},

      ],
      balance: 10,

      dataTotalCount: 4,  //总记录数
      query: {
        currentPage: 1,  //当前页码
        pageSize: 2      //每页的记录数
      }
    }
  },
  methods:{
/*    queryRefresh(){
      queryPosi();
      queryBalance();
    },
    costFormatter(row, column) {
      return (row.cost / constants.MULTI_FACTOR /
          row.count).toFixed(2);
    },
    moneyFormatter(row, column) {
      return moneyFormat(row.cost);
    },
    codeFormatter(row, column) {
      return codeFormat(row.code);
    },*/

    //cellStyle函数有四个参数，单元格所在的行、单元格所在的列、行下标、列下标
    cellStyle({row,column,rowIndex,columnIndex}){
      return "padding:2px";

    },
    handlePageChange(val){
      //this.query.currentPage = val;  //这种写法错的，不能出发vue重绘
      this.$set(this.query,'currentPage',val);  //把val的值赋给currentPage，并通知vue重绘页面
    },
    changeTableSort(column){              //全局排序
      if (column.order == "descending"){
        this.tableData = this.tableData.sort(
            (a,b) => b[column.prop] - a[column.prop]
        );
      }else {
        this.tableData = this.tableData.sort(
            (a,b) => a[column.prop] - b[column.prop]
        );
      }
    }
  }
}
</script>

<style scoped>

</style>
