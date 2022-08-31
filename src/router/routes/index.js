import ROUTE from '@/constants/route.json'
import HEADER_TYPE from '@/constants/headerType.json'

import LoginRouter from '@routes/login/index.js'
import SettingRouter from '@routes/setting/index.js'
import GroupRouter from '@routes/group/index.js'
import PetRouter from '@routes/pet/index.js'
import ChecklistRouter from '@routes/checklist/index.js'

const Main = () => import('@/pages/main/Main.vue')
const LoginPage = () => import('@pages/login/LoginPage.vue')
const SettingPage = () => import('@pages/setting/SettingPage.vue')
const Group = () => import('@pages/group/Group.vue')
const quickNote = () => import('@pages/quickNote/quickNote.vue')
// const CreateProfile = () => import('@pages/profile/CreateProfile.vue')
const PetPage = () => import('@pages/pet/CreatePet.vue')
const ChecklistPage = () => import('@pages/checklist/ChecklistPage.vue')

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
    }
  },
  {
    path: '/quickNote',
    component: quickNote,
  },
  {
  path: '/pet',
    component: PetPage,
    children: PetRouter,
    meta: {
      auth: true,
      title: '그룹 정보',
      headerType: HEADER_TYPE.MORE
    }
  },
  {
  path: '/checklist',
    component: ChecklistPage,
    children: ChecklistRouter,
    meta: {
      auth: true,
      headerType: HEADER_TYPE.NONE
    }
  }
  // {
  //   path: '/profile/create',
  //   component: CreateProfile,
  //   meta: {
  //     auth: true,
  //     title: '펫 등록하기',
  //     headerType: HEADER_TYPE.MORE
  //   }
  // }
]