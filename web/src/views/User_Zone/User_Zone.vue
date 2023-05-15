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
                                    <span style="margin-left: 20px;color: white;font-size:32px">{{ username }}</span>
                                    <span style="margin-left: 10px;color: #f6e3f0;font-size:20px">{{ userlevel }}</span>
                                </div>
                                <div style="display: flex;flex: 1;">
                                    <span style="margin-left: 20px;font-size: 10px;color: white">{{ usermsg }}</span>
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
                    <div class="content-box-botton">
                        <el-button v-if="IsSelf" @click="Show_AddNewProductForm">添加商品</el-button>
                    </div>
                    <div class="content-box-table">
                        <el-row :gutter="10">
                            <el-col :xs="24" :sm="12" :md="8" :lg="6" v-for="(product, index) in ProductList"
                                    :key="index" style="margin-bottom:10px">
                                <el-card shadow="hover" class="content-box-table-card">
                                    <el-image :src="product.imageurl"/>
                                    <div style="padding: 14px;">
                                        <div class="text-item">{{ product.name }}</div>
                                        <div class="text-item">销量：{{ product.sales }}</div>
                                        <div class="text-item">库存：{{ product.stock }}</div>
                                        <div class="text-item">评价分数：{{ product.score }}</div>
                                        <div class="text-item">价格：{{ product.price }}元</div>
                                        <el-button v-if="IsSelf">下架商品</el-button>
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
                   :product_form="product_form"
                   v-on:AddProduct="SubmitNewProduct"
                   @update:visible="visible = $event"/>
        </el-main>
    </el-container>
</template>

<script lang="ts" setup>
import {defineComponent, ref, onMounted} from 'vue';
import Modal from "@/views/User_Zone/components/AddNewProduct.vue";
import {ElButton, ElForm, ElFormItem, ElInput} from "element-plus";
import {AddNewProduct} from "@/api/UserZone";
import {Product} from "@/views/User_Zone/type/Product";

//用户基本信息
let imgurl = "";
let username = "NULL";//用户名
let usermsg = "要让两个span元素横向显示，其中一个元素字体较大，另一个元素要和这个元素的底部对齐，可以将它们包装在一个div元素中，使用display: flex和align-items: flex-end属性来对齐它们。";//个人简介
let userlevel = "LV0";//商家等级
let IsSelf = ref(true);//判断是否是本人访问

onMounted(() => {
    IsWho()
    GetProductList()
})

/**
 * 判断是否是本人在访问
 * @constructor
 */
function IsWho() {
    //TODO 判断是不是用户本人在访问
    //IsSelf = ref(false);
}

//TODO 这部分全部需要适配后端
//定义商品信息
interface product {
    imageurl: string;
    name: string;
    sales: number;
    stock: number;
    score: number;
    price: number;
}

//测试用的商品列表
let ProductList: product[] = [
    {imageurl: "https://picsum.photos/200/200", name: '商品1', sales: 100, stock: 200, score: 4.5, price: 100},
    {imageurl: "https://picsum.photos/200/200", name: '商品2', sales: 200, stock: 100, score: 4.2, price: 200},
    {imageurl: "https://picsum.photos/200/200", name: '商品3', sales: 300, stock: 50, score: 4.8, price: 300},
    {imageurl: "https://picsum.photos/200/200", name: '商品4', sales: 400, stock: 80, score: 4.3, price: 400},
    {imageurl: "https://picsum.photos/200/200", name: '商品5', sales: 500, stock: 150, score: 4.6, price: 500},
];

/**
 * 获取商品列表
 * @constructor
 */
function GetProductList() {
    //TODO 商品列表的获取
}


/*新增商品功能*/
const visible = ref(false)
//定义商品表
const product_form = ref<Product>({
    imgurl: '',
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
    state: '审核',
    flag: 0
})
const rules = {
    name: [
        { required: true, message: '商品名称不能为空', trigger: 'blur' },
        { max: 20, message: '商品名称不能超过20个字符', trigger: 'blur' }
    ],
    intro: [
        { required: true, message: '商品介绍不能为空', trigger: 'blur' },
        { max: 50, message: '商品介绍不能超过50个字符', trigger: 'blur' }
    ],
    price: [
        { required: true, message: '商品价格不能为空', trigger: 'blur' },
        { type: 'number', message: '商品价格必须是数字', trigger: 'blur' },
        { validator: (rule, value) => value > 0, message: '商品价格必须大于0', trigger: 'blur' }
    ],
    stock: [
        { required: true, message: '商品库存不能为空', trigger: 'blur' },
        { type: 'number', message: '商品库存必须是数字', trigger: 'blur' },
        { validator: (rule, value) => value > 1, message: '商品库存必须大于1', trigger: 'blur' }
    ],
    size: [
        { required: true, message: '商品尺寸不能为空', trigger: 'blur' },
        { max: 50, message: '商品尺寸不能超过50个字符', trigger: 'blur' }
    ],
    type: [
        { required: true, message: '商品类型不能为空', trigger: 'blur' },
        { max: 10, message: '商品类型不能超过10个字符', trigger: 'blur' }
    ]
}

//显示新增商品的子组件
function Show_AddNewProductForm() {
    if (!visible.value) visible.value = true;
}

function SubmitNewProduct() {
    AddNewProduct(product_form.value);
}


//TODO 商品详情页的跳转
//TODO 分页显示
defineComponent({
    components: {Modal},
    setup() {
        //子组件 Modal 是通过 teleport 挂载到 body 元素下的，因此它实际上是一个独立的组件，并不受父组件的包裹影响
        //因此可以直接使用 {{title}} 来显示 title 的值，而不需要在子组件中定义。
        return {visible, product_form}
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
//background-color: rgb(255, 255, 255); margin-bottom: 0px;
    overflow: hidden;
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
