<template>
    <CcBar></CcBar>
    <div class="search-page">
        <el-input v-model="searchText" placeholder="请输入关键字搜索" class="search-input" />
        <el-button type="primary" class="search-button" @click="handleSearch">搜索</el-button>
    </div>
    <div class="search-product">
        <el-table :data="products" border style="width: 100%">
            <el-table-column prop="name" label="商品名" width="180" />
            <el-table-column prop="username" label="商家" width="180" />
            <el-table-column prop="price" label="价格" />
            <el-table-column prop="stoke" label="库存"/>
            <el-table-column prop="hisSales" label="历史销量"/>
            <el-table-column prop="star" label="评分"/>

        </el-table>
    </div>

</template>

<script lang="ts" setup>
import { defineComponent, ref } from 'vue';
import { ElInput, ElButton } from 'element-plus';
import CcBar from "@/components/CcBar.vue";
import { search } from "@/api/product"

const searchText = ref('');
const products = ref<product[]>();

function handleSearch(){
    search(searchText.value).then(res=>{
        products.value = res.data
        console.log(products.value)
    }).catch(err=>{
        console.log(err)
        console.log(err)
    })
}


</script>

<style scoped>
.search-page {
    display: flex;
    align-items: center;
    margin: 20px 0;
}

.search-input {
    flex: 1;
    margin-right: 20px;
}

.search-button {
    width: 80px;
}
</style>