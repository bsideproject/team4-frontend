import ROUTE from '@/constants/route.json'

const Login = () => import('@/pages/login/Login.vue')

export default [
    {
        path: '',
        name: ROUTE.Login,
        component: Login,
        auth: false
    }
]