<template>
    <el-page-header>
        <template #breadcrumb>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item @click="backhome">
                    <a href="#">首页</a>
                </el-breadcrumb-item>
                <el-breadcrumb-item v-if="store.fullname" to="#">
                    <slot></slot>
                </el-breadcrumb-item>
                <el-breadcrumb-item v-if="store.fullname">
                    <slot name="three"></slot>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </template>
        <template #extra>
            <el-dropdown trigger="hover">
                <el-avatar>
                    <template #default>
                        <img v-if="img" :src="img" class="avatar" />
                        <el-icon v-else>
                            <UserFilled />
                        </el-icon>
                    </template>
                </el-avatar>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="gosetting">
                            <div style="display: flex; align-items: center">
                                <el-icon>
                                    <Setting />
                                </el-icon>
                                <span>设置</span>
                            </div>
                        </el-dropdown-item>
                        <el-dropdown-item @click="out">
                            <div style="display: flex; align-items: center">
                                <el-icon>
                                    <SwitchButton />
                                </el-icon>
                                <span>退出</span>
                            </div>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </template>
    </el-page-header>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import router from '../router/index';
import { useCounterStore } from '../stores/counter'
import { SwitchButton, Setting, UserFilled } from '@element-plus/icons-vue'

const store = useCounterStore()

let info = reactive<any>({})

let img = ref<string>()

info = JSON.parse(localStorage.getItem('info')!)

img.value = info.user_pic

window.addEventListener('setItem', (e: any) => {
    if (e.key === 'info') {
        img.value = JSON.parse(e.newValue).user_pic
    }
})

const backhome = () => {
    router.push('/index')
}

const gosetting = () => {
    router.push('/index/setting')
}

const out = () => {
    localStorage.clear()
    router.push('/login')
}
</script>

<style scoped lang="less">
.el-page-header {
    background-color: #eff2f7;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;

    .el-breadcrumb {
        font-size: 13px;
    }

    :deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner) {
        color: #97a8be;
    }

    .header-title {
        color: #97a8be;
    }

    :deep(.el-page-header__back) {
        display: none;
    }

    .el-avatar {
        margin-right: 20px;
    }

    :deep(.el-page-header__breadcrumb) {
        margin-left: 20px;
        margin-bottom: 0;
    }

    :deep(.is-link) {
        font-weight: 550;
    }

    .avatar {
        width: 40px;
        height: 45px;
        border-radius: 50%;
        background-color: #fff;
    }
}
</style>