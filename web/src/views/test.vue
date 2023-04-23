<template>
    <div>
        <button @click="visible = true">打开模态框</button>
        <modal :visible="visible" :title="title" :message="message" @update:visible="visible = $event" />
    </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref } from 'vue'
import Modal from '@/components/ChildComponentTest.vue'

const visible = ref(false)
const title = ref('标题')
const message = ref('这是一个模态框')

defineComponent({
    components: { Modal },
    setup() {
        return { visible, title, message }
    }
})
</script>
