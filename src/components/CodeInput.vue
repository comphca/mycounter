<template>
  <!--自动提示框组件-->

  <div>
    <!--v-model:定义一个变量和用户当前填入/选中进行绑定，用户选择的内容;
    fetch-suggestions根据用户输入的部分检索，提示可能是哪些；
    trigger-on-focus当焦点在这个提示框时是否立即触发搜索；
    debounce防抖动，不能在用户每输入一个字符就搜索，应该在输入一段时间再搜索，停顿100毫秒；
    select 是el-autocomplete发出来的消息，要自定义一个函数接收updateInput
    -->
    <el-autocomplete style="width: 100%" size="small" placeholder="代码/简称"
                     v-model="state"
                     :fetch-suggestions="querySearchAsync"
                     :trigger-on-focus="false"
                     :debounce=100
                     @select="updateInput">

    </el-autocomplete>
  </div>

</template>

<script>
/*import {queryCodeName} from '../api/orderApi'*/
export default {
  name: "code-input",
  data(){
    return {
      state: '',
    }
  },
  methods: {
    //参数两个值，queryString：根据用户输入的值进行联想可能是什么值，然后放到下拉菜单里面；callback：回调函数，放入下拉框的动作
    querySearchAsync(queryString,callback){
      //从后台查询数据
      let list = [{}];
      //通知自动提示框要显示哪几项内容
      queryCodeName({
        key: queryString
      }).then(res => {
        console.log('倒排列表');
        console.log(res.data.status);
        if (res.data.status != 0){
          this.$router.replace({
            path: "login",
            query: {
              msg: result.message
            }
          });
        }else{
          console.log('成功');
          console.log(res.data.status);
          let resData = res.data.data;
          for (let i of resData){
            i.value = ('000000' + i.code).slice(-6) + '--' + i.name;
          }
          list = resData;
          //通知自动提示框显示哪几项
          callback(list);
        }
      })
      //callback(list)

    },

    //入参一个，item就是用户再弹出的提示中选中了哪一个
    updateInput(item){
      //code是int类型，单纯的赋值this.state = item.code 就会把右边的0全部丢弃
      this.state = ('000000' + item.code).slice(-6);

      //把选中的值包装成一个消息丢到总线上去，让有需要的组件自己获取
      //codeinput-selected：消息id；item：消息内容
      this.$bus.emit("codeinput-selected",item)

    }
  }
}
</script>

<style lang="scss">
.wide-dropdown {
  width: 600px !important;
}
</style>
