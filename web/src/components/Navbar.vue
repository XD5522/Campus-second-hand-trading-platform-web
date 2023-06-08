<template>
    <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            :ellipsis="false"
            @select="handleSelect"
            router="true"
    >
<!--TODO logo还没整-->
        <el-menu-item index="/about">LOGO</el-menu-item>
        <div class="flex-grow"/>
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/about">全部商品</el-menu-item>
        <el-menu-item index="/search">搜索商品</el-menu-item>
        <div class="flex-grow"/>
        <el-image v-if="ISLogin" style="height: 50px;border-radius: 50%" :src=user_img />
        <el-menu-item v-if="!ISLogin" index="/userlogin">登陆</el-menu-item>
        <el-sub-menu v-if="ISLogin">
            <template #title>{{ user_name }}</template>
            <el-menu-item @click="GoToUserZone">个人中心</el-menu-item>
            <el-menu-item index="/history">历史订单</el-menu-item>
            <el-menu-item index="/comment">评价中心</el-menu-item>
            <el-menu-item index="/trading">交易中心</el-menu-item>
            <el-menu-item index="/car">购物车</el-menu-item>
            <el-menu-item @click="LoginOut">注销</el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<script lang="ts" setup>
import {onBeforeMount, ref} from "vue";
import {getUserMsg} from "@/api/User";
import {useRouter} from "vue-router";
import {delToken, getUserId} from "@/api/cookie";
const user_id = ref(1);
const user_name = ref();
const user_img = ref();
const router = useRouter();
const ISLogin = ref(false);


function GoToUserZone(){
  router.push({path: '/userzone', query: {id: user_id.value}})
}

onBeforeMount(()=>{
    user_id.value = getUserId();
    if(user_id.value!=-1){
      ISLogin.value = true;
    }
    getUserMsg(user_id.value).then(res=>{
      user_name.value = res.data.userName;
      user_img.value = "http://101.43.208.136:9090/mall"+res.data.img;
    }).catch(err=>{
      console.log("error"+err)
    })
})

function LoginOut() {
    delToken()
    ISLogin.value = false
}

</script>

<style scoped>

el-menu {
    display: flex;
    height: 100%;
    width: 100%;
}
.flex-grow {
    flex-grow: 1;
}

</style>