import ROUTE from '@/constants/route.json'

import LoginRouter from '@/router/routes/login/index.js'

const MainPage = () => import('@/pages/main/MainPage.vue')
const LoginPage = () => import('@/pages/login/LoginPage.vue')

export default [
  {
    path: '/',
    name: ROUTE.MainPage,
    component: MainPage,
    auth: false,
  },
  {
    path: '/login',
    component: LoginPage,
    children: LoginRouter
  }
]