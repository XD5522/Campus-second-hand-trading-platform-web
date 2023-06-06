<template>
<!--    <div class="home">-->
<!--        <img alt="Vue logo" src="../assets/logo.png">-->
<!--        <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>-->
<!--    </div>-->
    <div class="common-layout">
        <el-container>
            <!-- 轮播图 -->
            <el-aside width="400px">Aside</el-aside>
            <el-main>
                <el-carousel trigger="click" height="300px">
                    <el-carousel-item v-for="item in 4" :key="item">
                        <h3 class="small justify-center" text="2xl">{{ item }}</h3>
                    </el-carousel-item>
                </el-carousel>
            </el-main>
        </el-container>
    </div>
    <div class="goods">
        <el-row>
            <el-row span="6" v-for="item in 4">
                <el-card>
                    <div class="picture">图片</div>
                    <div class="name">商品名称</div>
                    <div class="introduction">介绍</div>
                </el-card>
            </el-row>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue';
import {ref} from "vue";
import {Product} from "@/views/Home/type/Product";

const products = ref<Product>();
// export default class HomeView extends Vue {}
</script>

<style>

.el-carousel {
    width: 100%;
}

.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>