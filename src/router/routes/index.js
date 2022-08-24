import ROUTE from '@/constants/route.json'
import HEADER_TYPE from '@/constants/headerType.json'

import LoginRouter from '@routes/login/index.js'
import SettingRouter from '@routes/setting/index.js'
import GroupRouter from '@routes/group/index.js'

const Main = () => import('@/pages/checklist/ChecklistPage')
const LoginPage = () => import('@pages/login/LoginPage.vue')
const SettingPage = () => import('@pages/setting/SettingPage.vue')
const Group = () => import('@pages/group/Group.vue')
const quickNote = () => import('@pages/quickNote/quickNote.vue')

export default [
  {
    path: '/',
    name: ROUTE.Main,
    component: Main,
    meta: {
      auth: true,
      headerType: HEADER_TYPE.MAIN
    }
  },
  {
    path: '/login',
    component: LoginPage,
    children: LoginRouter,
    meta: {
      auth: false,
      title: '로그인',
      headerType: HEADER_TYPE.NONE
    }
  },
  {
    path: '/setting',
    component: SettingPage,
    children: SettingRouter,
    meta: {
      auth: true,
      title: '설정',
      headerType: HEADER_TYPE.NONE
    }
  },
  {
    path: '/group',
    component: Group,
    children: GroupRouter,
    meta: {
      auth: true,
      title: '그룹 정보',
      headerType: HEADER_TYPE.MORE
    },
    children: SettingRouter
  },
  {
    path: '/quickNote',
    component: quickNote,
  }
]