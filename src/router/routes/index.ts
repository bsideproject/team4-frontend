import ROUTE from '@/constants/route'
import HEADER_TYPE from '@/constants/headerType'

import LoginRouter from '@/router/routes/login/index'
import SettingRouter from '@/router/routes/setting/index'
import GroupRouter from '@/router/routes/group/index'
import PetRouter from '@/router/routes/pet/index'
import ChecklistRouter from '@/router/routes/checklist/index'

const Main = () => import('@/pages/main/Main.vue')
const LoginPage = () => import('@pages/login/LoginPage.vue')
const SettingPage = () => import('@pages/setting/SettingPage.vue')
const GroupPage = () => import('@pages/group/GroupPage.vue')
const PetPage = () => import('@pages/pet/PetPage.vue')
const ChecklistPage = () => import('@pages/checklist/ChecklistPage.vue')

export default [
  {
    path: '/',
    name: ROUTE.Main,
    component: Main,
    meta: {
      auth: true,
      headerType: HEADER_TYPE.MAIN,
    },
  },
  {
    path: '/login',
    component: LoginPage,
    children: LoginRouter,
    meta: {
      auth: false,
      title: '로그인',
      headerType: HEADER_TYPE.LOGIN,
    },
  },
  {
    path: '/setting',
    component: SettingPage,
    children: SettingRouter,
    meta: {
      auth: true,
      title: '설정',
      headerType: HEADER_TYPE.NONE,
    },
  },
  {
    path: '/group',
    component: GroupPage,
    children: GroupRouter,
    meta: {
      auth: true,
      title: '그룹 정보',
      headerType: HEADER_TYPE.MORE,
    },
  },
  {
    path: '/pet',
    component: PetPage,
    children: PetRouter,
    meta: {
      auth: true,
      title: '펫 정보',
    },
  },
  {
    path: '/checklist',
    component: ChecklistPage,
    children: ChecklistRouter,
    meta: {
      auth: true,
      headerType: HEADER_TYPE.NONE,
    },
  },
]
