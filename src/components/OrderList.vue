<template>
  <div>
    <!--委托表格-->
    <!--委托时间  股票代码  名称   委托价格  委托数量  方向  状态-->
    <el-table
        :data="tableData.slice(
            (query.currentPage - 1) * query.pageSize,
            query.currentPage * query.pageSize
            )"
        @sort-change="changeTableSort"
        :default-sort="{prop:'time',order:'descending'}"
        border
        :cell-style="cellStyle">   <!--cell-style属性可以定制单元格的属性，要一个函数写在最下面，这里先控制了padding属性，让单元格紧凑一点-->

      <!--label:标头的提示信息，这一列显示的是什么数据  align：对齐方式  prop：显示当前对象的哪个字段-->
      <el-table-column prop="time" label="委托时间" align="center"
                       sortable :sort-orders="['ascending','descending']"/>   <!--实现可排序-->
      <el-table-column prop="code" label="股票代码" align="center"/>
      <el-table-column prop="name" label="名称" align="center"/>
      <el-table-column prop="price" label="委托价格" align="center"/>
      <el-table-column prop="ocount" label="委托数量" align="center"/>
      <el-table-column prop="direction" label="方向" align="center"/>
      <el-table-column prop="status" label="状态" align="center"/>
    </el-table>


    <!--分页控件  刷新-->
    <div class="pagination">
      <el-button round
                 type="primary"
                 size="mini"
                 style="margin-top: 2px;float: right"
                 icon="el-icon-refresh"
                 @click="">
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
export default {
  name: "order-list",
  data(){
    return {
      //声明的这个变量就是绑定到持仓列表的数据源上的
      tableData: [
        {
          time: '09:55:00',
          code: '000001',
          name: '平安银行',
          price: 100,
          ocount: 10,
          direction: '买入',
          status: 3
        },
        {
          time: '09:50:00',
          code: '000001',
          name: '平安银行',
          price: 100,
          ocount: 10,
          direction: '买入',
          status: 1
        },
        {
          time: '09:40:00',
          code: '000001',
          name: '平安银行',
          price: 100,
          ocount: 10,
          direction: '买入',
          status: 3
        }
      ],

      dataTotalCount: 3,  //总记录数
      query: {
        currentPage: 1,  //当前页码
        pageSize: 2      //每页的记录数
      }
    }
  },
  methods:{
    //cellStyle函数有四个参数，单元格所在的行、单元格所在的列、行下标、列下标
    cellStyle({row,column,rowIndex,columnIndex}){
      return "padding:2px";

    },
    handlePageChange(val){
      //this.query.currentPage = val;  //这种写法错的，不能出发vue重绘
      this.$set(this.query,'currentPage',val);  //把val的值赋给currentPage，并通知vue重绘页面
    },
    changeTableSort(column){              //全局排序
      let fieldName = column.prop;
      let sortinngType = column.order;
      if (fieldName == 'time'){
        if (sortinngType == "descending"){
          this.tableData = this.tableData.sort(
              (a,b) => {if (b[fieldName] > a[fieldName]){
                return 1;
              }else if (b[fieldName] === a[fieldName]){
                return 0;
              }else {
                return -1;
              }
              }
          );
        }else {
          this.tableData = this.tableData.sort(
              (a,b) => {if (b[fieldName] > a[fieldName]){
                return -1;
              }else if (b[fieldName] === a[fieldName]){
                return 0;
              }else {
                return 1;
              }
              }
          );
        }
      }

    }
  }
}
</script>

<style scoped>

</style>
