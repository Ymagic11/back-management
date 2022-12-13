<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <div class="title">{{ !info.code ? '用户设置' : '商家设置' }}</div>
            </el-header>
            <el-main>
                <div class="contain">
                    <div class="attribute">姓名:<span class="ml-2">{{ !info.code ? info.username : info.bname }}</span>
                    </div>
                    <div class="attribute">注册时间:<span class="ml-2">{{ info.date }}</span></div>
                    <div class="attribute">权限:<span class="ml-2">{{ !info.code ? '用户' : '商家' }}</span></div>
                    <div class="attribute" v-if="info.code">商家码:<span class="ml-2">{{ info.code }}</span></div>
                    <div class="attribute">ID:<span class="ml-2">{{ info.id }}</span></div>
                    <div class="attribute">
                        <span>更新头像:</span>
                        <el-upload class="avatar-uploader" :show-file-list="false" :http-request="submit">
                            <img v-if="img" :src="img" class="avatar" />
                            <el-icon v-else class="avatar-uploader-icon">
                                <Plus />
                            </el-icon>
                        </el-upload>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>
  

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue';
import { reactive, ref } from 'vue';
import { AvatarUpload } from '../mixin/avatar'

let info = reactive<any>({})

let img = ref<string>()

info = JSON.parse(localStorage.getItem('info')!)

img.value = info.user_pic

window.addEventListener('setItem', (e: any) => {
    if (e.key === 'info') {
        img.value = JSON.parse(e.newValue).user_pic
    }
})


const submit = (e: any) => {
    AvatarUpload(e, info)
}
</script>

<style lang="less" scoped>
.title {
    position: absolute;
    top: 100px;
    left: 45%;
    font-size: 24px;
    color: #333;
    font-weight: 700;
}

.contain {
    position: relative;
    width: 60%;
    background-color: #f9fafc;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 0 auto;
    padding-left: 20px;

    .attribute {
        font-size: 16px;
        color: #333;
    }

    .ml-2 {
        margin-left: 5px;
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
        margin-top: 10px;
        background-color: #fff;
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