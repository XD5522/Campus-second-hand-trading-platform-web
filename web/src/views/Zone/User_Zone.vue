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
                <el-image :src="imgurl"></el-image>
              </div>
              <div class="header-box-info-basic">
                <div style="display: flex;flex: 1;align-items: flex-end">
                  <span style="margin-left: 20px;color: white;font-size:32px">{{ username }}</span>
                  <span style="margin-left: 10px;color: #f6e3f0;font-size:20px">{{ userlevel }}</span>
                </div>
                <div style="display: flex;flex: 1;">
                  <span style="margin-left: 20px;font-size: 10px;color: white">{{ usermsg }}</span>
                </div>
              </div>
              <div class="header-box-info-action">
                <el-button style="margin-right: 20px" v-if="IsSelf" @click="Show_ChangeUserMsg">修改个人信息</el-button>
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
          <div class="content-box-botton">
            <el-button v-if="IsSelf" @click="Show_AddNewProductForm">添加商品</el-button>
          </div>
          <div class="content-box-table">
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
            <el-row :gutter="10">
              <el-col :xs="6" :sm="12" :md="8" :lg="6" v-for="(product, index) in ProudctList"
                      :key="index" style="margin-bottom:10px">
                <el-card shadow="hover" class="content-box-table-card" @click="handleCardClick(product)">
                  <el-image style="height: 200px" :src="imgurlpath+product.img"/>
                  <div style="padding: 14px;">
                    <div class="text-item">{{ product.name }}</div>
                    <div class="text-item">销量：{{ product.hisSales }}</div>
                    <div class="text-item">库存：{{ product.stock }}</div>
                    <div class="text-item">评价分数：{{ product.star }}</div>
                    <div class="text-item">价格：{{ product.price }}元</div>
                    <div class="text-item" v-if="IsSelf">状态：{{ product.state }}</div>
                    <el-button v-if="IsSelf" @click.stop="changeState(product)">修改商品状态</el-button>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>

      <el-form style="display: none;" :model="product_form" :rules="rules" ref="formRef">
        <el-form-item label="商品名称" prop="product_name">
          <el-input v-model="product_form.name"></el-input>
        </el-form-item>
        <el-form-item label="商品介绍" prop="product_intro">
          <el-input v-model="product_form.intro"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="product_price">
          <el-input-number v-model.number="product_form.price" :min="0"
                           :precision="2"></el-input-number>
        </el-form-item>
        <el-form-item label="商品库存" prop="product_stock">
          <el-input-number v-model.number="product_form.stock" :min="1"
                           :precision="0"></el-input-number>
        </el-form-item>
        <el-form-item label="商品尺寸" prop="product_size">
          <el-input v-model="product_form.size"></el-input>
        </el-form-item>
        <el-form-item label="商品类型" prop="product_type">
          <el-input v-model="product_form.type"></el-input>
        </el-form-item>
      </el-form>

      <!--@update:visible="visible = $event"来监视组件中的'update:visible'事件,当事件发生时修改visible属性的值-->
      <modal :visible="visible"
             :title="title"
             :product_form="product_form"
             v-on:AddProduct="SubmitNewProduct"
             @update:visible="visible = $event"/>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import {defineComponent, ref, onMounted, onBeforeMount} from 'vue';
import Modal from "@/views/Zone/components/AddNewProduct.vue";
import {ElButton, ElForm, ElFormItem, ElInput, ElMessage} from "element-plus";
import {AddNewProduct, ChangePDState, GetPDList, getUserMsg} from "@/api/User";
import {NewProduct} from "@/views/Zone/type/NewProduct";
import {Product} from "@/views/Zone/type/Product";
import {useRouter} from "vue-router";
import {getUserId} from "@/api/cookie";


//用户基本信息

const id = ref();
const user_id = ref(-1);
const imgurl = ref("");
const username = ref("NULL");//用户名
const usermsg = ref("");//个人简介
const userlevel = ref("LV0");//商家等级
const IsSelf = ref(false);//判断是否是本人访问

const router = useRouter();

onBeforeMount(() => {
  user_id.value = getUserId();
  id.value = parseInt(router.currentRoute.value.query.id, 10);
  IsWho()
  if (IsSelf.value == false && user_id.value == -1) {
    router.push({path: "/userlogin"})
  }
  getMsg()
  GetproudctList(id.value, pageSize, current.value)
})

/**
 * 判断是否是本人在访问
 * @constructor
 */
function IsWho() {
  if (user_id.value == id.value) {
    IsSelf.value = true;
  }
  //IsSelf.value = false;
}

function changeState(proudct: Product) {
  if (proudct.state == "normal") {
    ChangePDState(proudct.id, "down");
  } else {
    ChangePDState(proudct.id, "normal");
  }
}

