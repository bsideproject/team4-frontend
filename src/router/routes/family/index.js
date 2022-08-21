import ROUTE from '@/constants/route.json'

const Family = () => import('@/pages/family/Family.vue')

export default [
    {
        path: '',
        name: ROUTE.Family,
        component: Family,
    }
]