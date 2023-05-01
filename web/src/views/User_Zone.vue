<template>
    <el-container class="container">
        <!--个人信息部分-->
        <el-header class="header">
            <el-col :span="1"></el-col>
            <el-col :span="22">
                <div class="header-box">
                    <div class="header-box-info">
                        <div class="header-box-info-r">
                            <div class="header-box-info-img">
                                <!--TODO src="url"-->
                                <el-image
                                    style="height: 100%;width: 100%"
                                    src="{{imgurl}}"
                                    lazy="lazy"
                                />
                            </div>
                            <div class="header-box-info-basic">
                                <div style="display: flex;flex: 1;align-items: flex-end">
                                    <span style="margin-left: 20px;color: white;font-size:32px">{{username}}</span>
                                    <span style="margin-left: 10px;color: #f6e3f0;font-size:20px">{{userlevel}}</span>
                                </div>
                                <div style="display: flex;flex: 1;">
                                    <span style="margin-left: 20px;font-size: 10px;color: white">{{usermsg}}</span>
                                </div>
                            </div>
                            <div class="header-box-info-action">
                                <el-button style="margin-right: 20px" v-if="IsSelf">修改个人信息</el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-header>
        <!--个人商城部分-->
        <el-main class="main">
            <el-col :span="1"></el-col>
            <el-col :span="22">
                <div class="content-box">

                </div>
            </el-col>
        </el-main>
    </el-container>
</template>

<script lang="ts" setup>
import {defineComponent,ref,onMounted} from 'vue';

defineComponent({
    name: 'MyLayout',
});
//用户基本信息
let imgurl="";
let username="NULL";//用户名
let usermsg="要让两个span元素横向显示，其中一个元素字体较大，另一个元素要和这个元素的底部对齐，可以将它们包装在一个div元素中，使用display: flex和align-items: flex-end属性来对齐它们。";//个人简介
let userlevel = "LV0";//商家等级
let IsSelf = ref(true);//判断是否是本人访问

onMounted(() => {
    IsWho()
})
function IsWho(){
    //TODO 判断是不是用户本人在访问
    //IsSelf = ref(false);
}
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
    height: 268px;
    display: flex;
    padding-top: 76px;
    padding-left: 0px;
    padding-right: 0px;
}
.header-box{
    position: relative;
    height: 100%;
    //background-color: rgb(255, 255, 255);
    margin-bottom: 0px;
    overflow: hidden;
    background-image: url("../assets/userinfo1.png");
}
.header-box-info{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 84px;
    //background-color: rgba(0, 255, 255, 0.63);
}
.header-box-info-r{
    height: 100%;
    width: 100%;
    position: relative;
    display: flex;
}
.header-box-info-img{
    margin-left: 20px;
    width: 65px;
    height: 65px;
    border-radius: 50%;
    overflow: hidden;
}
.header-box-info-basic{
    display: flex;
    flex-direction: column;
    //background-color: white;
}
.header-box-info-action{
    position: absolute;
    right: 0;
}
.main {
    padding: 0px;
    //flex: 1;
    display: flex;
}
.content-box {
    background-color: white;
    height: 100%;
    padding: 0px;
}
</style>