const imgurlpath = ref(imgurl.value = "http://101.43.208.136:9090/mall/");

//获取用户信息
function getMsg() {
  getUserMsg(id.value).then(res => {
    imgurl.value = imgurlpath.value + res.data.img;
    username.value = res.data.userName;
    usermsg.value = res.data.introduction;
    userlevel.value = "LV" + res.data.credit;
  }).catch(err => {
    console.log("error" + err)
  })

}

//商品列表
const ProudctList = ref<Product[]>();
const current = ref(1);
const total = ref(1);
const pageSize = 12;

//切换页面
function handlePageChange(page: number) {
  current.value = page
  GetproudctList(id.value, pageSize, current.value);
}

/**
 * 获取商品列表
 * @constructor
 */
function GetproudctList(id: number, pageSize: number, pageNum: number) {
  GetPDList(id, pageSize, pageNum).then(res => {
    ProudctList.value = res.data.records;
    total.value = res.data.total;
    current.value = res.data.current;
  }).catch(err => {
    console.log("error" + err)
  })
}

//点击跳转到商品详情页
function handleCardClick(product: Product) {
  console.log("点击的商品id:" + product.id);
  router.push({path:"/prouduct",query:{id:product.id}})
}

/*修改个人信息的功能*/
const title = ref("新增商品");

function Show_ChangeUserMsg() {
  router.push({path: '/changeUserMsg',});
}

/*新增商品功能*/
const visible = ref(false)
//定义商品表
const product_form = ref<NewProduct>({
  img: '',
  user_id: 1,
  user_name: '张三',
  name: '',
  intro: '',
  price: 0,
  stock: 1,
  his_sales: 0,
  size: '',
  star: 5,
  type: '',
  trading: '',
  state: 'audit',
  flag: 0
})
const rules = {
  name: [
    {required: true, message: '商品名称不能为空', trigger: 'blur'},
    {max: 20, message: '商品名称不能超过20个字符', trigger: 'blur'}
  ],
  intro: [
    {required: true, message: '商品介绍不能为空', trigger: 'blur'},
    {max: 50, message: '商品介绍不能超过50个字符', trigger: 'blur'}
  ],
  price: [
    {required: true, message: '商品价格不能为空', trigger: 'blur'},
    {type: 'number', message: '商品价格必须是数字', trigger: 'blur'},
    {validator: (rule, value) => value > 0, message: '商品价格必须大于0', trigger: 'blur'}
  ],
  stock: [
    {required: true, message: '商品库存不能为空', trigger: 'blur'},
    {type: 'number', message: '商品库存必须是数字', trigger: 'blur'},
    {validator: (rule, value) => value > 1, message: '商品库存必须大于1', trigger: 'blur'}
  ],
  size: [
    {required: true, message: '商品尺寸不能为空', trigger: 'blur'},
    {max: 50, message: '商品尺寸不能超过50个字符', trigger: 'blur'}
  ],
  type: [
    {required: true, message: '商品类型不能为空', trigger: 'blur'},
    {max: 10, message: '商品类型不能超过10个字符', trigger: 'blur'}
  ]
}

//显示新增商品的子组件
function Show_AddNewProductForm() {
  title.value = "新增商品";
  if (!visible.value) visible.value = true;
}

function SubmitNewProduct() {
  AddNewProduct(product_form.value).then(res => {
    if (res.code == 200) {
      visible.value = false;
      ElMessage.success("添加成功");
    } else {
      visible.value = false;
      ElMessage.error("添加失败");
    }
  }).catch(err => {
    console.log("error" + err)
  })
}


defineComponent({
  components: {Modal},
  setup() {
    //子组件 Modal 是通过 teleport 挂载到 body 元素下的，因此它实际上是一个独立的组件，并不受父组件的包裹影响
    //因此可以直接使用 {{title}} 来显示 title 的值，而不需要在子组件中定义。
    return {visible, product_form, title}
  }
});
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

.header-box {
  position: relative;
  height: 100%;
//background-color: rgb(255, 255, 255); margin-bottom: 0px; overflow: hidden;
  background-image: url("../../assets/userinfo1.png");
}

.header-box-info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 84px;
//background-color: rgba(0, 255, 255, 0.63);
}

.header-box-info-r {
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
}

.header-box-info-img {
  margin-left: 20px;
  width: 65px;
  height: 65px;
  border-radius: 50%;
  overflow: hidden;
}

.header-box-info-basic {
  display: flex;
  flex-direction: column;
//background-color: white;
}

.header-box-info-action {
  position: absolute;
  right: 0;
}

.main {
  padding: 0px;
  display: flex;
  overflow: hidden;
}

.content-box {
  position: relative;
  background-color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.content-box-botton {
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative;
  flex-grow: 1
}

.content-box-table {
  flex-grow: 1
}

.content-box-table-card {

}

</style>
