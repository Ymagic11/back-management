<template>
    <el-dialog :model-value="dialog" title="添加规格" @close="change">
        <el-form class="dialog-form" label-width="80px" :model="dialogform">
            <el-form-item required label="规格" show-message>
                <el-input v-model="dialogform.name" />
            </el-form-item>
            <el-form-item label="包装费">
                <el-input-number v-model="dialogform.moreprice" :min="0" :max="30" controls-position="right" />
            </el-form-item>
            <el-form-item label="价格">
                <el-input-number v-model="dialogform.price" :min="0" :max="30" controls-position="right" />
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="change">取消</el-button>
            <el-button type="primary" @click="addCheckArray">确定</el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import type { baseform } from '../assets/type'

const emit = defineEmits<{
    (e: 'get-dialog', dialog: boolean): void
    (e: 'comit', dialog: boolean, obj: baseform): void
}>()

const props = withDefaults(defineProps<{
    dialog: boolean,
}>(), {
    dialog: () => false,
})

let dialogform = reactive<baseform>({
    name: '默认',
    price: 20,
    moreprice: 1,
})

const change = () => {
    emit('get-dialog', false)
}

const addCheckArray = () => {
    let obj = {
        name: dialogform.name,
        price: dialogform.price,
        moreprice: dialogform.moreprice,
    }
    emit('comit', false, obj)
}
</script>

<style scoped lang="less">
.dialog-form {
    border: none;
    min-width: 0;
    margin-top: 0;
}
</style>