import ROUTE from '@/constants/route.json'

const CreatePet = () => import('@/pages/pet/CreatePet.vue')
const ModifyPet = () => import('@/pages/pet/ModifyPet.vue')

export default [
    {
        path: 'create',
        name: ROUTE.Pet.Create,
        component: CreatePet,
        meta: {
            title: '펫 등록하기'
        }
    },
    {
        path: 'modify',
        name: ROUTE.Pet.Modify,
        component: ModifyPet,
        meta: {
            title: '펫 등록하기'
        }
    },
]