<template>
    <el-aside width="250px">
        <el-scrollbar>
            <el-menu text-color="#fff" background-color="#545c64" :default-active="store.defaultactive"
                active-text-color="#ffd04b">
                <router-link to="/index">
                    <el-menu-item index="1">
                        <template #title>
                            <el-icon>
                                <HomeFilled />
                            </el-icon>首页
                        </template>
                    </el-menu-item>
                </router-link>
                <el-sub-menu index="2">
                    <template #title>
                        <el-icon>
                            <Document />
                        </el-icon>
                        <span>数据管理</span>
                    </template>
                    <router-link to="/index/dataman">
                        <el-menu-item index="2-1">用户列表</el-menu-item>
                    </router-link>
                    <router-link to="/index/busman">
                        <el-menu-item index="2-2">商家列表</el-menu-item>
                    </router-link>
                    <router-link to="/index/foodman">
                        <el-menu-item index="2-3">菜品列表</el-menu-item>
                    </router-link>
                </el-sub-menu>
                <el-sub-menu index="3">
                    <template #title>
                        <el-icon>
                            <Plus />
                        </el-icon>
                        <span>添加数据</span>
                    </template>
                    <router-link to="/index/addGoods">
                        <el-menu-item index="3-1">添加商品</el-menu-item>
                    </router-link>
                </el-sub-menu>
                <el-sub-menu index="4">
                    <template #title>
                        <el-icon>
                            <Star />
                        </el-icon>
                        <span>图表</span>
                    </template>
                    <router-link to="/index/tubiao">
                        <el-menu-item index="4-1">用户分布</el-menu-item>
                    </router-link>
                </el-sub-menu>
                <el-sub-menu index="5">
                    <template #title>
                        <el-icon>
                            <Setting />
                        </el-icon>
                        <span>设置</span>
                    </template>
                    <router-link to="/index/setting">
                        <el-menu-item index="5-1">头像设置</el-menu-item>
                    </router-link>
                </el-sub-menu>
            </el-menu>
        </el-scrollbar>
    </el-aside>
</template>

<script setup lang="ts">
import {Star,Setting,Plus,Document,HomeFilled} from '@element-plus/icons-vue'
import { useCounterStore } from '../stores/counter'

const store = useCounterStore()
</script>

<style scoped>
.el-aside {
    background-color: #545c64;
}

:deep(.el-menu .el-menu--inline) {
    background-color: #666;
}
</style>