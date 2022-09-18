import HEADER_TYPE from '@/constants/headerType'
import ROUTE from '@/constants/route'

const NurtureMain = () => import('@/pages/nurture/NurtureMain.vue')
const CreateAnomalies = () => import('@/pages/nurture/CreateAnomalies.vue')

export default [
  {
    path: '',
    name: ROUTE.Nurture.Main,
    component: NurtureMain,
  },
  {
    path: 'anomalies/create',
    name: ROUTE.Nurture.Anomalies.Create,
    component: CreateAnomalies,
    meta: {
      title: '이상징후 리스트',
      headerType: HEADER_TYPE.NONE,
    },
  }
]
