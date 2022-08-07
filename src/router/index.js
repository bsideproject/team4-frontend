import { createWebHistory, createRouter } from 'vue-router';
import routes from './routes/index.js'

export const router = createRouter({
  history: createWebHistory(),
  routes,
});