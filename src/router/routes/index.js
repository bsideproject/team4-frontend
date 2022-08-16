import ROUTE from '@/constants/route.json'

import LoginRouter from '@routes/login/index.js'
import SettingRouter from '@routes/setting/index.js'

const Main = () => import('@/pages/checklist/ChecklistPage')
const LoginPage = () => import('@pages/login/LoginPage.vue')
const SettingPage = () => import('@pages/setting/SettingPage.vue')

export default [
  {
    path: '/',
    name: ROUTE.Main,
    component: Main,
    auth: false,
  },
  {
    path: '/login',
    component: LoginPage,
    children: LoginRouter
  },
  {
    path: '/setting',
    component: SettingPage,
    children: SettingRouter
  }
]