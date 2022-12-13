import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { useCounterStore } from '../stores/counter'
import { ElMessage as $message } from 'element-plus'
import { handleToken } from '@/mixin/handleToken'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //history:createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: () => import('@/views/login.vue'), name: 'login' },
    {
      path: '/index', component: () => import('@/views/index.vue'), name: 'index', redirect: '/index/dataana', children: [
        { path: 'dataana', component: () => import('@/views/dataAna.vue'), meta: { index: '1', info: '首页' } },
        { path: 'dataman', component: () => import('@/views/dataman/dataMan.vue'), meta: { index: '2-1', info: '用户列表', title: '数据管理' } },
        { path: 'busman', component: () => import('@/views/dataman/busMan.vue'), meta: { index: '2-2', info: '商家列表', title: '数据管理' } },
        { path: 'addGoods', component: () => import('@/views/addgoods.vue'), meta: { index: '3-1', info: '添加商品', title: '添加数据' } },
        { path: 'foodman', component: () => import('@/views/dataman/foodMan.vue'), meta: { index: '2-3', info: '菜品列表', title: '数据管理' } },
        { path: 'tubiao', component: () => import('@/views/tubiao.vue'), meta: { index: '4-1', info: '用户分布', title: '图表' } },
        { path: 'setting', component: () => import('@/views/setting.vue'), meta: { index: '5-1', info: '头像设置', title: '设置' } }
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const res = handleToken()
  if (!res && token) {
    localStorage.clear()
    if (to.path === '/login') {
      $message({
        showClose: true,
        grouping: true,
        message: '登录已过期,请重新登录',
        type: 'error'
      })
      next()
    } else {
      $message({
        showClose: true,
        grouping: true,
        message: '登录已过期,请重新登录',
        type: 'error'
      })
      return next('/login')
    }
  } else if (res && token) {
    if (to.path === '/login') {
      $message({
        showClose: true,
        grouping: true,
        message: '检测到您之前已登录,已为您自动登录',
        type: 'success'
      })
      return next('/index')
    } else {
      useCounterStore().setfull(to.meta.title as string)
      useCounterStore().setbase(to.meta.info as string)
      useCounterStore().setAc(to.meta.index as string)
      next()
    }
  } else {
    localStorage.clear()
    if (to.path === '/login') {
      next()
    } else return next('/login')
  }
})

export default router
