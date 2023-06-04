<template>
  <el-container class="container">
    <el-header class="header">
      <el-col :span="1"></el-col>
      <el-col :span="22">
        <div class="header-botton">
          <el-button type="primary" @click="ListPDComment">查看对商品评论历史</el-button>
          <el-button type="primary" @click="ListSEComment">查看对他人评价</el-button>
          <el-button type="primary" @click="ListBEComment">查看被他人评价</el-button>
          <div style="flex:1;"></div>
        </div>
      </el-col>
    </el-header>
    <el-main class="main">
      <el-col :span="1"></el-col>
      <el-col :span="22" >
        <div class="comment-card" v-for="(comment,index) in comments" :key="index">
          <el-card>
            <div style="display: flex">
              <el-image style="height: 30px; border-radius: 50%" :src="imgpath+comment.img"/>
              <div style="margin-left: 5px; padding-top: 5px;">{{ comment.user_name }}</div>
              <div style="flex: 1"></div>
              <el-rate v-model="comment.star" :max="5"  :disabled=true></el-rate>
            </div>
            <div style="display: flex;height: 100px;margin-top: 10px">
              <div style="height: 100%;text-align: left">{{ comment.content }}</div>
            </div>
            <div style="display: flex">
              <div style="font-size: small;color: gray" v-if="ShowProductName">{{comment.product_name}}</div>
              <div style="flex: 1"></div>
              <div style="font-size: small">{{ comment.time }}</div>
            </div>

          </el-card>
        </div>
        <div style="display: flex">
          <div style="flex:4"></div>
          <el-pagination
              style="flex: 1"
              :current-page="current"
              :total="total"
              :page-size="pageSize"
              @current-change="handlePageChange"
          ></el-pagination>
          <div style="flex:4"></div>
        </div>
      </el-col>
      <el-col :span="1"></el-col>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import { ref,onBeforeMount } from 'vue';
import {useRouter} from "vue-router";
import {GetCommentPage} from "@/api/Comment";
import {Comment} from "./type/Comment"
import {ElButton} from "element-plus";
import {getUserId} from "@/api/cookie";

const user_id = ref(1);
const current = ref(1);//当前页面
const pageSize = ref(5);
const total = ref(1);
const state = ref("PD");
const router = useRouter();

const ShowProductName =ref(true);
const comments = ref<Comment[]>();
const imgpath = "http://101.43.208.136:9090/mall/";
//获取评论列表
function GetCommentList(){
  GetCommentPage(user_id.value,pageSize.value,current.value,state.value).then(res=>{
    comments.value = res.data.records;
    total.value = res.data.total;
  }).catch(err=>{
    console.log("error"+err)
  })
}

onBeforeMount(() => {
  user_id.value = getUserId();
  if(user_id.value==-1) router.push({path:"/userlogin"})
  GetCommentList()
})
//翻页
function handlePageChange(page:number){
  current.value = page
  GetCommentList()
}

function ListPDComment(){
  state.value="PD";
  ShowProductName.value=true;
  GetCommentList()
}
function ListSEComment(){
  state.value="ER";
  ShowProductName.value=false;
  GetCommentList()
}
function ListBEComment(){
  state.value="EE";
  ShowProductName.value=false;
  GetCommentList()
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
  height: 133px;
  display: flex;
  padding-top: 76px;
  padding-left: 0px;
  padding-right: 0px;
//background-color: #2c3e50;
}
.header-botton {
  padding-top: 10px;
  width: 100%;
  display: flex;

}
.main {
  padding: 0px;
  display: flex;
  overflow: hidden;
}
.comment-card{
  background-color: #ffffff;;
  margin: 10px;
}

</style>
