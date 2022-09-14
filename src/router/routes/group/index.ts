import ROUTE from '@/constants/route'

const Group = () => import('@/pages/group/Group.vue')

export default [
  {
    path: '',
    name: ROUTE.Group,
    component: Group,
  },
]
