<script lang="ts" setup>
import Vue, {onBeforeMount, onMounted, ref} from 'vue';
import {useRoute, useRouter} from "vue-router";
import {Car} from "@/views/car/type/car";
import {getCarByIds} from "@/api/car";
import {addOrder, getAddress, getCou, getScore, getWallet} from "@/api/pay";
import {getUserId} from "@/api/cookie";
import {ElTable} from "element-plus";

interface Address{
    id:number;
    userId:number;
    name:String;
    phone:String;
    address:String;
}
interface Coupon{
    id:number;
    userId:number;
    type:String;
    value:String;
    time:String;
}


let route = useRoute()
let router = useRouter()
const cars = ref<Car[]>([]);
const ids = ref<number[]>([])
const address = ref<Address[]>([]);
const coupon = ref<Coupon[]>([]);
const total = ref(0.0);
function getCars(){

    if (Array.isArray(route.query.cars)) {
        // 进行处理，例如使用 map 方法
        ids.value = (route.query.cars as string[]).map(Number);
    }
    else {
        let id = route.query.cars
        ids.value.push(Number(id))
    }
    getCarByIds(ids.value).then(res=>{
        cars.value = res.data
        console.log(cars.value)
        for(let car of cars.value){
            total.value+=car.price*car.num
        }
    }).catch(err=>{
        console.log(err)
    })
    console.log(ids.value)
}

function getAddr(){
    getAddress().then(res=>{
        address.value=res.data
        console.log(address.value)
    }).catch(err=>{
        console.log(err)
    })
}

function getCoupon(){
    getCou().then(res=>{
        coupon.value=res.data
        console.log(coupon.value)
    }).catch(err=>{
        console.log(err)
    })
}
function getMoney(){
    getWallet().then(res=>{
        wallet.value=res.data
        console.log(wallet.value)
    }).catch(err=>{
        console.log(err)
    })
    getScore().then(res=>{
        score.value=res.data
        console.log(score.value)
    }).catch(err=>{
        console.log(err)
    })

}
onMounted(()=>{
    getCars();
    getAddr();
    getCoupon();
    getMoney();
    mounted.value = true;
})

const fit = 'contain'
const path = 'http://101.43.208.136:9090/mall';
const mounted = ref(false);
const radio = ref('selected and disabled')
let buyer_name=ref("");
const trading = "快递运输";
const buyer_address=ref("");
const buyer_phone=ref("");
const buyer_coupon=ref(0);
const coupon_actual = ref(0.0);
const buyer_score = ref(0);
const wallet = ref(0);
const score = ref(0)

function log1(size:number){
    coupon_actual.value=size
    console.log(coupon_actual.value)
}

function saveOrder(){
    if(buyer_name.value==""||buyer_address.value==""||buyer_phone.value==""){
        alert("收货人信息不能为空")
        return ;
    }
    if((total.value-coupon_actual.value)>wallet.value){
        console.log(total.value-coupon_actual.value)
        alert("余额不足")
        return ;
    }
    addOrder(cars.value,getUserId(),buyer_name.value,trading,buyer_address.value,buyer_phone.value,buyer_coupon.value,buyer_score.value).then(res=>{
        console.log("success"+res.data);
        if(res.data==null){
            alert("以下商品库存不足"+res.data)
        }
        else{
            alert("支付成功")
        }
        router.push({
            path:'/car'
        })
    }).catch(err=>{
        console.log(err);
    })

}

</script>

<template>
  <div style="background: white;display: flex" >
      <el-col :span="18" :push="3" >

          <div style="text-align: left">
              钱包余额
              <br/>
              <br/>
              钱包余额：{{wallet}}
              <br/>
              积分余额：{{score}}
          </div>
          <el-divider/>

          <div style="text-align: left">
              <span>收货人信息</span>
              <br/>
              <br/>
              <div>
                  收货人姓名
                  <el-select v-model="buyer_name" class="m-2" placeholder="选择收货人" size="large">
                      <el-option
                          :key="item.name"
                          :label="item.name"
                          :value="item.name"
                          v-for="item in address"
                      />
                  </el-select>
                  收货人地址
                  <el-select v-model="buyer_address" class="m-2" placeholder="选择收货地址" size="large">
                      <el-option
                          :key="item.address"
                          :label="item.address"
                          :value="item.address"
                          v-for="item in address"
                      />
                  </el-select>
                  收货人手机号
                  <el-select v-model="buyer_phone" class="m-2" placeholder="选择收货地址" size="large">
                      <el-option
                          :key="item.phone"
                          :label="item.phone"
                          :value="item.phone"
                          v-for="item in address"
                      />
                  </el-select>
              </div>

          </div>
          <el-divider/>
          <div style="text-align: left">
              支付方式（仅支持钱包支付）
              <br/>
              <el-radio v-model="radio"  size="large" disabled label="selected and disabled">钱包支付</el-radio>
          </div>
          <el-divider/>
          <div style="text-align: left">
              送货清单
              <br/>
              <br/>
              <el-table
                  ref="multipleTableRef"
                  :data="cars"
                  style="width: 100%"
              >
                  <el-table-column label="商品图片" width="120">
                      <template #default="scope"> <el-image style=" width: 100%; height: 120px; user-select: none;" :src="path+scope.row.img" :fit="fit"/> </template>
                  </el-table-column>
                  <el-table-column property="name" label="商品名" width="120" />
                  <el-table-column label="商品价格" width="120">
                      <template #default="scope"><span style="color: #e4393c;font-size: 20px;">￥{{scope.row.price}}</span></template>
                  </el-table-column>
                  <el-table-column property="userName" label="卖家" width="120" />
                  <el-table-column  label="数量" property="num">
                  </el-table-column>
              </el-table>
          </div>
          <el-divider/>
          <div style="text-align: left">
              选择优惠券
              <br/>
              <br/>
              <div v-for="item in coupon">

                  <el-select v-model="buyer_coupon" class="m-2" placeholder="选择收货人" size="large" >
                      <el-option
                          :key="item.value"
                          :label="item.value"
                          :value="item.id"
                          @click="log1(Number(item.value))"
                      />
                  </el-select>

              </div>
              使用积分
              <el-input-number v-model="buyer_score" :precision="0" :step="100" :min="0" :max="total*100>score?score:total*100" />
          </div>
          <el-divider/>
          <div style="text-align: left">
              金额
              <br/>
              <span style="color: #e4393c;font-size: 20px;">￥{{total}}</span>
          </div>
          <el-divider/>
          <el-button @click="saveOrder">
              确认支付
          </el-button>

      </el-col>
  </div>
</template>

<style scoped>

</style>