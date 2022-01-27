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
                  <el-input ></el-input>
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item label="证件类型">
                  <el-select v-model="value" placeholder="请选择" style="width: 100%"></el-select>
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item label="证件号码">
                  <el-input ></el-input>
                </el-form-item>
              </el-col>
            </el-row>


            <el-row>
              <el-col span="8">
                <el-form-item label="证件有效期">
                  <el-date-picker
                      v-model="value1"
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
                  <el-input ></el-input>
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item label="银行名称">
                  <el-select v-model="value" placeholder="请选择" style="width: 100%"></el-select>
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item label="银行账号">
                  <el-input ></el-input>
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
                  <el-input ></el-input>
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item label="通讯地址">
                  <el-select v-model="value" placeholder="请选择" style="width: 100%"></el-select>
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item label="电子邮件">
                  <el-input ></el-input>
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
export default {
  name: "OpenAccount",
  data(){
    return {
      value1: '',
    }
  }
}
</script>

<style scoped>

</style>
