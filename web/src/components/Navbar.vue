<template>
<!--TODO 这导航栏怎么和页面不等宽啊-->
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
        <el-menu-item index="/about">搜索商品</el-menu-item>
        <div class="flex-grow"/>
<!--TODO 头像还没写-->
        <!--            <img src="./assets/Account-picture.png" >-->

        <el-sub-menu>
<!--TODO 这里要能获取用户的用户名-->
            <template #title>用户名</template>
            <el-menu-item index="/userzone">个人中心</el-menu-item>
            <el-menu-item index="2-2">购物车</el-menu-item>
            <el-menu-item index="2-3">注销</el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<script>
export default {
    name: "Navbar"
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