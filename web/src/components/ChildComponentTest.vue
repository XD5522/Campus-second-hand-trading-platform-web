<template>
    <div>
        <!-- 显示模态框 -->
        <div v-if="visible" class="modal-overlay">
            <div class="modal">
                <h2>{{ title }}</h2>
                <p>{{ message }}</p>
                <button @click="closeModal">关闭模态框</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { PropType, defineProps, defineEmits } from 'vue'

interface Props {
    title: string,
    message: string,
    visible: boolean
}

const props = defineProps({
    title: {
        type: String as PropType<string>,
    },
    message: {
        type: String as PropType<string>,
    },
    visible: {
        type: Boolean as PropType<boolean>,
        required: true,
    }
})

const emits = defineEmits(['update:visible'])

const closeModal = () => {
    emits('update:visible', false)
}

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
}
</style>
