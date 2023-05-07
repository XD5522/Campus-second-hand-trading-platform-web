<template>
    <el-container class="container">
        <el-header class="header">
            <el-col :span="1"></el-col>
            <el-col :span="22">
                <div class="header-botton">
                    <div style="flex: 1;"></div>
                    <el-button>时间降序</el-button>
                    <el-button>时间升序</el-button>
                    <el-button>查看已完成</el-button>
                    <el-button>查看未完成</el-button>
                </div>
            </el-col>
        </el-header>
        <el-main class="main">
            <el-col :span="1"></el-col>
            <el-col :span="22">
                <el-table>

                </el-table>
            </el-col>
        </el-main>
    </el-container>
</template>

<script lang="ts" setup>

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
    height: 113px;
    display: flex;
    padding-top: 76px;
    padding-left: 0px;
    padding-right: 0px;
    //background-color: #2c3e50;
}
.header-botton{
    //background-color: #42b983;
    height: 100%;
    width: 100%;
    display: flex;
    border-bottom: 2px solid gray;
}
.main {
    padding: 0px;
    display: flex;
    overflow: hidden;
}


</style>
