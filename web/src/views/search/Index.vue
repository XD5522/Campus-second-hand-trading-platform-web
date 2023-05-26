<template>
    <CcBar></CcBar>
    <div class="search-page">
        <el-input v-model="searchText" placeholder="请输入关键字搜索" class="search-input" />
        <el-button type="primary" class="search-button" @click="handleSearch">搜索</el-button>
    </div>
    <div class="search-product">
        <el-table :data="products" border style="width: 100%" >
            <el-table-column prop="name" label="商品名">
                <template #default="{row}">
                    <el-button @click=push(row.id)>{{ row.name }}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="userName" label="商家"/>
            <el-table-column label="图片">
                <template #default="{row}">
                    <img :src="row.imagePath" alt="图片" >
                </template>
            </el-table-column>
            <el-table-column prop="price" label="价格"/>
            <el-table-column prop="stock" label="库存"/>
            <el-table-column prop="hisSales" label="历史销量" />
            <el-table-column prop="star" label="评分" min-width="180"/>
        </el-table>
    </div>

</template>

<script lang="ts" setup>
import {defineComponent, onMounted, ref} from 'vue';
import { ElInput, ElButton } from 'element-plus';
import CcBar from "@/components/CcBar.vue";
import { search } from "@/api/search"
import {useRouter} from "vue-router";
import { product } from "@/views/search/type/Product";

const searchText = ref('');
const products = ref<product[]>();
const path = 'https://pic35.photophoto.cn/20150511/0034034892281415_b.jpg';

let router = useRouter()
function handleSearch(){
    search(searchText.value).then(res=>{
        products.value = res.data
        console.log(products.value)

    }).catch(err=>{
        console.log("error"+err)
    })
}

function push(id:String){
    console.log(id.toString())
    router.push({path: '/product', query: {id: 1}});
}

onMounted(()=>{

})


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