<template>
    <div class="contain">
      <div class="title" @click="checkform">
        <a href="#">{{ usercheck ? 'Be A Business?' : 'Be A User?' }}</a>
      </div>
      <el-form ref="ruleFormRef" status-icon :rules="rule" :model="form">
        <el-form-item label="Username" prop="username" v-if="usercheck">
          <el-input autocomplete="off" placeholder="用户名" v-model="form.username" />
        </el-form-item>
        <el-form-item label="Business" prop="bname" v-if="!usercheck">
          <el-input autocomplete="off" placeholder="商家名" v-model="form.bname"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input type="password" autocomplete="off" placeholder="密码" v-model="form.password" show-password />
        </el-form-item>
        <el-form-item label="Code" prop="code" v-if="!usercheck">
          <el-input type="password" autocomplete="off" placeholder="商家码(随便写)" v-model="form.code" show-password />
        </el-form-item>
        <el-form-item class="el-btn">
          <el-button type="primary" @click="login" round>登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { FormInstance } from 'element-plus';
  import { ref, reactive } from 'vue';
  import router from '../router/index';
  import type { Form, Rule } from '../assets/type'
  import { register, Login, buslogin, regbusiness } from '../server/Interface'
  
  let usercheck = ref<boolean>(true)
  
  let ruleFormRef = ref<FormInstance>()
  
  const form = reactive<Form>({
    username: '',
    bname: '',
    password: '',
    code: ''
  })
  
  const rule = reactive<Rule>({
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 3, max: 7, message: '用户名长度在3-7', trigger: 'blur' },
    ],
    bname: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 3, max: 7, message: '用户名长度在3-7', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 3, max: 12, message: '密码长度在3-12', trigger: 'blur' }
    ],
    code: [
      { required: true, message: '请输入商家码', trigger: 'blur' },
      { min: 3, max: 10, message: '商家码长度在3-10', trigger: 'blur' }
    ],
  })
  
  const login = () => {
    ruleFormRef.value?.validate(async res => {
      if (!res) return
      if (usercheck.value) {
        const newform = form
        await register(newform)
        await Login(newform)
        router.replace('/index')
      } else {
        const newform = form
        await regbusiness(newform)
        await buslogin(newform)
        router.replace('/index')
      }
    })
  }
  
  const checkform = () => {
    usercheck.value = !usercheck.value
    ruleFormRef.value?.resetFields()
  }
  
  </script>
  
  <style scoped lang="less">
  .contain {
    height: 100%;
    background-color: #545c64;
    position: relative;
  
    .title {
      position: absolute;
      top: 27%;
      left: 45%;
      color: #fff;
      font-size: 22px;
      font-weight: 600;
    }
  
    .el-form {
      background-color: #fff;
      width: 400px;
      padding: 10px;
      border: 1px solid #000;
      border-radius: 5px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  
  .el-btn {
    :deep(.el-form-item__content) {
      justify-content: center;
    }
  }
  </style>