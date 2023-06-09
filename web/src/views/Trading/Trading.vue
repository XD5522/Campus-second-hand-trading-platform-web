<template>
  <el-container class="container">
    <el-header class="header">
      <el-col :span="1"></el-col>
      <el-col :span="22">
        <div class="header-botton">
          <div style="flex: 1;"></div>
          <el-button type="primary" @click="ListA">查看待发货</el-button>
          <el-button type="primary" @click="ListB">查看待退货</el-button>
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
                  style="width: 100%">

          <el-table-column v-if="false" label="id" prop="id"></el-table-column>
          <el-table-column label="商品名" prop="product_name" sortable></el-table-column>
          <el-table-column label="创建时间" prop="create_time" sortable></el-table-column>
          <el-table-column label="完成时间" prop="finish_time" sortable></el-table-column>
          <el-table-column label="交易方式" prop="trading"></el-table-column>
          <el-table-column label="买家ID" prop="buyer"></el-table-column>
          <el-table-column label="卖家ID" prop="seller"></el-table-column>
          <el-table-column label="订单状态" prop="state" min-width="100"></el-table-column>
          <el-table-column label="操作">
            <template #default="{ row }">
              <el-button type="success" v-if="activeA" @click="shipments(row.id)">已发货</el-button>
              <el-button type="success" v-if="!activeA" @click="AgreeReturn(row.id)">同意退货</el-button>
              <el-button type="danger" v-if="!activeA" @click="RefuseReturn(row.id)">拒绝退货</el-button>
            </template>
          </el-table-column>
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
import {ref, onBeforeMount} from 'vue';
import {useRouter} from "vue-router";
import {getUserId} from "@/api/cookie";
import {Order} from "@/views/Order_History/type/order";
import {getOrderListById, SellerOperation} from "@/api/Order";
import {ElMessage} from "element-plus";

const user_id = ref(-1);
const OrderList = ref<Order[]>();
const r = useRouter();
const state = ref("ToBeShipped");
const activeA = ref(true)
//分页查询相关
const current = ref(1);
const total = ref();
const pageSize = 10;


onBeforeMount(() => {
  user_id.value = getUserId();
  if (user_id.value == -1) {
    r.push({path: '/userlogin'})
  }
  GetOrderList()
})

//获取订单列表
function GetOrderList() {
  getOrderListById(user_id.value, pageSize, current.value, state.value).then(res => {
    console.log(res.data)
    OrderList.value = res.data.records
    total.value = res.data.total;
  }).catch(err => {
    console.log("error" + err)
  })
}

//翻页
function handlePageChange(page: number) {
  current.value = page
  GetOrderList()
}

function ListA() {
  state.value = "ToBeShipped";
  activeA.value = true;
  GetOrderList()
}

function ListB() {
  state.value = "ToBeReturned"
  activeA.value = false
  GetOrderList()
}

function shipments(id: number) {
  SellerOperation(id,"shipments").then(res=>{
    ElMessage.success("发货成功")
  })
}

function AgreeReturn(id: number) {
  SellerOperation(id,"AgreeReturn").then(res=>{
    ElMessage.success("已同意退货")
  })
}

function RefuseReturn(id: number) {
  SellerOperation(id,"RefuseReturn").then(res=>{
    ElMessage.success("已拒绝退货")
  })
}

</script>

<style scoped>
.container {
  margin-top: -76px;
  min-height: 100vh;
  display: flex;
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
//background-color: #42b983; height: 100%; width: 100%;
  display: flex;
  border-bottom: 2px solid gray;
}

.main {
  padding: 0px;
  display: flex;
  overflow: hidden;
}
</style>
