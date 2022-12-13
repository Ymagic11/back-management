<template>
    <el-table :data="data[0]" height="500" style="width: 100%" :header-cell-style="{
        background: '#eef1f6', color: '#000000', fontWeight: 600}">
        <el-table-column label="#" type="index" min-width="50" />
        <el-table-column label="注册时间" min-width="100">
            <template #default="scope">
                <div style="display: flex; align-items: center">
                    <el-icon>
                        <Timer />
                    </el-icon>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="用户姓名" min-width="100">
            <template #default="scope">
                <div style="display: flex; align-items: center">
                    <el-icon>
                        <UserFilled />
                    </el-icon>
                    <span style="margin-left: 10px">{{ scope.row.username }}</span>
                </div>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination background layout="slot, prev, pager, next" :total="num" @current-change="change"
        @prev-click="change" @next-click="change"
        v-model:current-page="currentpage">
        <template #default>
            <div style="color:#333;fontSize:13px">
                共{{ num }}条
            </div>
        </template>
    </el-pagination>
</template>

<script setup lang="ts">
import { UserFilled, Timer } from '@element-plus/icons-vue';
import { reactive, ref } from 'vue';
import { getUserList } from '../../mixin/handleData'

let currentpage = 1

let data = reactive<any[]>([])

let num = ref<number>(0)

const change = () => {
    getUserList(currentpage, 1).then(e => {
        data.pop()
        data.push(e.tableData)
        num.value = e.total
    })
}

change()

</script>

<style scoped>

</style>