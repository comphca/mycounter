<template>
    <div>

        <!--信息提示文字-->
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-s-order">委托</i>
                </el-breadcrumb-item>

                <el-breadcrumb-item>买入</el-breadcrumb-item>
            </el-breadcrumb>

        </div>


        <el-card shadow="hover" class="container">
            <!--委托组件-->

            <!--订单薄组件-->

            <el-row>

                <!--委托组件-->

                <!--订单薄组件-->
                <el-col :span="12">
                    <!--direction 属性一定要加冒号，不然没法传递-->
                    <order-widget :direction="0" />
                </el-col>

                <el-col :span="12">

                    <order-book></order-book>

                </el-col>
            </el-row>




            <!--资金持仓的组件-->
            <posi-list></posi-list>
        </el-card>

    </div>
</template>

<script>

    import PosiList from '../components/PostiList'
    import OrderWidget from '../components/OrderWidget'
    import OrderBook from '../components/OrderBook'

    export default {
        name: "buy",
        components: {
            PosiList,
            OrderWidget,
            OrderBook,
        }
    }
</script>

<style scoped>

</style>