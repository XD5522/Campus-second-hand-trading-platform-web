<template>
    <div class="main-container">
        <el-container>
            <!-- 管理员页面导航栏 -->
            <el-aside class="aside">
                <el-row class="tac">
                    <el-col :span="12">
                        <el-menu
                            active-text-color="#ffd04b"
                            background-color="#545c64"
                            class="el-menu-vertical-demo"
                            default-active="/AdminMain/main"
                            text-color="#fff"
                            @open="handleOpen"
                            @close="handleClose"
                            style="height: 100%; width: 200px"
                            router
                        >
                            <!--router开启路由模式，通过el-menu-item index来进行跳转 -->
                            <el-menu-item index="/AdminMain/main">
                                <el-icon><Menu /></el-icon>
                                <span>首页</span>
                            </el-menu-item>
                            <el-sub-menu index="1">
                                <template #title>
                                    <el-icon><Warning /></el-icon>
                                    <span>待审核信息列表</span>
                                </template>
                                <el-menu-item index="1-1">用户注册列表</el-menu-item>
                                <el-menu-item index="1-2">商家注册列表</el-menu-item>
                                <el-menu-item index="1-3">发布商品列表</el-menu-item>
                            </el-sub-menu>
                            <el-menu-item index="/AdminMain/user">
                                <el-icon><User /></el-icon>
                                <span>管理用户列表</span>
                            </el-menu-item>
                            <el-menu-item index="/AdminMain/goods">
                                <el-icon><Goods /></el-icon>
                                <span>管理商品列表</span>
                            </el-menu-item>
                            <el-menu-item index="4">
                                <el-icon><Setting /></el-icon>
                                <span>设置平台交易费用</span>
                            </el-menu-item>
                        </el-menu>
                    </el-col>
                </el-row>
            </el-aside>

            <el-main style="padding: 0">
                <!-- 设置路由出口 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import {defineComponent} from "vue";
import {
    Menu,
    Warning,
    Setting,
    User,
    Goods
} from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}

</script>

<style scoped>
/* 样式内容 */
.main-container {
    display: flex;
    height: 97vh;
}

.aside {
    width: 200px;
}

.tac {
    height: 100%;
}
</style>
