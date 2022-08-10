import ROUTE from '@/constants/route.json'

const SettingMain = () => import('@pages/setting/SettingMain.vue')
const MyProfile = () => import('@pages/setting/MyProfile.vue')

export default [
    {
        path: '',
        name: ROUTE.Setting.Main,
        component: SettingMain,
    },
    {
        path: 'profile',
        name: ROUTE.Setting.Profile,
        component: MyProfile
    }
]