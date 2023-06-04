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


.intro{

}
</style>

<template>
    <CcBar></CcBar>
    <div class="search-page">
        <el-input v-model="searchText" placeholder="请输入关键字搜索" class="search-input" />
        <el-button type="primary" class="search-button" @click="handleSearch">搜索</el-button>

        <el-select v-model="value" placeholder="Select">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                v-model = value
                @click = "handleSearch"
            />
        </el-select>

    </div>
    <div class="search-product" >
        <el-row gutter="10" style="margin-left: 10px">
            <el-col
                :xs="24"
                :sm="12"
                :md="8"
                :lg="6"
                style="margin-bottom: 10px"
                v-for="(product,index) in products"

            >
                <el-card >
                    <div class = "intro">
                        <el-image style=" width: 100%; height: 100%; user-select: none;" :src="path+product.img" :fit="fit"/>
                    </div>
                    <div>
                        <div style="text-align: left;">
                            <span style=";margin-right: 10px;color: #e4393c;font-size: 20px;">￥{{product.price}}</span>
                        </div>
                        <div style=" text-align: left;margin-left: 10px;">
                            <span style="margin-right: 10px;">{{product.name}}</span>
                        </div>
                        <div style=" text-align: left;margin-left: 10px;">
                            <span style="margin-right: 10px;color: #666">{{product.userName}}</span>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <div class="example-pagination-block" v-if="total>0">
            <el-pagination
                v-model:current-page="current"
                small
                background
                layout="prev, pager, next"
                v-model:total="total"
                @current-change="handleSearch"
            />
        </div>
    </div>

</template>

<script lang="ts" setup>
import {defineComponent, onMounted, ref} from 'vue';
import { ElInput, ElButton } from 'element-plus';
import CcBar from "@/components/CcBar.vue";
import { search } from "@/api/search"
import {useRoute, useRouter} from "vue-router";
import { product } from "@/views/search/type/Product";

const searchText = ref('');
const products = ref<product[]>();
const total = ref(0);
const current = ref(1);
const path = 'http://101.43.208.136:9090/mall';
const fit = 'contain'

let route = useRoute()
let router = useRouter()
function handleSearch(){
    search(searchText.value,value.value,current.value).then(res=>{
        products.value = res.data.records
        current.value=res.data.current
        total.value=res.data.pages*10
        console.log(total.value*10)
        console.log(res)
        console.log(products.value)
    }).catch(err=>{
        console.log("error"+err)
    })
}

function push(id:String){
    console.log(id.toString())
    router.push({path: '/product', query: {id: id}});
}

const value = ref('price')
const options = [
    {
        value: 'price',
        label: '按价格排序',

    },
    {
        value: 'his_sales',
        label: '按销量排序',
        disabled: true,
    },
    {
        value: 'star',
        label: '按好评度排序',
    }
]

onMounted(()=>{
    searchText.value = String(route.query.searchText)
    handleSearch()
})


</script>

