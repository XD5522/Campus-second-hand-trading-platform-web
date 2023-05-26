<script lang="ts" setup>

import Vue, {onBeforeMount, onMounted, ref} from 'vue';
import {useRoute, useRouter} from "vue-router";
import Options from 'vue-class-component';
import  { product } from "@/views/product/type/Product";

import {getProductById} from "@/api/product";
import router from "@/router";
import * as buffer from "buffer";

const product = ref<product>();
const images = ref<String>();
const route = useRoute()
const divRef = ref(null);

function getProduct(){
    let id = String(route.query.id);
    console.log(id)
    getProductById(id).then(res=>{
        product.value = res.data
        console.log(product.value)
    }).catch(err=>{
        console.log("err"+err)
    })
}

onBeforeMount(()=>{
    getProduct()
})


const url = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
const fit = 'contain'
</script>

<template>
    <el-container>
        <el-main>
            <div class = "block">
                <el-image style="width: 200px; height: 200px" :src="url" :fit="fit" />
            </div>
            <div class = "pro_name">
                <p></p>
            </div>
        </el-main>
    </el-container>
</template>

<style scoped>
.block{
    float: left;
}
.pro_name{
    font: 700 16px Arial,"microsoft yahei";
    color: #666;
    padding-top: 10px;
    line-height: 28px;
    margin-bottom: 5px;
}
</style>