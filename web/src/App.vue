<template>
    <el-header v-if="showNavbar" style="padding: 0px;">
        <navbar></navbar>
    </el-header>
    <router-view/>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Navbar from '@/components/Navbar.vue'
import HelloWorld from './components/HelloWorld.vue'

export default defineComponent({
    components: {
        Navbar, // 注册导航栏组件
        HelloWorld
    },
    data() {
        return {
            showNavbar: true // showNavbar属性标记导航栏的可见性
        }
    },
    watch: {
        $route(newRoute, oldRoute) {
            // 监听 $route 对象的变化
            const hideNavbar = newRoute.meta.hideNavbar // 获取当前路由的 meta 字段中的 hideNavbar 属性值
            this.showNavbar = !hideNavbar // 设置 showNavbar 的值，根据 hideNavbar 的值决定是否显示导航栏
        }
    }
})
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    background-color: rgba(0, 255, 255, 0.06);
    color: #2c3e50;
}
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>