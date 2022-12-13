<template>
    <el-row>
        <el-col :span="15">
            <header style="text-align:center;font-size:18px">添加食品</header>
            <el-form ref="formRef" label-width="100px" :model="form" :rules="rule">
                <el-form-item prop="foodtype" label="食品类型" show-message required>
                    <el-select v-model="form.foodtype" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item prop="foodname" show-message required label="食品名称">
                    <el-input v-model="form.foodname" />
                </el-form-item>
                <el-form-item label="食品详情">
                    <el-input v-model="form.fooddetail" />
                </el-form-item>
                <el-form-item label="上传食品图片">
                    <el-upload class="avatar-uploader" :show-file-list="false" :http-request="changeAva">
                        <img v-if="form.pic" :src="form.pic" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
                <el-form-item label="食品特点">
                    <el-select v-model="form.foodspecil" multiple tag-type="warning" placeholder="请选择">
                        <el-option v-for="item in optionstwo" :key="item.value" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="食品规格">
                    <el-radio-group v-model="radio">
                        <el-radio label="1">单规格</el-radio>
                        <el-radio @click="push" label="2">多规格</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="价格" v-if="radio == '1'">
                    <el-input-number v-model="baseform.price" :min="0" :max="30" />
                </el-form-item>
                <el-form-item label="包装费" v-if="radio == '1'">
                    <el-input-number v-model="baseform.moreprice" :min="0" :max="30" />
                </el-form-item>
                <el-form-item label-width="0" v-if="radio == '2'">
                    <el-button style="margin:0 auto 10px" type="primary" round @click="open">添加规格</el-button>
                    <el-table :data="form.guige" :header-cell-style="{ background: '#eef1f6', color: '#333' }"
                        >
                        <el-table-column label="规格" prop="name"></el-table-column>
                        <el-table-column label="包装费" prop="moreprice"></el-table-column>
                        <el-table-column label="价格" prop="price"></el-table-column>
                        <el-table-column label="操作">
                            <template #default="{ $index }">
                                <el-button type="danger" :icon="Delete" circle @click="del($index)" />
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
                <dialogvue @get-dialog="getDialog" @comit="comit" :dialog="dialog"></dialogvue>
            </el-form>
            <footer style="text-align:center">
                <el-button size="large" type="primary" @click="submit">确认添加食品</el-button>
            </footer>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus';
import dialogvue from '@/components/dialog.vue';
import { Plus, Delete } from '@element-plus/icons-vue';
import { inject, reactive, ref, toRefs } from 'vue';
import type { foodForm, foodRule, baseform } from '../assets/type'
import { AvatarUpload } from '../mixin/avatar'
import { addgoods } from '../server/Interface'

let formRef = ref<FormInstance>()
let radio = ref<string>('1')
let dialog = ref<boolean>(false)
let baseform = reactive<baseform>({
    name: '默认',
    price: 20,
    moreprice: 1,
})

const options = reactive([
    {
        value: '中餐',
        label: '中餐',
    },
    {
        value: '西餐',
        label: '西餐',
    },
    {
        value: '狗屎吃不吃',
        label: '狗屎吃不吃',
    },
])

const optionstwo = reactive([
    { value: '经典' }, { value: '新品' }
])

let form = reactive<foodForm>({
    foodtype: '',
    foodname: '',
    fooddetail: '',
    foodspecil: '',
    pic: '',
    guige: []
})

const rule = reactive<foodRule>({
    foodname: [
        { required: true, message: '请输入菜品名', trigger: 'blur' },
    ],
    foodtype: [
        { required: true, message: '请选择菜品类型', trigger: 'blur' },
    ],
})

const reload = inject('reload') as Function

const getDialog = (flag: boolean) => {
    dialog.value = flag
}

const open = () => {
    dialog.value = true
}

const changeAva = (e: any) => {
    AvatarUpload(e).then(e => {
        form.pic = e as string
    })
}

const del = (i: number) => {
    form.guige!.splice(i, 1)
}

const push = () => {
    if (form.guige!.length < 1) {
        form.guige?.push(baseform)
    }
}

const comit = (flag: boolean, obj: baseform) => {
    dialog.value = flag
    form.guige!.push(obj)
}

const submit = () => {
    formRef.value?.validate(async res => {
        if (!res) return
        else {
            if (form.guige!.length < 1) {
                form.guige!.push(baseform)
            }
            await addgoods(form)
            reload()
        }
    })
}
</script>

<style scoped lang="less">
.el-col {
    margin: 0 auto;

    .el-form {
        padding: 10px;
        border: 1px solid #eaeefb;
        min-width: 400px;
        margin-top: 20px;

        :deep(.el-form-item).el-form-item {
            margin-bottom: 20px;

            .el-form-item__label {
                font-size: 14px;
                color: #333;
            }
        }
    }

    .avatar-uploader .avatar {
        width: 130px;
        height: 130px;
        display: block;
    }

    :deep(.avatar-uploader .el-upload) {
        border: 1px dashed #666;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    :deep(.avatar-uploader .el-upload:hover) {
        border-color: cyan;
    }

    .el-icon.avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        text-align: center;
    }
}
</style>