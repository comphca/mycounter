<template>
  <div>

    <!--搜索条件栏-->
    <div class="handle-box">
      <el-row>
        <!--自动提示框：通用组件应该抽象出来-->
        <el-col :span="4">
          <code-input></code-input>
        </el-col>


        <!--日期选择器-->
        <!--div里的style为了和前面的自动提示框保持一定的距离 靠左浮动，靠左的间隔10个像素-->
        <div style="float: left; margin-left: 10px">
          <el-date-picker
              size="small"
              type="date"
              placeholder="选择日期"
              value-format="yyyyMMdd"

              v-model="query.startDate"
          /> -


          <el-date-picker
              size="small"
              type="date"
              placeholder="选择日期"
              value-format="yyyyMMdd"

              v-model="query.endDate"
          />
        </div>


        <!--搜索按钮-->
        <el-button style="float: left;margin-left: 10px"
                   size="small"
                   type="primary" icon="el-icon-search"
                   @click="handleSearch">
          搜索
        </el-button>

      </el-row>

    </div>


    <!--历史委托查询结果-->
    <el-table
        :data="
                tableData.slice
                (
            (query.currentPage - 1) * query.pageSize,
            query.currentPage * query.pageSize
            )"
        @sort-change="changeTableSort"
        border
        :cell-style="cellStyle">

      <!--label:标头的提示信息，这一列显示的是什么数据  align：对齐方式  prop：显示当前对象的哪个字段-->
      <el-table-column prop="date" label="委托日期" align="center"
                       sortable :sort-orders="['ascending','descending']"/>   <!--实现可排序-->
      <el-table-column prop="time" label="委托时间" align="center"/>   <!--实现可排序-->
      <el-table-column prop="code" label="股票代码" align="center"/>
      <el-table-column prop="name" label="名称" align="center"/>
      <el-table-column prop="price" label="委托价格" align="center"/>
      <el-table-column prop="ocount" label="委托数量" align="center"/>
      <el-table-column prop="status" label="状态" align="center"/>

    </el-table>


    <!--分页控件-->
    <div class="pagination">
      <!--分页控件  total：当前表格一共有多少记录；prev：上一页；pager：翻页控件；next：下一页-->
      <!--分页控件  :current-page：当前所在页；page-size：上一页、下一个的控件显示或者不显示（可用或者不可用）；total：上面total的值显示的变量-->
      <el-pagination
          background
          layout="total,prev,pager,next"
          :current-page="query.currentPage"
          :page-size="query.pageSize"
          :total="pageTotal"
          @current-change="handlePageChange">   <!--分页控件在处理点击分页按钮时的函数 能够点击第二页跳转到第二页-->
        <!--上面引号内的都和下面的具体变量进行了绑定-->

      </el-pagination>
    </div>

  </div>

</template>

<script>

import CodeInput from './CodeInput'

export default {
  name: "his-order-list",
  components: {
    CodeInput,
  },

  data(){
    return {
      tableData: [
        {
          date: '20200105',
          time: '14:00:01',
          code: 600000,
          name: '浦发银行',
          price: 10,
          ocount: 100,
          status: 1
        },
        {
          date: '20200101',
          time: '14:00:02',
          code: 600000,
          name: '浦发银行',
          price: 11,
          ocount: 100,
          status: 1
        },
        {
          date: '20200103',
          time: '14:00:03',
          code: 600000,
          name: '浦发银行',
          price: 12,
          ocount: 100,
          status: 1
        },
        {
          date: '20200111',
          time: '14:00:04',
          code: 600000,
          name: '浦发银行',
          price: 13,
          ocount: 100,
          status: 1
        },
      ],
      query: {
        currentPage: 1,  //当前页码
        pageSize: 3,   //每页的数据条数
        code: '',
        startDate: '',
        endDate: '',
      },
      pageTotal: 4,
    }
  },

  methods:{
    //定义一些变量保存搜索的条件
    updateSelectedCode(item){
      //把用户选择的内容保存到当前查询的变量中，不需要重绘，这里就简单赋值
      this.query.code = item.code;
    },

    handleSearch(){

    },
    cellStyle({row,column,rowIndex,columnIndex}){
      return "padding:2px";

    },
    changeTableSort(column){              //全局排序
      let fieldName = column.prop;
      let sortinngType = column.order;

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
    },
    handlePageChange(val){
      //this.query.currentPage = val;  //这种写法错的，不能出发vue重绘
      this.$set(this.query,'currentPage',val);  //把val的值赋给currentPage，并通知vue重绘页面
    },
  },

  //因为自动提示会再总线上丢一个消息，历史委托需要这个消息，这边进行监听
  //codeinput-selected:消息id，后面的自定义的函数
  created(){
    this.$bus.on("codeinput-selected",this.updateSelectedCode);
  },
  //有监听就要有取消监听
  beforeDestroy(){
    this.$bus.off("codeinput-selected",this.updateSelectedCode)

  },

}
</script>

<style scoped>

</style>
