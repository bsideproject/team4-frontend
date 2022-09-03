import ROUTE from '@/constants/route.json'

const QuickRecord = () => import('@/pages/checklist/QuickRecord.vue')
const Schedule = () => import('@/pages/checklist/Schedule.vue')
const Todo = () => import('@/pages/checklist/Todo.vue')

export default [
    {
        path: 'quick',
        name: ROUTE.Checklist.QuickRecord,
        component: QuickRecord,
        meta: {
            title: '퀵기록 관리'
        }
    },
    {
        path: 'schedule',
        name: ROUTE.Checklist.Schedule,
        component: Schedule,
        meta: {
            title: '일정'
        }
    },
    {
        path: 'todo',
        name: ROUTE.Checklist.Todo,
        component: Todo,
        meta: {
            title: '할 일'
        }
    },
]