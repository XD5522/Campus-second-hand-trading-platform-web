<template>
<!--    <div class="home">-->
<!--        <img alt="Vue logo" src="../assets/logo.png">-->
<!--        <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>-->
<!--    </div>-->
    <div class="common-layout">
        <el-container>
            <el-main style="padding: 0px">
                <el-carousel trigger="click" height="450px">
                    <el-carousel-item v-for="item in imgList" :key="item.id">
                        <el-image :src="item.tu" style="max-width: 100%"></el-image>
                    </el-carousel-item>
                </el-carousel>
            </el-main>
        </el-container>
    </div>
    <div class="title">
        <el-icon :size="30" style="margin: 0px 20px; position:relative; top:7px;"><Sunny/></el-icon>
        <span style="font-size: 20px">好物精选</span>
        <el-icon :size="30" style="margin: 0px 20px; position:relative; top:7px;"><Sunny/></el-icon>
    </div>
    <div class="goods">
        <el-row type="flex" justify="center" align="middle">
            <el-col
                span="4"
                v-for="(product,index) in data.list"
            >
                <div>
                    <el-card class="card" shadow="hover" @click="push(String(product.id))">
                        <div class = "intro">
                            <el-image style=" width: 150px; height: 150px; user-select: none;" :src="imgpath+product.img" :fit="fit"/>
                        </div>
                        <div style="text-align: center;">
                            <div style="margin-left: 10px;">
                                <span style="margin-right: 10px;">{{product.name}}</span>
                            </div>
                            <div style="margin-left: -10px;">
                                <span style="color: #e4393c;font-size: 20px;">￥{{product.price}}</span>
                            </div>
                        </div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue';
import {onMounted, reactive} from "vue";
import {InitProjectData} from "@/views/Home/type/Product";
import {searchProject} from "@/api/AdminGetData";
import router from "@/router";
import {
    Sunny
} from '@element-plus/icons-vue'

const data = reactive(new InitProjectData())

const imgpath = 'http://101.43.208.136:9090/mall'
const fit = 'contain'

const imgList = [
    {id : 0, tu : require("@/assets/4.jpg")},
    {id : 1, tu : require("@/assets/2.jpg")},
    {id : 2, tu : require("@/assets/3.jpg")},
]

onMounted(() => {
    searchProject("", data.pageData.order, data.pageData.asc, data.pageData.page, data.pageData.pagesize).then((res) => {
        data.list = res.data.records
        data.pageData.page = res.data.current
        data.pageData.count = res.data.total
        data.pageData.pagesize = res.data.size
        console.log(data)
        console.log(res)
    }).catch((err) => {
        console.log("error"+err)
    })
})

function push(id : string){
    console.log(id.toString())
    router.push({path: '/product', query: {id: id}});
}

// export default class HomeView extends Vue {}
</script>

<style>

.el-carousel {
    width: 100%;
}

.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 450px;
    margin: 0;
    text-align: center;
}

.el-carousel__item {
    background-color: rgba(0, 255, 255, 0.06);
}

.title {
    margin-top: 40px;
}

.goods {
    margin-top: 35px;
}

.card {
    border-radius: 20px;
    width: 200px;
    margin: 20px;
}
</style>