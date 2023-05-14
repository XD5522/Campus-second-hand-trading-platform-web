<script lang="ts" setup>

import Vue, {onBeforeMount, onMounted, ref} from 'vue';
import {useRoute, useRouter} from "vue-router";
import Options from 'vue-class-component';
import  { product } from "@/views/product/type/Product";

import {getProductById} from "@/api/product";
import router from "@/router";

const product = ref<product>();
const images = ref<String>();
const route = useRoute()

function getProduct(){
    let id = String(route.query.id);
    console.log(id)
    getProductById(id).then(res=>{
        product.value = res.data
        console.log(res)
    }).catch(err=>{
        console.log("err"+err)
    })
}

onBeforeMount(()=>{
    getProduct()
})

</script>

<template>
    <div>
            <div slot="header" class="clearfix">
                <span>{{ product.name }}</span>
            </div>
            <div>
                <el-row>
                    <el-col :span="6">商品ID:</el-col>
                    <el-col :span="18">{{ product.id }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">商品介绍:</el-col>
                    <el-col :span="18">{{ product.intro }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">价格:</el-col>
                    <el-col :span="18">{{ product.price }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">尺寸:</el-col>
                    <el-col :span="18">{{ product.size }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">评分:</el-col>
                    <el-col :span="18">{{ product.star }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">状态:</el-col>
                    <el-col :span="18">{{ product.state }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">库存:</el-col>
                    <el-col :span="18">{{ product.stock }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">交易方式:</el-col>
                    <el-col :span="18">{{ product.trading }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">类型:</el-col>
                    <el-col :span="18">{{ product.type }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">卖家ID:</el-col>
                    <el-col :span="18">{{ product.userId }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">卖家用户名:</el-col>
                    <el-col :span="18">{{ product.userName }}</el-col>
                </el-row>
            </div>
    </div>
</template>

<style scoped>

</style>