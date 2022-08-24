import { createWebHistory, createRouter } from 'vue-router';
import routes from './routes/index.js'
import store from '../store/index.js'

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const { title, headerType } = to.meta
  store.commit('headerStore/setTitle', title)
  store.commit('headerStore/setHeaderType', headerType)
  // console.log(store)
  console.log('beforeEach', to)

  next()
})