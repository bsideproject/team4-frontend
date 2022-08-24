import { createStore } from 'vuex'

import { module as headerStore } from './modules/common/headerStore'
import { module as groupStore } from './modules/group/groupStore'

export default createStore({
  modules: {
    headerStore,
    groupStore
  }
})