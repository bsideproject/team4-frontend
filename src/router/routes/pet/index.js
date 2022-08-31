import ROUTE from '@/constants/route.json'

const CreatePet = () => import('@/pages/pet/CreatePet.vue')
const ModifyPet = () => import('@/pages/pet/ModifyPet.vue')

export default [
    {
        path: 'create',
        name: ROUTE.Pet.Create,
        component: CreatePet,
    },
    {
        path: 'modify',
        name: ROUTE.Pet.Modify,
        component: ModifyPet,
    },
]