import ROUTE from '@/constants/route.json'

const Group = () => import('@/pages/group/Group.vue')

export default [
  {
    path: '',
    name: ROUTE.Group,
    component: Group,
  },
]
