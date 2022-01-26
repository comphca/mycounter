<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu"
             background-color="#324157"
             text-color="#bfcbd9"
             active-text-color="#20a0ff"

             unique-opened
             router
             :collapse="collapse"
             :default-active="onRoutes"
    >
      <template v-for="item in items">
        <!--有子节点 下拉菜单-->
        <template v-if="item.subs">
          <!--子菜单-->
          <el-submenu :index="item.index" :key="item.index">
            <!--提示项-->
            <template slot="title">
              <i :class="item.icon"/>
              <span slot="title">{{item.title}}</span>
            </template>

            <template v-for="subItem in item.subs">
              <el-menu-item :index="subItem.index" :key="subItem.index">
                {{subItem.title}}
              </el-menu-item>

            </template>
          </el-submenu>
        </template>

        <!--没有子节点 普通的item-->
        <template v-else>
          <el-menu-item :index="item.index" :key="item">
            <i :class="item.icon"/>

            <span slot="title">{{item.title}}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>

</template>

<script>
export default {
  name: "sidebar",
  data() {
    return{
      collapse: false,
      //列出导航栏的选项
      items: [
        {
          icon: 'el-icon-s-custom',
          index: 'account',
          title: '开户'
        },
        {
          icon: 'el-icon-pie-chart',
          index: 'dashboard',
          title: '资金股份'
        },
        {
          icon: 'el-icon-s-order',
          index: 'buy',
          title: '买入'
        },
        {
          icon: 'el-icon-sell',
          index: 'sell',
          title: '卖出'
        },
        {
          icon: 'el-icon-search',
          index: 'search',
          title: '查询',
          subs: [
            {
              index: 'orderquery',
              title: '当日委托'
            },
            {
              index: 'tradequery',
              title: '当日成交'
            },
            {
              index: 'hisorderquery',
              title: '历史委托'
            },
            {
              index: 'histradequery',
              title: '历史成交'
            },
          ]
        },

        {
          icon: 'el-icon-bank-card',
          index: '4',
          title: '银证业务',
          subs: [
            {
              index: 'transfer',
              title: '银证转账'
            },
            {
              index: 'transferquery',
              title: '转账查询'
            },
          ]
        },
        {
          icon: 'el-icon-setting',
          index: 'pwdsetting',
          title: '修改密码'
        },


      ]
    }
  },
  computed: {
    //http://localhost:8080/dashboard  对于这个url，onRoutes这个值即使dashboard
    onRoutes(){   //变量就是当前url绑定的，当url发生变化，导致这个变量发生变化，就导致导航栏选中的发生了变化
      return this.$route.path.replace('/','')
    },
  },

  methods: {
    collapseChange(msg){
      this.collapse = msg;
      this.$bus.emit("collapse-content",msg);
    }
  },
  created(){
    //订阅collapse消息
    this.$bus.on("collapse",msg => {
      this.collapseChange(msg);  //collapse-content  防止有歧义，这个与原来区分
    });
  },
  beforeDestroy(){
    //取消订阅
    this.$bus.off("collapse",msg => {
      this.collapseChange(msg);

    });
  }
}
</script>

<style lang="scss" >
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;


  .el-menu-item {
    min-width: 150px;
  }

  li {
    text-align: left;
    .el-tooltip {
      width: auto ! important;
    }
  }

  /*下拉导航菜单多出1px*/
  .el-menu {
    border-right-width: 0;
  }

  .el-menu--collapse{
    width: auto ! important;
  }
}

.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: 150px;
}

.sidebar > ul {
  height: 100%;
}




</style>
