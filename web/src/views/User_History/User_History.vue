<template>
    <el-container class="container">
        <el-header class="header">
            <el-col :span="1"></el-col>
            <el-col :span="22">
                <div class="header-botton">
                    <div style="flex: 1;"></div>
                    <el-button type="primary">查看已完成</el-button>
                    <el-button type="primary">查看未完成</el-button>
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
                    <el-table-column label="商品名" prop="product_name"></el-table-column>
                    <el-table-column label="创建时间" prop="create_time" :formatter="formatDate" sortable
                                     :sort-method="sortByCreateTime"></el-table-column>
                    <el-table-column label="完成时间" prop="finish_time" :formatter="formatDate" sortable
                                     :sort-method="sortByFinishTime"></el-table-column>
                    <el-table-column label="交易方式" prop="trading"></el-table-column>
                    <el-table-column label="买家ID" prop="buyer"></el-table-column>
                    <el-table-column label="卖家ID" prop="seller"></el-table-column>
                    <el-table-column label="订单状态" prop="state" min-width="100"></el-table-column>
                </el-table>
<!--                <el-pagination-->
<!--                    :total="OrderList"-->
<!--                    :page-size="pageSize"-->
<!--                    @current-change="handlePageChange"-->
<!--                ></el-pagination>-->
            </el-col>
        </el-main>
    </el-container>
</template>

<script lang="ts" setup>

import {Order} from "@/views/User_History/type/order";
import {onMounted, ref} from "vue";
import {getOrderListById} from "@/api/Order";

const user_id = 1;
//列表最大显示行数
const pageSize = 10;
//定义订单列表
const OrderList = ref<Order[]>();

onMounted(() => {
  getOrderListById(user_id).then(res=>{
    OrderList.value=res.data
    console.log(OrderList.value)
  }).catch(err=>{
    console.log("error"+err)
  })
})

// const sortByCreateTime = (a: Order, b: Order): number => {
//     const timeA = a.create_time.getTime();
//     const timeB = b.create_time.getTime();
//     return timeA - timeB;
// };
const sortByFinishTime = (a: Order, b: Order): number => {
    const timeA = a.finish_time.getTime();
    const timeB = b.finish_time.getTime();
    return timeA - timeB;
};
// // 格式化日期的方法
// const formatDate = (row: Order, column: any) => {
//     const date = row[column.property];
//     // 自定义日期格式，这里使用了 JavaScript 的内置方法 toLocaleString()，
//     return date.toLocaleString();
// };



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
