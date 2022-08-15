import { createStore } from 'vuex'

import { module as headerStore } from './modules/common/headerStore'
import { module as familyStore } from './modules/family/familyStore'

export default createStore({
  modules: {
    headerStore,
    familyStore
  }
})