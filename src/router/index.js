import { createWebHistory, createRouter } from 'vue-router'
import routes from './routes/index.js'
import store from '../store/index.js'
// import { getToken } from '@utils/login/index.js'
// import ROUTE from '@constants/route.json'

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  console.log('beforeEach', to)

  // const { auth, title, headerType } = to.meta
  const { title, headerType } = to.meta
  store.commit('headerStore/setTitle', title)
  store.commit('headerStore/setHeaderType', headerType)

  const browserTitle = document.title
  const serviceName = browserTitle.split('-')[0]?.trim()
  document.title = title ? `${serviceName} - ${title}` : serviceName

  // if (auth) {
  //   const token = getToken()
  //   if (token) {
  //     /** 토큰 유효성 API 호출 */
  //     next()
  //   } else {
  //     /** 로그인 페이지로 이동 */
  //     next({ name: ROUTE.Login })
  //   }
  // } else {
  //   next()
  // }
  next()
})
