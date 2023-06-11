<template>
  <el-container class="container">
    <el-header class="header">
      <el-col :span="2"></el-col>
      <el-col :span="20" style="background-color: white">
      </el-col>
    </el-header>
    <el-main class="main">
      <el-col :span="2"></el-col>
      <el-col :span="20" v-if="IsMounted">
        <div
            style="background-color: white;display: flex;height: 100%;padding-left: 50px;padding-right: 50px;flex-direction: column">
          <div style="display: flex;align-items: flex-end">
            <div style="font-size: 30px">订单详情</div>
            <div style="flex: 1"></div>
            <div style="font-size: small;color: gray">{{ order.id }}</div>
          </div>
          <div style="width: 100%;border: 1px solid gray;margin-top: 3px"></div>
          <div style="margin-top: 50px">
            <el-steps :active="active" align-center>
              <el-step title="下单成功"/>
              <el-step title="付款成功"/>
              <el-step title="已发货"/>
              <el-step title="订单完成"/>
            </el-steps>
          </div>
          <div style="font-size: 20px;margin-top: 10px">当前订单状态:{{ order.state }}</div>

          <div style="display: flex">
            <div style="flex:5;"></div>
            <el-button type="primary" v-if="IsReceived" @click="ReceivedProduct">确认收货</el-button>
            <el-button type="primary" v-if="IsCancel" @click="CancelOD">取消订单</el-button>
            <el-button type="primary" v-if="IsReturn" @click="ReturnProduct">申请退货</el-button>
            <div style="flex:1"></div>
          </div>

          <div style="display: flex;align-items: flex-end;">
            <div style="font-size: 20px;margin-top: 20px;">订单信息:</div>
          </div>

          <div style="display: flex;flex-direction: column;padding-left: 20px;padding-right: 20px">
            <div style="display: flex;flex-direction: row;">
              <div style="padding-top: 20px">卖家:</div>
              <div style="text-align: left;margin-top: 10px;flex-direction: row;display: flex;margin-left: 10px">
                <el-image :src="imgpath+order.seller_img" style="max-width: 40px;max-height: 40px;border-radius: 50%"/>
                <div style="padding-top: 8px;padding-left: 5px">{{ order.seller_name }}</div>
              </div>
            </div>
            <div style="display: flex;flex-direction: row;">
              <div style="padding-top: 20px">买家:</div>
              <div style="text-align: left;margin-top: 10px;flex-direction: row;display: flex;margin-left: 10px">
                <el-image :src="imgpath+order.buyer_img" style="max-width: 40px;max-height: 40px;border-radius: 50%"/>
                <div style="padding-top: 8px;padding-left: 5px">{{ order.buyer_name }}</div>
              </div>
            </div>
            <div style="text-align: left;margin-top: 10px;display: flex;flex-direction: column">
              <div style="margin-top: 5px">商品名:{{ order.product_name }}</div>
              <div style="margin-top: 5px">购买数量:{{ order.product_num }}</div>
              <div style="margin-top: 5px">下单时间:{{ order.create_time }}</div>
              <div style="margin-top: 5px">商品总价:{{ order.total }}</div>
              <div style="margin-top: 5px">优惠券使用:{{ order.coupon_type }}</div>
              <div style="margin-top: 5px">实际支付:{{ order.buyer_payout }}</div>
              <div style="margin-top: 5px">积分:{{ order.buyer_payout }}</div>
            </div>
          </div>

          <div style="display: flex;align-items: flex-end;">
            <div style="font-size: 20px;margin-top: 20px;">商品信息:</div>
          </div>

          <div style="display: flex;margin-top: 5px">
            <div style="flex: 1;"></div>
            <el-card style="flex: 4" @click="GotoProductDetail" class="hover">
              <div style="display: flex;margin-top: 10px;flex-direction: row">
                <div style="flex: 1"></div>
                <div style="text-align: left">
                  <div>商品名:{{ order.product_name }}</div>
                  <div>购买数量:{{ order.product_num }}</div>
                  <div></div>
                  <div>价格:{{ order.price }}￥</div>
                </div>
                <div style="flex:8"></div>
                <el-image :src="imgpath+order.product_img" style="max-width: 150px;max-height: 200px"/>
                <div style="flex: 1"></div>
              </div>
            </el-card>
            <div style="flex: 1"></div>
          </div>

          <div style="display: flex;align-items: flex-end;">
            <div style="font-size: 20px;margin-top: 20px;">评论信息:</div>
          </div>

          <div style="display: flex" v-if="active_comment">
            <div style="flex: 1"></div>
            <div style="flex: 4;">
              <el-card style="width: 100%">
                <div style="display: flex">
                  <el-image style="height: 30px; border-radius: 50%" :src="imgpath+comment.img"/>
                  <div style="margin-left: 5px; padding-top: 5px;">{{ comment.user_name }}</div>
                  <div style="flex: 1"></div>
                  <el-rate v-model="comment.star" :max="5" :disabled=true></el-rate>
                </div>
                <div style="display: flex;height: 100px;margin-top: 10px">
                  <div style="height: 100%;text-align: left">{{ comment.content }}</div>
                </div>
                <div style="display: flex">
                  <div style="font-size: small;color: gray">{{ comment.product_name }}</div>
                  <div style="flex: 1"></div>
                  <div style="font-size: small">{{ comment.time }}</div>
                </div>
              </el-card>
            </div>
            <div style="flex: 1"></div>
          </div>

          <div style="display: flex" v-if="!active_comment">
            <div style="flex: 1"></div>
            <div style="flex: 4;">
              <el-card style="width: 100%;text-align: left">
                <div>评论商品</div>
                <el-rate v-model="newComment.star1"></el-rate>
                <el-input v-model="newComment.content1"/>
                <div>评论商家</div>
                <el-rate v-model="newComment.star2"></el-rate>
                <el-input v-model="newComment.content2"/>
                <el-button style="margin-top: 10px" type="primary" @click="SubmitComment">提交</el-button>
              </el-card>
            </div>
            <div style="flex: 1"></div>
          </div>

        </div>
      </el-col>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {getUserId} from "@/api/cookie";
