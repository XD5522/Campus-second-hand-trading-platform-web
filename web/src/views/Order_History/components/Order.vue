<template>
    <div>
        <!-- 显示模态框 -->
        <div v-if="visible" class="modal-overlay">
            <div class="modal">
                <h2>{{ title }}</h2>
                <P>{{props.order_id}}</P>
                <button @click="closeModal">关闭</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { PropType, defineProps, defineEmits, ref } from 'vue'
import {GetOrderDetail} from "@/api/Order";
import {Detail} from "@/views/Order/type/detail";


const props = defineProps({
    title: {
        type: String as PropType<string>,
    },
    visible: {
        type: Boolean as PropType<boolean>,
        required: true,
    },
    order_id: {
      type: Number as PropType<number>,
      required: true,
    }
})
const OrderDetail = ref<Detail>();
function getOrderDetail(){
    GetOrderDetail(props.order_id).then(res=>{
      OrderDetail.value=res.data
  }).catch(err=>{
    console.log("error"+err)
  })
}

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
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
    width: 800px;
    height: 500px;
}
</style>
