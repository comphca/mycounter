<template>
    <!--委托组件-->

    <div class="orderForm">
        <el-form label-width="80px">

            <!--股票信息自动提示框-->

            <!--证券代码-->

            <!--证券名称-->

            <!--价格-->

            <!--量-->

            <!--按钮-->

            <el-form-item>
                <!--委托组件分为：1.买入；2.卖出
                组件自己不知道自己是买入还是卖出，这里需要引用当前组件的父组件传递-->
                <h3 :style="direction === 0 ? 'color:#F56C6C' : 'color:#67C23A' ">
                    {{direction === 0?'申购':'赎回'}}基金
                </h3>
            </el-form-item>

            <el-form-item label="客户编号">
              <el-input v-model="custno" @blur="enterPwd" type="text"></el-input>
            </el-form-item>

            <el-form-item label="可用资金">
              <el-input readonly v-model="canUsebalance" :disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="客户名称">
              <el-input readonly v-model="custname" :disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="证券代码">
                <code-input></code-input>
            </el-form-item>


            <el-form-item label="证券名称">
                <el-input readonly v-model="name"></el-input>
            </el-form-item>

            <!--可买卖数量的只读文本-->
            <!--:label 的意思是根据direction的值显示  可买/可卖-->
            <el-form-item :label=" '可' + (direction === 0 ? '买' : '卖') + '(股)' ">
                <el-input readonly v-model="affordCount"></el-input>
            </el-form-item>


<!--          <el-form-item :label=" (direction === 0 ? '申购' : '赎回') ">
                <el-input-number v-model="price" controls-position="right"
                                 @change="handlePrice"
                                 :step="0.01"
                                 :min="0.01"
                >


                </el-input-number>

            </el-form-item>-->



            <el-form-item :label=" (direction === 0 ? '申购' : '赎回') ">


                <el-input-number v-model="volume" controls-position="right"
                                 :max="affordCount"
                                 :min="0"
                >


                </el-input-number>

            </el-form-item>


            <el-form-item>
                <el-button :type="direction === 0 ? 'danger' : 'success' " style="float: right"
                  @click="onOrder">
                    {{direction === 0 ? '买入' : '卖出'}}
                </el-button>

            </el-form-item>

        </el-form>
        <!--股票信息自动提示框-->

        <!--证券代码-->

        <!--证券名称-->

        <!--价格-->

        <!--量-->

        <!--按钮-->

    </div>
</template>

<script>

    import CodeInput from './CodeInput';
    import {sendOrder} from "../api/orderApi";
    import {constants} from "../api/constants";
    import * as moment from 'moment';
    import {registInCustInfo,tradeLogin} from "../api/acccountApi";

    export default {
        name: "order-widget",
        data(){
            return{
                code: '',
                name:'',
                //为了第一次进到页面显示可买/可卖 显示为空，这个变量要定义为  undefined
                //为了实时显示我们可买的数量需要在金额的控件处加一个处理
                affordCount: undefined,
                price: undefined,
                volume: undefined,

                canUsebalance: '',
                custno : '',
                custname:'',
            }
        },
        props: {
            //direction:父组件传递过来买入/卖出，类型是数字；required标识父组件引用当前组件的时候不给这个变量编译就没法通过
            direction: {type: Number, required: true}
        },
        components: {
            CodeInput,
        },
        created(){
            this.$bus.on("codeinput-selected",this.updateSelectedCode)
        },
        beforeDestroy(){
            this.$bus.off("codeinput-selected",this.updateSelectedCode)
        },
        methods: {
          handlePrice() {
              if (this.direction === constants.SELL) {
                let posiArr = this.$store.state.posiData;
                for (let i = 0, len = posiArr.length; i < len; i++) {
                  if (posiArr[i].code == this.code) {
                    this.affordCount = posiArr[i].count;
                  }
                }
              } else {
                //总资金/委托价格 向下取整
                this.affordCount = parseInt(
                    (this.$store.state.balance / constants.MULTI_FACTOR)
                    / this.price
                );
              }
            },
            updateSelectedCode(item){
                this.code = item.code;
                this.name = item.name;
                this.price = undefined;
                this.volume = undefined;
            },
            handleOrderRes(code,msg,data){
                if (code === 0){
                  this.$message.success("委托送往交易所");
                } else {
                  this.$message.error("委托发送失败"+msg);
                }

            },
            //click时间直接调用api接口发送到后台，参数就是后台需要的参数
            onOrder(){
              typeof(ndesc)=="undefined" || ndesc=='' || ndesc==null
              if (typeof (sessionStorage.getItem("custno")) == "undefined" || sessionStorage.getItem("custno") == '' || sessionStorage.getItem("custno") == null){
                //如果前台缓存中取不到客户编号，认为当前未使用密码，客户编号校验，不能进行交易
                alert("请输入客户编号和密码校验");
                return;
              }
              sendOrder({uid:sessionStorage.getItem("custno"),
              type: constants.NEW_ORDER,
              timestamp: moment.now(),
              code: this.code,
              direction: this.direction,
              price: this.price * constants.MULTI_FACTOR,
              volume: this.volume,
              ordertype: constants.LIMIT
              }, //下面时调完后台的回调函数
              this.handleOrderRes)
            },
            enterPwd(){
              this.$prompt('请输入交易密码', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputType: 'password',
              }).then(({ value }) => {
                tradeLogin({
                  custno : this.custno,
                  pwd : value,
                },this.dealTradeLogin)
              });
            },
            dealTradeLogin(status, message, data){
              if (status == 0){
                console.log('--------------')
                console.log(data)
                sessionStorage.setItem("custno",this.custno);
                this.canUsebalance=data.data.balance;
                this.custname=data.data.scustName;
              }
            }
        }
    }
</script>

<style lang="scss">

    .orderForm {
        input {
            text-align: center;
        }

        .el-input-number {
            width: 100%;
        }
    }

</style>
