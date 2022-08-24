import ROUTE from '@/constants/route.json'

const SettingMain = () => import('@pages/setting/SettingMain.vue')
const MyProfile = () => import('@pages/setting/MyProfile.vue')
const Licence = () => import('@pages/setting/Licence.vue')
const NoticeList = () => import('@pages/setting/NoticeList.vue')
const NoticeDetail = () => import('@pages/setting/NoticeDetail.vue')
const Feedback = () => import('@pages/setting/Feedback.vue')
const Withdraw = () => import('@pages/setting/Withdraw.vue')

export default [
    {
        path: '',
        name: ROUTE.Setting.Main,
        component: SettingMain,
    },
    {
        path: 'profile',
        name: ROUTE.Setting.Profile,
        component: MyProfile,
    },
    {
        path: 'licence',
        name: ROUTE.Setting.Licence,
        component: Licence,
        meta: {
            title: '라이선스'
        }
    },
    {
        path: 'notice',
        name: ROUTE.Setting.Notice.List,
        component: NoticeList,
        meta: {
            title: '공지사항'
        }
    },
    {
        path: 'notice/detail/:no',
        name: ROUTE.Setting.Notice.Detail,
        component: NoticeDetail,
        meta: {
            title: '공지사항'
        }
    },
    {
        path: 'feedback',
        name: ROUTE.Setting.Feedback,
        component: Feedback,
        meta: {
            title: '피드백'
        }
    },
    {
        path: 'withdraw',
        name: ROUTE.Setting.Withdraw,
        component: Withdraw,
        meta: {
            title: '회원탈퇴'
        }
    },
]