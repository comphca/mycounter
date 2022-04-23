<template>
    <!--订单簿组件，用于buy/sell-->

    <div>

        <!--订单簿窗口-->
        <el-form label-width="80px">
            <!--行情时间-->
            <el-form-item>
                <h4 style="color: #8c939d">
                    行情时间：{{hqtime}}
                </h4>
            </el-form-item>





            <!--五档行情-->
            <!--买卖的数据存放在一个数组中，先定义一个数组-->
            <el-form-item>

              <el-row>

                <div id="demo" style="width: 600px;height:400px;">
                  <el-col :span="6"></el-col>
                </div>
              </el-row>
                <!--卖-->
                <div class="orderBook">
                    <el-row v-for="item in sell" :key="item.name">
                      <!-------->



                      <!-------->


                        <!--档位名称-->
                        <el-col :span="6">{{item.name}}</el-col>
                        <!--价格-->
                        <el-col :span="6">{{item.price | filterempty}}</el-col>
                        <!--长度-->
                        <el-col :span="6">
                            <div class="volumeratio">
                                <div class="sell" v-bind:style="
                                            {width:item.width + '%'}">

                                </div>
                            </div>
                        </el-col>
                        <!--量-->
                        <!--特殊处理，如果某个股票的交易不活跃，那么可能存在有的档位价格是空的，所以要用一个短横杠填充，这里用到过滤器-->
                        <!--item.volume 会经过 filterempty 函数再显示-->
                        <el-col :span="6">{{item.volume | filterempty}}</el-col>
                    </el-row>

                </div>


                <!--买-->
                <div class="orderBook">
                    <el-row v-for="item in buy" :key="item.name">
                        <!--档位名称-->
                        <el-col :span="6">{{item.name}}</el-col>
                        <!--价格-->
                        <el-col :span="6">{{item.price | filterempty}}</el-col>
                        <!--长度-->
                        <el-col :span="6">
                            <div class="volumeratio">
                                <div class="buy" v-bind:style="
                                            {width:item.width + '%'}">

                                </div>
                            </div>
                        </el-col>
                        <!--量-->
                        <!--特殊处理，如果某个股票的交易不活跃，那么可能存在有的档位价格是空的，所以要用一个短横杠填充，这里用到过滤器-->
                        <!--item.volume 会经过 filterempty 函数再显示-->
                        <el-col :span="6">{{item.volume | filterempty}}</el-col>
                    </el-row>

                </div>
            </el-form-item>
        </el-form>










    </div>
</template>

<script>
import * as echarts from  'echarts';
import {queryFundMarket} from '../api/orderApi'
    export default {
        name: "order-book",
        filters:{
            filterempty(value){
                if (value === -1){
                    return '-';
                }else {
                    return value;
                }

            }
        },
      methods:{
          getEchars(code,msg,data){
            console.log("-----------------------")
            console.log(data)
            /*根据组件传递过来的基金代码发送请求获取行情信息*/
            var xData = []
            var yData = []

            for (let i = 0; i < data.data.length; i++) {
              xData.push(data.data[i].vc_date)
            }
            for (let i = 0; i < data.data.length; i++) {
              yData.push(data.data[i].en_nav)
            }

            var myChart = echarts.init(document.getElementById('demo'));
            myChart.setOption({
              title: {
                text: '最近5天行情净值'
              },
              tooltip: {},
              xAxis: {
                data: xData
                    //['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
              },
              yAxis: {},
              series: [
                {
                  name: '销量',
                  type: 'line',
                  smooth: true,
                  data: yData//[5, 20, 36, 10, 10, 20]
                }
              ]
            });
          },
          getFundMarketByCode(item){
              queryFundMarket({code : item.code},this.getEchars);
          }
      },
      created(){
        this.$bus.on("codeinput-selected",this.getFundMarketByCode)
      },
      beforeDestroy(){
        this.$bus.off("codeinput-selected",this.getFundMarketByCode)
      },
      // mounted() {
      //   this.getEchars();
      // },
      data(){
            return{
                hqtime: '--:--:--',
              myCharts,


                // sell: [
                //     //name:档位名称；price：档位价格；volume：档位数量；width：档位进度条
                //     {
                //         name: "卖五",
                //         price: -1,
                //         volume: -1,
                //         width: 1,
                //     },
                //     {
                //         name: "卖四",
                //         price: -1,
                //         volume: -1,
                //         width: 1,
                //     },
                //     {
                //         name: "卖三",
                //         price: -1,
                //         volume: -1,
                //         width: 1,
                //     },
                //     {
                //         name: "卖二",
                //         price: -1,
                //         volume: -1,
                //         width: 1,
                //     },
                //     {
                //         name: "卖一",
                //         price: -1,
                //         volume: -1,
                //         width: 1,
                //     }
                // ],
                // buy: [
                //     {
                //         name: "买一",
                //         price: -1,
                //         volume: -1,
                //         width: 1,
                //     },
                //     {
                //         name: "买二",
                //         price: -1,
                //         volume: -1,
                //         width: 1,
                //     },
                //     {
                //         name: "买三",
                //         price: -1,
                //         volume: -1,
                //         width: 1,
                //     },
                //     {
                //         name: "买四",
                //         price: -1,
                //         volume: -1,
                //         width: 1,
                //     },
                //     {
                //         name: "买五",
                //         price: -1,
                //         volume: -1,
                //         width: 1,
                //     },
                // ],

            }
        }
    }
</script>

<style lang="scss" scoped>
    .orderBook {
        border: 1px solid #909399;;
        margin-left: 5%;
        margin-right: 5%;

        .el-row {
            .el-col {
                height: 35px;
                line-height: 35px;
            }
        }

        .volumeratio {
            margin: 10px auto;
            border: none;

            .sell {
                height: 10px;
                background: #67C23A;
            }

            .buy {
                height: 10px;
                background: #F56C6C;
            }
        }
    }
</style>
