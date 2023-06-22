<script lang="ts" setup>
import Vue, {onBeforeMount, onMounted, ref} from 'vue';
import {useRoute, useRouter} from "vue-router";
import  { product } from "@/views/product/type/Product";
import {getProductById, proToCar} from "@/api/product";
import { UploadFilled } from '@element-plus/icons-vue'
const labelPosition = ref('right')
const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900']) // same as { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }



let product = ref<product>({
    id: 0,
    userId: 0,
    userName: "",
    name: "",
    intro: "",
    price: 0,
    stock: 0,
    hisSales: 0,
    size: "",
    type: "",
    star: 0,
    trading: "",
    state: "",
    img: "",
    userCount:0
})
const route = useRoute()
const userId = ref(getUserId())


let car = ref<Car>({
    productId:0,
    userId:0,
    num:1,
});

import { ElMessageBox } from 'element-plus'
import {Car} from "@/views/product/type/car";
import { GetProductComments} from "@/api/Comment";
import {getUserId} from "@/api/cookie";
import router from "@/router";

function carFinish(){
    addCar()
    showCar.value=false;
    getProduct()
}
function pushPro(id:number){
    router.push({path: '/userZone', query: {id: id}});
}
const handleClose = (done: () => void) => {
    ElMessageBox.confirm('Are you sure to close this dialog?')
        .then(() => {
            done()
        })
        .catch(() => {
            // catch error
        })
}

function getProduct(){
    let id = String(route.query.id);
    car.value.num=1;
    car.value.userId=userId.value
    console.log(id)
    getProductById(id).then(res=>{
        product.value = res.data
        product.value.img=url+product.value.img
        console.log(product.value.img)
        console.log(product.value)
        car.value.productId=product.value.id
        mounted.value=true;
        getComments()
    }).catch(err=>{
        console.log("err"+err)
    })
}

function addCar(){
    proToCar(car.value).then(res=>{
        console.log(res)
    }).catch(err=>{
        console.log("err"+err)
    })
}



onMounted(()=>{
    car.value.userId=getUserId()
    getProduct()
})



let url = 'http://101.43.208.136:9090/mall'
const fit = 'contain'
let mounted = ref<boolean>(false);
let showCar = ref<boolean>(false);

interface Comment{
    id: number,
    user_id: number,
    user_name: string,
    img: string,
    product_id: number,
    product_name: string,
    content: string,
    star: number,
    time: Date
}
const comments = ref<Comment[]>();
const user_id = ref(1);
const current = ref(1);//当前页面
const pageSize = ref(5);
const total = ref(1);
const ShowProductName =ref(true);
const imgpath = "http://101.43.208.136:9090/mall/";
function getComments(){
    GetProductComments(product.value.id,current.value,pageSize.value).then(res=>{
        comments.value = res.data.records;
        total.value = res.data.total;
        console.log(comments.value)
        console.log(res)
    }).catch(err=>{
        console.log("error"+err)
    })
}
function handlePageChange(page:number){
    current.value = page
    getComments()
}


</script>

<template>
    <div v-if = "mounted" style="background: white">
        <div style="display: flex">

            <div style="float: left;width: 70%">
                <div style="float: left;margin-top: 30px;margin-left: 90px">
                    <el-image style="float: left;width: 350px; height: 350px; user-select: none;" :src="product.img" :fit="fit"/>
                </div>
                <div style="text-align: left;float: left;margin-left: 30px; margin-top: 30px">
                    <div style="margin-left: 0;color: #666; padding-top: 10px; line-height: 28px; margin-bottom: 5px;">
                        <span style="margin-left: 0">{{product.name}}</span>
                    </div>
                    <br/>

                    <div>
                        <span style="font-size: 16px;">商品价格</span>  <span style="color: red;font-size: 26px">￥{{product.price}}</span>
                    </div>

                    <br/>
                    <div>
                        <span>商品介绍：{{product.intro}}</span>
                    </div>

                    <br/>
                    <div>
                        <span>历史销量：{{product.hisSales}}</span>
                    </div>

                    <br/>
                    <div>
                        <span>在售数量：{{product.stock}}</span>
                    </div>
                    <br/>
                    <div>
                        <span>商品尺寸：{{product.size}}</span>
                    </div>
                    <br/>
                    <div>
                        <span>交易方式：{{product.trading}}</span>
                    </div>
                    <br/>
                    <div style="float: left;">
                        <el-input-number v-model="car.num" :min="1" :max="10"/>
                    </div>
                    <div style="float: left;">
                        <el-button type="danger" @click="showCar=true">添加购物车</el-button>
                    </div>
                </div>
            </div>
            <div style="float: left;width: 30%;margin-top: 30px; display: flex">
                <el-card class="box-card">
                    <template #header>
                        <div class="card-header">
                            <span>店铺：</span>
                            <el-button class="button" text>{{product.userName}}</el-button>
                        </div>
                    </template>
                    <div >
                        <span>商品类型：{{product.type}}</span>
                    </div>
                    <div>
                        <span>购买人数：{{product.userCount}}</span>
                    </div>
                    <div >
                        <span>商品评价：
                            <el-rate
                                v-model="product.star"
                                disabled
                                show-score
                                text-color="#ff9900"
                                score-template="{value} points"
                            />
                        </span>
                    </div>
                    <el-divider/>
                    <div >
                        <el-button type="primary" @click="pushPro(product.userId)">进店逛逛</el-button>
                    </div>
                </el-card>
            </div>

        </div>
        <div >
            <el-divider/>
        </div>
        <div style="margin-top: 30px">
            <el-col :span="22" :push="1" >
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
        </div>
    </div>
    




    <div>
<!--        模态框-->
        <el-dialog
            v-model="showCar"
            title="添加购物车"
            width="30%"
            :before-close="handleClose"
        >
            <template #footer>
                <el-form
                    label-position="left"
                    label-width="100px"
                    style="max-width: 460px"
                >
                    <el-form-item label="商品名">
                        <el-input v-model="product.name" />
                    </el-form-item>
                    <el-form-item label="数量">
                        <el-input v-model="car.num" />
                    </el-form-item>
                    <el-form-item label="价格">
                        <el-input v-model="product.price"/>
                    </el-form-item>
                </el-form>
                <el-button @click="carFinish">确定</el-button>
                <el-button @click="showCar = false">Cancel</el-button>
            </template>
        </el-dialog>

    </div>


</template>

<style scoped>
.product_img{
    float: left;
    width: 200px;
    height: 200px;
}
.dialog-footer button:first-child {
    margin-right: 10px;
}
* {
    box-sizing: border-box;
}

</style>