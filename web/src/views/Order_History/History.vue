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
      <modal style="position: relative;z-index: 9999"
             :visible="visible"
             :title = "title"
             :order_id="order_id"
             @update:visible="visible = $event" />
    </el-container>
</template>

<script lang="ts" setup>

import {Order} from "@/views/Order_History/type/order";
import {defineComponent, onMounted, ref} from "vue";
import {getOrderListById} from "@/api/Order";
import Modal from "@/views/Order_History/components/Order.vue";

const user_id = 1;
//分页查询相关
const current = ref(1);
const total = ref();
const pageSize = 10;
let state = "all"
//定义订单列表
const OrderList = ref<Order[]>();

onMounted(() => {
  GetOrderList()
})

//获取订单列表
function GetOrderList(){
  getOrderListById(user_id,pageSize,current.value,state).then(res=>{
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
  state = "all"
  current.value = 1
  GetOrderList()
}
function Listfinish(){
  state = "finish"
  current.value = 1
  GetOrderList()
}
function ListUnfinished(){
  state = "unfinished"
  current.value = 1
  GetOrderList()
}


//行点击事件
const visible = ref(false);
const title = ref("订单详情")
let order_id = 1;
const handleRowClick = (row:Order) => {
  console.log('点击的行数据:', row);
  order_id = row.id;
  visible.value=true;
};
defineComponent({
  components: { Modal },
  setup() {
    return { visible, title,order_id }
  }
})

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
