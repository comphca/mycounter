<template>
  <div class="crumbs">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>
        <i class="el-icon-s-custom"></i> 开户
      </el-breadcrumb-item>
    </el-breadcrumb>


    <el-form :model="accountinfo">

      <!-------------------------------------------------客户信息-------------------------------------------------------------->
      <el-card shadow="hover" class="container">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="el-icon-s-custom"></i> 客户信息
          </el-breadcrumb-item>
        </el-breadcrumb>


        <el-row style="padding: 0 0%">
          <el-form label-width="100px"  size="mini">
            <el-row>
              <el-col span="8">
                <el-form-item label="客户名称">
                  <el-input v-model="custname" type="text"></el-input>
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item label="证件类型">
                  <el-select v-model="IDType" placeholder="请选择" style="width: 100%">
                    <el-option
                        v-for="item in IDTypeList"
                        :key="item.C_KEYVALUE"
                        :label="item.VC_DESCRIBE"
                        :value="item.C_KEYVALUE">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item label="证件号码">
                  <el-input v-model="identityno"></el-input>
                </el-form-item>
              </el-col>
            </el-row>


            <el-row>
              <el-col span="8">
                <el-form-item label="证件有效期">
                  <el-date-picker
                      v-model="vaildate"
                      value-format="yyyyMMdd"
                      type="date"
                      placeholder="选择日期"
                      style="width: 100%">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
<!--            <el-row>
              <el-col>
                <el-button type="primary" @click="submitForm" icon="el-icon-search">查询</el-button>
                <el-button type="warning" @click="resetForm" icon="el-icon-search" plain>重置</el-button>
              </el-col>
            </el-row>-->
          </el-form>
        </el-row>
      </el-card>


      <!-------------------------------------------------银行信息-------------------------------------------------------------->
      <el-card shadow="hover" class="container">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="el-icon-bank-card"></i> 银行信息
          </el-breadcrumb-item>
        </el-breadcrumb>


        <el-row>
          <el-form label-width="100px"  size="mini">
            <el-row>
              <el-col span="8">
                <el-form-item label="银行户名">
                  <el-input v-model="namainbank"></el-input>
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item label="银行名称">
                  <el-input v-model="bankname"></el-input>
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item label="银行账号">
                  <el-input v-model="bankacco"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!--            <el-row>
                          <el-col>
                            <el-button type="primary" @click="submitForm" icon="el-icon-search">查询</el-button>
                            <el-button type="warning" @click="resetForm" icon="el-icon-search" plain>重置</el-button>
                          </el-col>
                        </el-row>-->
          </el-form>
        </el-row>
      </el-card>

      <!--------------------------------------------联系信息------------------------------------------------->
      <el-card shadow="hover" class="container">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="el-icon-connection"></i> 联系信息
          </el-breadcrumb-item>
        </el-breadcrumb>


        <el-row>
          <el-form label-width="100px"  size="mini">
            <el-row>
              <el-col span="8">
                <el-form-item label="联系电话">
                  <el-input v-model="mobilphone"></el-input>
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item label="通讯地址">
                  <el-input v-model="address"></el-input>
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item label="电子邮件">
                  <el-input v-model="email"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col>
                <el-button type="primary" @click="submitForm" icon="el-icon-check" tyle="float: right">提交</el-button>
                <el-button type="warning" @click="resetForm" icon="el-icon-delete-solid" plain >重置</el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-row>
      </el-card>



    </el-form>







  </div>
</template>

<script>
import {getIDType, regist,registInCustInfo} from "../api/acccountApi";
import {login} from "../api/loginApi";
import axios from "axios";
import qs from 'qs';

export default {
  name: "OpenAccount",
  data(){
    return {
      value1: '',

      IDTypeList : '',

      //提交数据
      IDType : '',
      custname : '',
      vaildate:'',
      identityno:'',

      //银行信息
      namainbank :'',//银行户名
      bankname:'',//银行名称
      bankacco:'',//银行账号


      //联系信息
      mobilphone :'',//联系电话
      address:'',//地址
      email:''//邮箱

    }
  },

  methods:{
    getIDTypeFormDB() {
      getIDType({
        dicItem : '1001'
      },this.IDDicTypeCallBack);
    },
    //查询后台的字典数据之后通过回调函数绑定到界面控件上
    IDDicTypeCallBack(status,message,data) {
      console.log('查字典')
      console.log(data.data[0].VC_DESCRIBE)
      if (status == 0){
        //获取成功，将数据绑定到控件上
        this.IDTypeList = data.data
      }


      // if (status == 2) {
      //   //查询失败
      //   this.$message.error(msg);
      //   this.logining = false;
      //   this.getCode();
      // } else {
      //   //登录成功 uid token
      //   sessionStorage.setItem("uid", data.data.uid);
      //   sessionStorage.setItem("token", data.data.token);
      //   //显示上次成功登录时间
      //
      //   if (data.data.token.length > 1) {
      //     this.$message.success("登录成功,上次登录时间:"
      //         + data.data.modifydate + " " + acc.data.modifydate);
      //   } else {
      //     this.$message.success("登录成功");
      //   }
      //   //跳转主页面
      //   setTimeout(() => {
      //     this.logining = false;
      //     this.$router.push({path : '/dashboard'});
      //     //成交 委托 持仓查询
      //     //queryBalance();
      //     // queryOrder();
      //     // queryTrade();
      //     // queryPosi();
      //   }, 1000);
      //
      // }
    },

    submitForm() {
      //提交表单后先置登录按钮为true，防止重复提交
      //this.logining = true;

      //调api接口
      regist({
        //基本信息
        IDType : this.IDType,
        custName : this.custname,
        identityno : this.identityno,
        vaildate : this.vaildate,

        //银行信息
        namainbank : this.namainbank,//银行户名
        bankname : this.bankname,//银行名称
        bankacco : this.bankacco,//银行账号


        //联系信息
        mobilphone : this.mobilphone,//联系电话
        address : this.address,//地址
        email : this.email//邮箱
      },this.registcallback)
    },


    registcallback(status,message,data){
      //返回的客户编号
      console.log(data.data);
      if (status == 0){
        this.$prompt('您的客户编号为:['+data.data+']请输入密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          registInCustInfo({
            custNo : data.data,
            pwd : value,
          })
            // axios(
            //     {
            //       timeout: 5000,
            //       method: "post",
            //       url: "http://localhost:8080/test",
            //       data: qs.stringify({
            //         pwd : value,
            //       })
            //     }
            // )
        });
      }
    }

  },

  created() {
    this.getIDTypeFormDB();
  }
}
</script>

<style scoped>

</style>