import {useRoute, useRouter} from "vue-router";
import {Comment} from "@/views/Comment/type/Comment";
import {Evaluate} from "@/views/Order/type/Evaluate";
import {Detail} from "@/views/Order/type/detail";
import {CancelOrder, finishOrder, GetOrderDetail, ReturnPD} from "@/api/Order";
import {AddCommnets, AddEvaluate, GetComment} from "@/api/Comment";
import {ElMessage} from "element-plus";

const user_id = ref();
const order_id = ref(-1);
const r = useRouter();
const active = ref(3);
const comment = ref<Comment>();
const active_comment = ref(false)
const IsMounted = ref(false)
const IsReceived = ref(false)
const IsCancel = ref(false)
const IsReturn = ref(false)
const imgpath = ref("http://101.43.208.136:9090/mall")

const order = ref<Detail>()
onMounted(() => {
  user_id.value = getUserId();
  order_id.value = parseInt(useRoute().query.id, 10)
  console.log(order_id.value)
  if (user_id.value == -1 || order_id.value == -1) {
    useRouter().push({path: '/userlogin'})
  }
  GetOrderDetail(order_id.value).then(res => {
    console.log(res)
    order.value = res.data
    console.log(order.value)
    GetComment(user_id.value, order.value.product_id).then(res => {
      comment.value = res.data;
      if (comment.value.id != null) {
        active_comment.value = true;
      }
    })
    //更新progress
    if (order.value.state == "已完成") {
      active.value = 4;
      IsReturn.value = true;
    } else if (order.value.state == "已发货") {
      active.value = 3;
      IsReceived.value = true;
    } else if (order.value.state == "未发货") {
      active.value = 2;
      IsCancel.value = true;
    } else {
      active.value = 1;
    }
  })
  IsMounted.value = true;
})

function ReceivedProduct() {
  finishOrder(order.value.id).then(res => {
    ElMessage.success("收货成功")
    IsReceived.value = false;
  })
}

function CancelOD() {
  CancelOrder(order.value.id).then(res => {
    ElMessage.success("取消成功")
    IsCancel.value = false;
  })
}

function ReturnProduct() {
  ReturnPD(order.value.id).then(res => {
    ElMessage.success("退货成功")
    IsReturn.value = false;
  })
}

function GotoProductDetail() {
  r.push({path: "/product", query: {id: order.value.product_id}})
}

interface NewComment {
  star1: number,
  star2: number,
  content1: string,
  content2: string
}

const newComment = ref<NewComment>({
  star1: 5,
  star2: 5,
  content1: "默认好评",
  content2: "默认好评"
})

function SubmitComment() {
  AddCommnets(newComment.value.star1,newComment.value.content1,order.value.product_id,order.value.buyer_id).then(res => {
    console.log(res)
  })

  AddEvaluate(newComment.value.star2,order.value.buyer_id,order.value.seller_id,order.value.product_id,"B",newComment.value.content2).then(res => {
    console.log(res)
  })
  ElMessage.success("评论成功")
}

</script>

<style scoped>
.container {
  margin-top: -76px;
  min-height: 100vh;
  display: flex;
  z-index: auto;
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


.main {
  padding: 0px;
  display: flex;
  overflow: hidden;
}
</style>
