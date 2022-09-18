import ROUTE from '@/constants/route'

const Group = () => import('@/pages/group/Group.vue')
const Invite = () => import('@/pages/group/Invite.vue')

export default [
  {
    path: '',
    name: ROUTE.Group.Info,
    component: Group,
  },
  {
    path: 'invite/:userId',
    name: ROUTE.Group.Invite,
    component: Invite,
  }
]
