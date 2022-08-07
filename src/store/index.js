import { createStore } from 'vuex'

import { module as headerStore } from './modules/common/headerStore'

export default createStore({
  modules: {
    headerStore
  }
})