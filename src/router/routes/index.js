import ROUTE from '@/constants/route.json'
import HEADER_TYPE from '@/constants/headerType.json'

import LoginRouter from '@routes/login/index.js'
import SettingRouter from '@routes/setting/index.js'
import GroupRouter from '@routes/group/index.js'

const Main = () => import('@/pages/checklist/ChecklistPage')
const LoginPage = () => import('@pages/login/LoginPage.vue')
const SettingPage = () => import('@pages/setting/SettingPage.vue')
const Group = () => import('@pages/group/Group.vue')

export default [
  {
    path: '/',
    name: ROUTE.Main,
    component: Main,
    meta: {
      headerType: HEADER_TYPE.MAIN
    }
  },
  {
    path: '/login',
    component: LoginPage,
    children: LoginRouter,
    meta: {
      title: '로그인',
      headerType: HEADER_TYPE.NONE
    }
  },
  {
    path: '/setting',
    component: SettingPage,
    children: SettingRouter,
    meta: {
      title: '설정',
      headerType: HEADER_TYPE.NONE
    }
  },
  {
    path: '/group',
    component: Group,
    children: GroupRouter,
    meta: {
      title: '그룹 정보',
      headerType: HEADER_TYPE.MORE
    }
  }
]