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
const userId = ref(1)


let car = ref<Car>({
    productId:0,
    userId:0,
    num:1,
});

import { ElMessageBox } from 'element-plus'
import {Car} from "@/views/product/type/car";

function carFinish(){
    addCar()
    showCar.value=false;
    getProduct()
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
    getProduct()
})



let url = 'http://101.43.208.136:9090/mall'
const fit = 'contain'
let mounted = ref<boolean>(false);
let showCar = ref<boolean>(false);



</script>

<template>
    <div v-if = "mounted" style="background: white">
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
                    <span>{{product.intro}}</span>
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
                <span style="color: #666666">——————————————————</span>
                <div >
                    <el-button type="primary">进店逛逛</el-button>
                    <el-button type="warning">举报</el-button>
                </div>
            </el-card>
        </div>
        <div class="comment">

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