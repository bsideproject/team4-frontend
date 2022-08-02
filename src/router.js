import { createWebHistory, createRouter } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'CheckList',
        component: () => import('@/pages/checkList/index'), // 동적 import
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});