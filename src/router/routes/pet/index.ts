import ROUTE from '@/constants/route'
import HEADER_TYPE from '@/constants/headerType'

const CreatePet = () => import('@/pages/pet/CreatePet.vue')
const ModifyPet = () => import('@/pages/pet/ModifyPet.vue')
const PetProfile = () => import('@/pages/pet/PetProfile.vue')
const PetShare = () => import('@/pages/pet/PetShare.vue')

export default [
  {
    path: 'create',
    name: ROUTE.Pet.Create,
    component: CreatePet,
    meta: {
      title: '펫 등록하기',
      headerType: HEADER_TYPE.NONE,
    },
  },
  {
    path: 'modify/:petId',
    name: ROUTE.Pet.Modify,
    component: ModifyPet,
    meta: {
      title: '펫 프로필 수정',
      headerType: HEADER_TYPE.MORE,
    },
  },
  {
    path: 'profile',
    name: ROUTE.Pet.Profile,
    component: PetProfile,
    meta: {
      title: '펫 프로필',
      headerType: HEADER_TYPE.SHARE,
    },
  },
  {
    path: 'share',
    name: ROUTE.Pet.Share,
    component: PetShare,
    meta: {
      title: '펫 공유하기',
      headerType: HEADER_TYPE.NONE,
    },
  },
]
