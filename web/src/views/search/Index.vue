<template>
    <CcBar></CcBar>
    <div class="search-page">
        <el-input v-model="searchText" placeholder="请输入关键字搜索" class="search-input" />
        <el-button type="primary" class="search-button" @click="handleSearch">搜索</el-button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ElInput, ElButton } from 'element-plus';
import CcBar from "@/components/CcBar.vue";

export default defineComponent({
    name: 'SearchPage',
    components: {
        CcBar,
        ElInput,
        ElButton,
    },
    setup() {
        const searchText = ref('');

        const handleSearch = () => {
            // 处理搜索逻辑，比如向服务器请求数据
            console.log(`搜索关键字: ${searchText.value}`);
        };

        return {
            searchText,
            handleSearch,
        };
    },
});
</script>

<style scoped>
.search-page {
    display: flex;
    align-items: center;
    margin: 20px 0;
}

.search-input {
    flex: 1;
    margin-right: 20px;
}

.search-button {
    width: 80px;
}
</style>