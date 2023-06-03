<script lang="ts" setup>
import Vue, {onBeforeMount, onMounted, ref} from 'vue';
import {useRoute, useRouter} from "vue-router";
import  { product } from "@/views/product/type/Product";
import {getProductById} from "@/api/product";
import { UploadFilled } from '@element-plus/icons-vue'
const product = ref<product>();
const route = useRoute()


import { ElMessageBox } from 'element-plus'

function upImgFinish(){
    clickImg.value=false;
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
    console.log(id)
    getProductById(id).then(res=>{
        product.value = res.data
        product.value.img=url+product.value.img
        console.log(product.value.img)
        console.log(product.value)
        mounted.value=true;
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
let clickImg = ref<boolean>(false);

</script>

<template>
    <div v-if = "mounted" class = "product_info">
        <div class = "product_img">
            <el-image style="width: 350px; height: 350px; user-select: none;" :src="product.img" :fit="fit" @click="clickImg=true"/>
        </div>

    </div>
    <div>
<!--        模态框-->
        <el-dialog
            v-model="clickImg"
            title="修改图片"
            width="30%"
            :before-close="handleClose"
        >
            <template #footer>
                <span class="dialog-footer">
                  <el-upload
                      class="upload-demo"
                      drag
                      action="http://localhost:8080/product/updateImg?id=1"
                      multiple
                      :on-success="upImgFinish"
                  >
                      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                      <div class="el-upload__text">
                          Drop file here or <em>click to upload</em>
                      </div>
                      <el-button @click="clickImg = false">Cancel</el-button>
                  </el-upload>

                </span>
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
</style>