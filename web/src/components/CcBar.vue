<template>
    <div class = "nav"></div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElMenu, ElMenuItem, ElInput, ElSelect, ElOption, ElButton } from 'element-plus';

const activeIndex = ref('1');
const searchInput = ref('');
const select = ref('keywords');

function handleSelect(index: string) {
    activeIndex.value = index;
}

function handleSearch() {

}

</script>

<style scoped>
.nav {
    
}
</style>
