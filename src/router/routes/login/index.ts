import ROUTE from '@/constants/route'

const Login = () => import('@/pages/login/Login.vue')
const Oauth2 = () => import('@/pages/login/Oauth2.vue')

export default [
  {
    path: '',
    name: ROUTE.Login,
    component: Login,
  },
  {
    path: 'oauth2',
    name: 'Oauth2',
    component: Oauth2,
  },
]
