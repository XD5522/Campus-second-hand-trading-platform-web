<!--在父组件中设定行点击方法,当触发行点击时,查询对应行的详细信息,封装到props中,传入模态框组件进行详细信息的显示-->

<template>
    <div>
        <el-button @click="openmodal()">打开模态框</el-button>

        <modal :visible="visible"
               :title="title"
               :message="message"
               @update:visible="visible = $event" />
        <!--@update:visible="visible = $event"来监视组件中的'update:visible'事件,当事件发生时修改visible属性的值-->
    </div>

</template>

<script lang="ts" setup>
import { defineComponent, ref } from 'vue'
import Modal from '@/views/ModalTest/components/ChildComponentTest.vue'

const visible = ref(false)
const title = ref('标题')
const message = ref('这是一个模态框')

function openmodal(){
    console.log(visible.value)
    visible.value=true;
}


defineComponent({
    components: { Modal },
    setup() {
        //将 visible、title 和 message 三个变量返回
        //子组件 Modal 是通过 teleport 挂载到 body 元素下的，因此它实际上是一个独立的组件，并不受父组件的包裹影响
        //因此可以直接使用 {{title}} 来显示 title 的值，而不需要在子组件中定义。
        return { visible, title, message }
    }
})
</script>
