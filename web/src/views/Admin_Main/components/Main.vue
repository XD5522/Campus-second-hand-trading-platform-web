<template>
    <el-menu
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
    >
        <el-menu-item index="1">首页</el-menu-item>
        <div class="flex-grow" />
        <el-menu-item @click="LoginOut">退出登录</el-menu-item>
    </el-menu>
</template>

<script lang="ts" setup>

import {delAdminToken} from "@/api/cookie";
import router from "@/router";
import {onBeforeMount, ref} from "vue";
import {User} from "@/views/Admin_Main/type/User"
import {getAllUser} from "@/api/AdminGetData";

const userList = ref<User[]>()


function LoginOut() {
    delAdminToken()
    router.push('/AdminLogin')
}

</script>

<style>
.flex-grow {
    flex-grow: 1;
}
</style>