<template>
    <el-table :data="tableData[0]" height="580" style="width: 100%" :header-cell-style="{
        background: '#eef1f6', color: '#000000', fontWeight: 600}" >
        <el-table-column type="expand">
            <template #default="props">
                <div class="expand">
                    <div>
                        <p>食品ID: {{ props.row.id }}</p>
                        <p>食品名称: {{ props.row.foodname }}</p>
                        <p>食品特点: <span style="margin-left:5px" v-for="item in props.row.foodspecil">{{ item }}</span>
                        </p>
                    </div>
                    <div>
                        <p>食品详情: {{ props.row.fooddetail }}</p>
                        <p>食品类型: {{ props.row.foodtype }}</p>
                    </div>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="食品名称" prop="foodname" align="center" />
        <el-table-column label="食品介绍" prop="fooddetail" align="center" />
        <el-table-column label="评分" align="center">
            <template #default="scope">
                <el-rate v-model="scope.row.pingfen" disabled show-score text-color="#ff9900" />
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
            <template #default="{ $index }">
                <el-button size="small" @click="getIndex($index)">编辑</el-button>
                <el-button size="small" type="danger" @click="dele">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination background layout="slot, prev, pager, next" :total="total" @current-change="change"
        @prev-click="change" @next-click="change" v-model:current-page="currentpage">
        <template #default>
            <div style="color:#333;fontSize:13px">
                共{{ total }}条
            </div>
        </template>
    </el-pagination>
    <el-dialog :model-value="dialogtwo" title="修改食品信息" @close="changeTwo">
        <el-form class="dialog-form" label-width="80px" :rules="rule" ref="formRef" :model="fakeData">
            <el-form-item required label="食品名称" prop="foodname">
                <el-input v-model="fakeData.foodname" />
            </el-form-item>
            <el-form-item label="食品详情">
                <el-input v-model="fakeData.fooddetail" />
            </el-form-item>
            <el-form-item label="食品分类" prop="foodtype">
                <el-select v-model="fakeData.foodtype" :placeholder="fakeData.foodtype">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="食品图片">
                <el-upload class="avatar-uploader" :show-file-list="false" :http-request="changeAva">
                    <img v-if="fakeData.pic" :src="fakeData.pic" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label-width="0">
                <el-table :data="fakeData.guige" :header-cell-style="{ background: '#eef1f6', color: '#333' }">
                    <el-table-column label="规格" prop="name"></el-table-column>
                    <el-table-column label="包装费" prop="moreprice"></el-table-column>
                    <el-table-column label="价格" prop="price"></el-table-column>
                    <el-table-column label="操作">
                        <template #default="{ $index }">
                            <el-button type="danger" :icon="Delete" circle @click="del($index)" />
                        </template>
                    </el-table-column>
                </el-table>
                <el-button style="margin:10px auto 0" type="primary" round @click="handleDialog">添加规格</el-button>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="changeTwo">取消</el-button>
            <el-button type="primary" @click="submit">确定</el-button>
        </template>
    </el-dialog>
    <dialogVue @get-dialog="getDialog" @comit="comit" :dialog="dialog"></dialogVue>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus';
import { AvatarUpload } from '@/mixin/avatar'
import type { baseform, foodForm, foodRule } from '@/assets/type'
import dialogVue from '@/components/dialog.vue';
import { ElMessage as $message } from 'element-plus'
import { updatefood } from '@/server/Interface'
import { getUserList } from '../../mixin/handleData'
import { ref, reactive, watch, inject } from 'vue'
import { Plus, Delete } from '@element-plus/icons-vue';

const reload = inject('reload') as Function

let total = ref<number>(0)

let dialogtwo = ref<boolean>(false)

let dialog = ref<boolean>(false)

let currentpage = 1

const formRef = ref<FormInstance>()

let index = ref<number>()

let tableData = reactive<any[]>([])

let fakeData = reactive<foodForm>({
    foodtype: '',
    foodname: '',
    fooddetail: '',
    pic: '',
    guige: [],
    id: 0
})

const rule = reactive<foodRule>({
    foodname: [
        { required: true, message: '请输入菜品名', trigger: 'blur' },
    ],
    foodtype: [
        { required: true, message: '请选择菜品类型', trigger: 'blur' },
    ],
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

watch(index, (newvalue: any) => {
    fakeData.foodname = tableData[0][newvalue].foodname
    fakeData.fooddetail = tableData[0][newvalue].fooddetail
    fakeData.foodtype = tableData[0][newvalue].foodtype
    fakeData.guige = tableData[0][newvalue].guige
    fakeData.pic = tableData[0][newvalue].foodimg
    fakeData.id = tableData[0][newvalue].id
})


const changeTwo = () => {
    dialogtwo.value = false
}

const getDialog = (flag: boolean) => {
    dialog.value = flag
}

const handleDialog = () => {
    dialog.value = true
}

const comit = (flag: boolean, obj: baseform) => {
    dialog.value = flag
    if (fakeData.guige === null) {
        let arr: any[] = []
        arr.push(obj)
        fakeData.guige = arr
    } else {
        let arr: any[] = []
        fakeData.guige!.forEach(e => {
            arr.push(e)
        });
        arr.push(obj)
        fakeData.guige = arr
    }
}

const getIndex = (i: number) => {
    dialogtwo.value = true
    index.value = i
}

const del = (i: number) => {
    let arr: any[] = []
    fakeData.guige!.forEach(e => {
        arr.push(e)
    });
    arr.splice(i, 1)
    fakeData.guige = arr
}

const changeAva = (e: any) => {
    AvatarUpload(e).then(e => {
        fakeData.pic = e as string
    })
}

const change = () => {
    getUserList(currentpage).then(async e => {
        await tableData.pop()
        total.value = e.total
        const arr = [] as any
        e.tableData.forEach((res: any) => {
            res.guige = JSON.parse(res.guige)
            res.foodspecil = JSON.parse(res.foodspecil)
            arr.push(res)
        });
        tableData.push(arr)
    })
}

const dele = () => {
    $message({
        showClose: true,
        message: '没有权限',
        type: 'info',
        grouping: true,
    })
}

const submit = async () => {
    formRef.value?.validate(async res => {
        if (!res) return
        await updatefood(fakeData)
        dialogtwo.value = false
        reload()
    })
}

change()

</script>

<style scoped lang="less">
.expand {
    display: flex;
    justify-content: space-around;
    padding: 0 20px;
}

.dialog-form {
    border: none;
    min-width: 0;
    margin-top: 0;
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
</style>