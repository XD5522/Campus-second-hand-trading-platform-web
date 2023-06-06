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
            <el-card style="flex: 4" @click="" class="hover">
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
        </div>
      </el-col>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {getUserId} from "@/api/cookie";
import {useRouter} from "vue-router";
import {Comment} from "@/views/Comment/type/Comment";
import {Detail} from "@/views/Order/type/detail";
import {GetOrderDetail} from "@/api/Order";
import {GetComment} from "@/api/Comment";

const user_id = ref();
const order_id = ref(-1);
const r = useRouter();
const active = ref(3);
const comment = ref<Comment>();
const active_comment = ref(false)
const IsMounted = ref(false)
const imgpath = ref("http://101.43.208.136:9090/mall")

const order = ref<Detail>()
onMounted(() => {
  user_id.value = getUserId();
  order_id.value = parseInt(r.currentRoute.value.query.id, 10)
  if (user_id.value == -1 || order_id.value == -1) {
    useRouter().push({path: '/userlogin'})
  }
  GetOrderDetail(order_id.value).then(res => {
    order.value = res.data
    GetComment(user_id.value, order.value.product_id).then(res => {
      comment.value = res.data;
      if (comment.value.id != null) {
        active_comment.value = true;
      }
    })
  })

  IsMounted.value = true;
})


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

.header-botton {
//background-color: #42b983; height: 100%; width: 100%; display: flex; border-bottom: 2px solid gray;
}

.main {
  padding: 0px;
  display: flex;
  overflow: hidden;
}
</style>
