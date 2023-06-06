<template>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
    >
        <el-menu-item index="1">用户列表</el-menu-item>
        <div class="flex-grow" />
        <el-menu-item index="2">退出登录</el-menu-item>
    </el-menu>
    <div class="search">
        <el-card>搜索</el-card>
    </div>
    <div class="dataForm">
        <el-card>
            <el-table :data="userList" style="width: 100%">
                <el-table-column prop="id" label="ID" width="70px" />
                <el-table-column prop="userName" label="用户名" width="150px" />
                <el-table-column prop="name" label="姓名" width="100px" />
                <el-table-column prop="type" label="用户类型" width="100px" />
                <el-table-column prop="phone" label="手机号" width="200px"/>
                <el-table-column prop="bankCard" label="银行卡号" width="200px"/>
                <el-table-column prop="state" label="状态" />
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button type="success" v-if="isAudit(scope.row.state)" @click="passThisUser(scope.row.userName, scope.row.id)">通过</el-button>
                        <el-button type="danger"  v-if="!isBan(scope.row.state)" @click="banThisUser(scope.row.userName, scope.row.id)">封禁</el-button>
                        <el-button type="warning" v-if="isBan(scope.row.state)" @click="passThisUser(scope.row.userName, scope.row.id)">解禁</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import {onBeforeMount, ref} from "vue";
import {banUser, getAllUser, passUser} from "@/api/AdminGetData";
import {User} from "@/views/Admin_Main/type/User"

const userList = ref<User[]>()

onBeforeMount(() => {
    getAllUser().then((res) => {
        userList.value = res.data
        console.log(res)
        console.log(userList)
    })
})

const isAudit = (state : string) => {
    if(state == "audit") return true
    return false
}

const isBan = (state : string) => {
    if(state == "正常") return false
    return true
}

function passThisUser(userName : string, id : number) {
    passUser(userName);
    userList.value.forEach((item, i) => {
        if(item.id == id) {
            userList.value[i].state = "正常"
        }
    })
}

function banThisUser(userName : string, id : number) {
    banUser(userName);
    userList.value.forEach((item, i) => {
        if(item.id == id) {
            userList.value[i].state = "封禁"
        }
    })
}

</script>

<style>
.flex-grow {
    flex-grow: 1;
}
</style>