<template>
    <el-container class="container">
        <el-header class="header">
            <el-col :span="1"></el-col>
            <el-col :span="22">
                <div class="header-botton">
                    <div style="flex: 1;"></div>
                    <el-button type="primary" @click="ListAll">查看所有</el-button>
                    <el-button type="primary" @click="Listfinish">查看已完成</el-button>
                    <el-button type="primary" @click="ListUnfinished">查看未完成</el-button>
                </div>
            </el-col>
        </el-header>
        <el-main class="main">
            <el-col :span="1"></el-col>
            <el-col :span="22">
                <el-table :data="OrderList"
                          :default-sort="{ prop: 'create_time', order: 'descending' }"
                          :pagination="true"
                          :page-size="pageSize"
                          style="width: 100%"
                          @row-click="handleRowClick"
                >
                    <el-table-column v-if="false" label="id" prop="id"></el-table-column>
                    <el-table-column label="商品名" prop="product_name" sortable></el-table-column>
                    <el-table-column label="创建时间" prop="create_time" sortable ></el-table-column>
                    <el-table-column label="完成时间" prop="finish_time" sortable ></el-table-column>
                    <el-table-column label="交易方式" prop="trading"></el-table-column>
                    <el-table-column label="买家ID" prop="buyer"></el-table-column>
                    <el-table-column label="卖家ID" prop="seller"></el-table-column>
                    <el-table-column label="订单状态" prop="state" min-width="100"></el-table-column>
                </el-table>
              <div style="display: flex">
                <div style="flex:4"></div>
                <el-pagination
                    style="flex: 1"
                    :current-page="current"
                    :total="total"
                    :page-size="pageSize"
                    @current-change="handlePageChange"
                ></el-pagination>
                <div style="flex:4"></div>
              </div>
            </el-col>
        </el-main>
    </el-container>
</template>

<script lang="ts" setup>

import {Order} from "@/views/Order_History/type/order";
import {defineComponent, onBeforeMount, onMounted, ref} from "vue";
import {getOrderListById} from "@/api/Order";
import {getUserId} from "@/api/cookie";
import {useRouter} from "vue-router";
import Router from "@/router";
import router from "@/router";


const user_id = ref();
//分页查询相关
const current = ref(1);
const total = ref();
const pageSize = 10;
const state = ref("all");
//定义订单列表
const OrderList = ref<Order[]>();
const r = useRouter();//声明router

onBeforeMount(() => {
  user_id.value = getUserId();
  if(user_id.value==-1){
    r.push({path: '/userlogin'})
  }
  GetOrderList()
})

//获取订单列表
function GetOrderList(){
  getOrderListById(user_id.value,pageSize,current.value,state.value).then(res=>{
    OrderList.value=res.data.records
    total.value=res.data.total;
    current.value=res.data.current;
  }).catch(err=>{
    console.log("error"+err)
  })
}
//翻页
function handlePageChange(page:number){
  current.value = page
  GetOrderList()
}

//分类查看
function ListAll(){
  state.value = "all"
  current.value = 1
  GetOrderList()
}
function Listfinish(){
  state.value = "finish"
  current.value = 1
  GetOrderList()
}
function ListUnfinished(){
  state.value = "unfinished"
  current.value = 1
  GetOrderList()
}

//行点击事件

const handleRowClick = (row:Order) => {
  r.push({path:"/order", query: {id: row.id}})
};

</script>

<style scoped>
.container {
    margin-top: -76px;
    min-height: 100vh;
    display: flex;
    z-index: auto;
    flex-direction: column;
}

.header {
    margin-bottom: 0px;
    height: 113px;
    display: flex;
    padding-top: 76px;
    padding-left: 0px;
    padding-right: 0px;
//background-color: #2c3e50;
}

.header-botton {
//background-color: #42b983; height: 100%;
    width: 100%;
    display: flex;
    border-bottom: 2px solid gray;
}

.main {
    padding: 0px;
    display: flex;
    overflow: hidden;
}
</style>
