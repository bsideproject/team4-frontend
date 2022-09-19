import { createWebHistory, createRouter } from 'vue-router'
import routes from '@/router/routes/index'
import store from '@/store/index'
import { getToken } from '@/utils/login/index'
import ROUTE from '@/constants/route'
import HEADER_TYPE from '@/constants/headerType'

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  window.scroll(0, 0)

  const { auth, title, headerType } = to.meta
  store.commit('headerStore/setTitle', title)
  store.commit('headerStore/setHeaderType', headerType)
  if (headerType === HEADER_TYPE.MORE) {
    store.commit('headerStore/setMoreOptionList', [])
  }

  const browserTitle = document.title
  const serviceName = browserTitle.split('-')[0]?.trim()
  document.title = title ? `${serviceName} - ${title}` : serviceName

  if (auth) {
    const token = getToken()
    if (token) {
      /** 토큰 유효성 API 호출 */
      next()
    } else {
      /** 로그인 페이지로 이동 */
      next({ name: ROUTE.Login })
    }
  } else {
    next()
  }
  next()
})
