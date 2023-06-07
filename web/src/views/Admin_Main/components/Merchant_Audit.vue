<template>
    <el-menu
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
    >
        <el-menu-item index="1">商家注册列表</el-menu-item>
        <div class="flex-grow" />
        <el-menu-item @click="LoginOut">退出登录</el-menu-item>
    </el-menu>
</template>

<script lang="ts" setup>
import {delAdminToken} from "@/api/cookie";
import router from "@/router";

function LoginOut() {
    delAdminToken()
    router.push('/AdminLogin')
}
</script>

<style>

</style>