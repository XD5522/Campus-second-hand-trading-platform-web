<script lang="ts" setup>
import Vue, {onMounted, ref} from 'vue';
import {deleteCar, getCar, upCar} from "@/api/car";
import {Car} from "@/views/car/type/car";
import { ElTable } from 'element-plus'
import { Car as carDto } from "@/views/product/type/car";
import {useRoute, useRouter} from "vue-router";

const current = ref(1)
const carList = ref<Car[]>()
const total = ref(0);
const mounted = ref(false);

const path = 'http://101.43.208.136:9090/mall';
const fit = 'contain'
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<Car[]>([])
const ids = ref<number[]>()
const carDto = ref<carDto>({productId:0,userId:0,num:0,})
let route = useRoute()
let router = useRouter()

const handleSelectionChange = (val: Car[]) => {
    multipleSelection.value = val
}
function updateCar(id:number,num:number){
    upCar(id,num).then(res=>{
        getCarList()
    })
}
function deleteSelect(){
    ids.value = multipleSelection.value.map(car => car.id);
    deleteCar(ids.value)
    console.log(ids.value)
    getCarList()
}
function getCarList(){
  getCar(current.value).then(res=>{
    carList.value=res.data.records
      total.value=res.data.pages*10
      console.log(res)
      mounted.value=true
  })
}

function carPayment(){
    ids.value = multipleSelection.value.map(car => car.id);
    console.log(ids.value)
    router.push({
        path:'/pay',
        query: {cars:ids.value}
    })
}

onMounted(()=>{
    getCarList()

})

</script>

<template>
  <div v-if="mounted">
      <el-col :span="22" :push="1">
      <div class="example-pagination-block" v-if="total>0">
          <el-pagination
                  v-model:current-page="current"
                  small
                  background
                  layout="prev, pager, next"
                  v-model:total="total"
                  @current-change="getCarList"
          />

      </div>
          <el-button type="primary" @click="carPayment">
            结算
          </el-button>

          <el-button type="danger" @click="deleteSelect">
            删除
          </el-button >
      <el-table
              ref="multipleTableRef"
              :data="carList"
              style="width: 100%"
              @selection-change="handleSelectionChange"
      >
          <el-table-column type="selection" width="55" />
          <el-table-column label="商品图片" width="120">
              <template #default="scope"> <el-image style=" width: 100%; height: 120px; user-select: none;" :src="path+scope.row.img" :fit="fit"/> </template>
          </el-table-column>
          <el-table-column property="name" label="商品名" width="120" />
          <el-table-column label="商品价格" width="120">
              <template #default="scope"><span style="color: #e4393c;font-size: 20px;">￥{{scope.row.price}}</span></template>
          </el-table-column>
          <el-table-column property="userName" label="卖家" width="120" />
          <el-table-column  label="数量">
              <template #default="scope">
                  <div style="float: left;">
                    <el-input-number v-model="scope.row.num" :min="1" :max="10" @click="updateCar(scope.row.id,scope.row.num)"/>
                  </div>
              </template>
          </el-table-column>
      </el-table>
      </el-col>
  </div>

</template>

<style scoped>

</style>