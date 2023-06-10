<script lang="ts" setup>
import Vue, {onMounted, ref} from 'vue';
import Options from 'vue-class-component';
import {
    deleteAddress,
    getmoney,
    getMoneyRecord,
    getUser,
    incomeRecord,
    payoutRecord,
    recharge,
    rechargeRecord,
    saveAddr
} from "@/api/wallet";
import {ElMessageBox} from "element-plus";
import {product} from "@/views/product/type/Product";
import {useRoute, useRouter} from "vue-router";
import {getUserId} from "@/api/cookie";
import {getAddress} from "@/api/pay";
const addAddr =ref(false)
const manageAddress = ref(false)
const wallet_address = ref<Address[]>()
function addAddress(){
    saveAddr(addr.value).then(res=>{
        console.log(res)
    }).catch(err=>{
        console.log(err)
    })
    addAddr.value=false;
}
function deleteAddr(id:number){
    deleteAddress(id).then(res=>{
        console.log(res)
        getAddr()
    }).catch(err=>{
        console.log(err)
    })
}
const addr = ref<address>({
    userId:getUserId(),
    name:"",
    phone:"",
    address:"",
})
interface Address{
    id:number;
    userId:number;
    name:String;
    phone:String;
    address:String;
}
interface address{
    userId:number;
    name:String;
    phone:String;
    address:String;
}
interface User{
    id : number;
    userName :String;
    name :String;
    type :String;
    state :String;
    level : number;
    wallet : number;
    city :String;
    phone :String;
    gender :String;
    bankCard :String;
    email :String;
    introduction :String;
    license :String;
    credit : number;
    wechat :String;
    score :number;
}

interface Record{
  id:number;
  userId:number;
  value:number;
  time:Date;
}
const user = ref<User>({
    id : 0,
    userName :"",
    name :"",
    type :"",
    state :"",
    level : 0,
    wallet : 0,
    city :"",
    phone :"",
    gender :"",
    bankCard :"",
    email :"",
    introduction :"",
    license :"",
    credit : 0,
    wechat :"",
    score :0,
});

function getAddr(){
    getAddress().then(res=>{
        wallet_address.value=res.data
        console.log(wallet_address.value)
    }).catch(err=>{
        console.log(err)
    })
}
const mounted = ref(false)

function getUserWallet(){
  getUser().then(res=>{
      user.value=res.data;
      console.log(user.value);
      mounted.value=true;
  }).catch(err=>{
      console.log(err)
  })
}
const router = useRouter()
const route = useRoute()


onMounted(()=>{
    getUserWallet()
    getAddr()
    mounted.value=true;
})
const handleClose = (done: () => void) => {
    ElMessageBox.confirm('Are you sure to close this dialog?')
        .then(() => {
            done()
        })
        .catch(() => {
            // catch error
        })
}
function reCharge(){
    recharge(num.value).then(res=>{

        addMoney.value=false
        num.value=0.0
        getUserWallet()
        console.log(res)
    }).catch(err=>{
        console.log("err")
    })
}
function getMon(){
    getmoney(num.value).then(res=>{

        getMoney.value=false
        num.value=0.0
        getUserWallet()
        console.log(res)
    }).catch(err=>{
        console.log("err")
    })
}

function getIncome(){
    incomeRecord().then(res=>{
        type.value=true
        records.value=res.data
    })
}
function getPayout(){
    payoutRecord().then(res=>{
        type.value=true

        records.value=res.data
    })
}
function getRecharge(){
    rechargeRecord().then(res=>{
        type.value=false
        records.value=res.data
    })
}

function getMonRecord(){
    getMoneyRecord().then(res=>{
        type.value=false
        records.value=res.data
    })
}
function orderIntro(id:number){
    router.push({path: '/order', query: {id: id}});
}

const addMoney = ref(false);
const num = ref(0.0)
const getMoney = ref(false)
const records = ref<Record[]>();
const type = ref(false)
function addFin(){
    addAddr.value = true
    getAddr()
}
</script>

<template>
  <div style="text-align: left;background: white">
      <el-col :span="18" :push="3" >
          <br/>
          <div style="text-align: left;">
              <div>
                  钱包余额
                  <br/>
                  <br/>
                  钱包余额：{{user.wallet}}
                  <el-button type="primary" @click="addMoney=true">
                      充值
                  </el-button>
                  <el-button type="primary" @click="getMoney=true">
                      提现
                  </el-button>
                  <el-button type="primary" @click="manageAddress=true">管理地址</el-button>
              </div>

              <br/>
              积分余额：{{user.score}}
          </div>
          <el-divider/>
          <el-button type="primary" @click="getRecharge">查看充值记录</el-button>
          <el-button type="primary" @click="getMonRecord">查看提现记录</el-button>
          <el-button type="primary" @click="getPayout">查看支付记录</el-button>
          <el-button type="primary" @click="getIncome">查看收款记录</el-button>
          <div>
              <el-table :data="records" style="width: 100%">
                  <el-table-column prop="time" label="Date" width="180" />
                  <el-table-column prop="value" label="Name" width="180" />
                  <el-table-column  label="详情" v-if="type">
                      <template #default="scope"><el-button type="primary" @click="orderIntro(scope.row.id)">详情</el-button></template>
                  </el-table-column>
              </el-table>
          </div>
          <el-dialog
                  v-model="addMoney"
                  title="充值"
                  width="30%"
                  :before-close="handleClose"
          >
                  <el-input-number v-model="num" :precision="0" :step="100" :min="0" />
                  <br/>
                  <el-button @click="reCharge">确定</el-button>
                  <el-button @click="addMoney = false">Cancel</el-button>
          </el-dialog>
          <el-dialog
                  v-model="getMoney"
                  title="充值"
                  width="30%"
                  :before-close="handleClose"
          >
                      <el-input-number v-model="num" :precision="0" :step="100" :min="0" :max="user.wallet" />
                  <el-button @click="getMon">确定</el-button>
                  <el-button @click="getMoney = false">Cancel</el-button>
          </el-dialog>
          <div>
              <el-dialog
                  v-model="addAddr"
                  title="充值"
                  width="30%"
                  :before-close="handleClose"
              >
                  姓名：<el-input v-model="addr.name" placeholder="请输入手机号"></el-input>
                  手机号：<el-input v-model="addr.phone" placeholder="请输入手机号"></el-input>
                  地址：<el-input v-model="addr.address" placeholder="请输入地址"></el-input>
                  <el-button @click="addAddress">确定</el-button>
              </el-dialog>
          </div>
          <div>
              <el-dialog
                  v-model="manageAddress"
                  title="管理地址"
                  width="50%"
                  :before-close="handleClose"
              >
                  <el-table :data="wallet_address" style="width: 100%">
                      <el-table-column prop="name" label="姓名" width="180" />
                      <el-table-column prop="phone" label="手机号" width="180" />
                      <el-table-column prop="address" label="地址" width="180" />
                      <el-table-column  label="操作">
                          <template #default="scope"><el-button type="primary" @click="deleteAddr(scope.row.id)">删除地址</el-button></template>
                      </el-table-column>
                  </el-table>
                  <el-button @click="addFin">添加地址</el-button>
                  <el-button @click="manageAddress = false">取消</el-button>
              </el-dialog>
          </div>

      </el-col>
  </div>
</template>

<style scoped>

</style>