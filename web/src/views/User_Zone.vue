<template>
    <el-container class="container">
        <el-header class="header">
            <el-col :span="1"></el-col>
            <el-col :span="22">
                <div class="header-box">
                    个人信息
                </div>
            </el-col>
        </el-header>
        <el-main class="main">
            <el-col :span="1"></el-col>
            <el-col :span="22">
                <div class="content-box">
                    shop
                </div>
            </el-col>
        </el-main>
    </el-container>
</template>

<script lang="ts" setup>
import {defineComponent} from 'vue';

defineComponent({
    name: 'MyLayout',
});
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
    height: 192px;
    display: flex;
    padding-top: 76px;
    padding-left: 0px;
    padding-right: 0px;
}
.header-box{
    height: 100%;
    background-color: rgba(80, 44, 44, 0.45);
    margin-bottom: 0px;
}
.main {

    padding: 0px;
    //flex: 1;
    display: flex;
}
.content-box {
    background-color: rgba(190, 255, 146, 0.47);
    height: 100%;
    padding: 0px;
}
</style>
