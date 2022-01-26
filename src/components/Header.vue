<template>
  <!---->
  <div class="header">
    <!--折叠按钮-->
    <div class="collapse-btn" @click="collapseChange">
      <i v-if="!collapse" class="el-icon-s-fold"></i>
      <i v-else class="el-icon-s-unfold"></i>
    </div>

    <!--LOGO-->
    <div class="logo">证券交易系统</div>


    <!--用户信息 + 下拉菜单-->
    <div class="header-right">
      <div class="header-user-con">
        <el-dropdown class="user-name" trigger="click"
                     @command="handleCommand" >                          <!--@command 绑定下来菜单的触发函数，下面在退出登录上用 command绑定一个标志-->
          <span class="el-dropdown-link">
                        {{username}}                                  <!--这里下拉菜单中是登录用户名，配后后端，这里是个变量，所以在下面script定义了-->
                        <i class="el-icon-caret-bottom"/>
                    </span>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>   <!--这里加一个command 属性可以选定单击触发-->
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "header",
  data(){
    return{
      //username: '',  //写死guest
      collapse : true,
    }
  },
  computed:{
    username(){
      let acco = sessionStorage.getItem("uid");
      return acco ? acco:'guest';
    }
  },
  methods: {
    //下拉菜单事件响应
    handleCommand(command){
      if(command == 'logout'){
        logout();
      }
    },
    collapseChange(){
      this.collapse = !this.collapse;
      this.$bus.emit("collapse",this.collapse);  //往总线上丢一个消息，告诉总线当前的状态是打开的还是折叠的  接受这个消息的有侧边导航栏和主空白页面
    }
  }
}
</script>

<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
}

.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}

.header .logo {
  float: left;
  width: 250px;
  line-height: 70px;
}

.header-right {
  float: right;
  padding-right: 50px;
}

.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}

.btn-bell .el-icon-bell {
  color: #fff;
}

.user-name {
  margin-left: 10px;
}

.user-avator {
  margin-left: 20px;
}

.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}

.el-dropdown-menu__item {
  text-align: center;
}
</style>
