<template>
    <div>
        <!-- 显示模态框 -->
        <div v-if="visible" class="modal-overlay">
            <div class="modal">
                <el-form :model="product_form" :rules="rule" ref="formRef">
                    <el-form-item label="商品名称" prop="product_name">
                        <el-input v-model="product_form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="商品介绍" prop="product_intro">
                        <el-input v-model="product_form.intro"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格" prop="product_price">
                        <el-input-number v-model.number="product_form.price" :min="1" :precision="2"></el-input-number>
                    </el-form-item>
                    <el-form-item label="商品库存" prop="product_stock">
                        <el-input-number v-model.number="product_form.stock" :min="1" :precision="0"></el-input-number>
                    </el-form-item>
                    <el-form-item label="商品尺寸" prop="product_size">
                        <el-input v-model="product_form.size"></el-input>
                    </el-form-item>
                    <el-form-item label="商品类型" prop="product_type">
                        <el-input v-model="product_form.type"></el-input>
                    </el-form-item>
                    <el-form-item label="交易方式" prop="product_">
                        <el-select v-model="product_form.trading" placeholder="选择交易方式">
                            <el-option label="快递运输" :value="option1"></el-option>
                            <el-option label="线下交易" :value="option2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm()">提交</el-button>
                        <el-button @click="closeModal">关闭</el-button>
                    </el-form-item>
                </el-form>

            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { PropType, defineProps, defineEmits, ref } from 'vue'
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus';
import {Product} from "@/views/User_Zone/type/Product";
//TODO 商品图片上传

const props = defineProps({
    visible: {
        type: Boolean as PropType<boolean>,
        required: true,
    },
    product_form: {
        type: Object as PropType<Product>,
        required: true
    }
})

//获取父组件中传递的值
const product_form = ref<Product>(props.product_form);
//定义el-select中使用的option
const option1 = ref("快递运输");
const option2 = ref("线下交易");
const rule = {
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
function submitForm(this: any){
    emits('AddProduct');
}



//定义关闭模态框的方法
const emits = defineEmits(['update:visible'])
const closeModal = () => {
    emits('update:visible', false)
}
/**
 * 把props和closeModal暴露给父组件,允许父组件修改它的值
 * 父组件通过在模态框组件上监听 update:visible 事件，当模态框需要关闭时，触发 update:visible 事件，从而调用模态框组件中暴露出来的 closeModal 函数来关闭模态框。
 */
defineExpose({
    props,
    closeModal,
})
</script>
<style>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;

}
.modal {
    background-color: white;
    padding:50px;
    border-radius: 5px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
    width: 700px;
    height: 400px;
}
.modal-form{
    width: 100px;
    margin-left: auto;
}
.align-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
</style>
