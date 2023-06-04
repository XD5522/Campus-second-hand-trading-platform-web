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
        <el-col :span="22" :push="1" style="text-align: left">
            <el-input v-model="searchText" placehlder="请输入关键字搜索" class="search-input" style="width: 50%"/>
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
            <el-button type="info" @click="handlePX">{{px}}</el-button>

        </el-col>
    </div>
    <div class="search-product" >
        <el-col :span="22" :push="1">
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
            <el-row gutter="10">
                <el-col
                    :xs="6"
                    :sm="12"
                    :md="8"
                    :lg="6"
                    style="margin-bottom: 10px"
                    v-for="(product,index) in products"

                >
                    <el-card @click="push(String(product.id))">
                        <div class = "intro">
                            <el-image style=" width: 100%; height: 250px; user-select: none;" :src="path+product.img" :fit="fit"/>
                        </div>
                        <div style="text-align: left;">
                            <div style="margin-left: 10px;">
                                <span style="color: #e4393c;font-size: 20px;">￥{{product.price}}</span>
                            </div>
                            <div style="margin-left: 10px;">
                                <span>店铺：</span><span style="margin-right: 10px;color: #666">{{product.userName}}</span>
                            </div>
                            <div style="margin-left: 10px;">
                                <span style="margin-right: 10px;">{{product.name}}</span>
                            </div>



                            <div style="margin-left: 10px;">
                                <span>销量：{{product.hisSales}}</span>
                            </div>
                            <div style="margin-left: 10px;">
                                <span>库存：{{product.stock}}</span>
                            </div>
                            <div style="margin-left: 10px;">
                                <span>评分：{{product.star}}</span>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </el-col>


        <el-col :span="1"></el-col>
    </div>

</template>

<script lang="ts" setup>
import { onMounted, ref} from 'vue';
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
const asc = ref("ASC")
const px = ref("正序")
function handlePX(){
    if(px.value=="正序"){
        px.value="倒序"
        asc.value="DESC"
    }
    else{
        px.value="正序"
        asc.value="ASC"
    }
    handleSearch()
}

let route = useRoute()
let router = useRouter()
function handleSearch(){
    search(searchText.value,value.value,asc.value,current.value).then(res=>{
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

