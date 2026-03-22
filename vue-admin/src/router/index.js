import { initDynamicRoutes } from '@/router/dynamic-routes'
import { useUserStore } from '@/stores/user'
import { useAuth } from '@/utils/auth'
import { setupUrsaRouterGuard } from 'ursacomponents'
import { createRouter, createWebHistory } from 'vue-router'

import Layout from '@/layout/index.vue'
import Login from '@/views/login/index.vue'

const { getToken } = useAuth()

const staticRoutes = [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/',
        name: 'layout',
        component: Layout,
        redirect: '/dashboard', // 访问根路径时重定向到首页
        children: []
    }
]


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: staticRoutes
})

// 设置前置路由守卫
setupUrsaRouterGuard(router, {
    getToken,
    getUserStore: useUserStore,
    initDynamicRoutes,
    loginPath: '/login',
    debug: true
})

export default router