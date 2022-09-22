import HEADER_TYPE from '@/constants/headerType'
import ROUTE from '@/constants/route'

const NurtureMain = () => import('@/pages/nurture/NurtureMain.vue')
const CreateAnomalies = () => import('@/pages/nurture/CreateAnomalies.vue')
const ModifyAnomalies = () => import('@/pages/nurture/ModifyAnomalies.vue')
const CreateOneLineDiary = () => import('@/pages/nurture/CreateOnelineDiary.vue')
const ModifyOneLineDiary = () => import('@/pages/nurture/ModifyOnelineDiary.vue')

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
  },
  {
    path: 'anomalies/modify',
    name: ROUTE.Nurture.Anomalies.Modify,
    component: ModifyAnomalies,
    meta: {
      title: '이상징후 리스트',
      headerType: HEADER_TYPE.NONE,
    },
  },
  {
    path: 'oneline/create',
    name: ROUTE.Nurture.OneLineDiary.Create,
    component: CreateOneLineDiary,
    meta: {
      title: '한 줄 일기 쓰기',
      headerType: HEADER_TYPE.NONE,
    },
  },
  {
    path: 'oneline/modify',
    name: ROUTE.Nurture.OneLineDiary.Modify,
    component: ModifyOneLineDiary,
    meta: {
      title: '한 줄 일기 쓰기',
      headerType: HEADER_TYPE.NONE,
    },
  }
]
