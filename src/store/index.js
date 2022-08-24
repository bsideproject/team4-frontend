import { createStore } from 'vuex'

import { module as headerStore } from './modules/common/headerStore'
import { module as groupStore } from './modules/group/groupStore'
import { module as petStore } from './modules/pet/petStore'

export default createStore({
  modules: {
    headerStore,
    groupStore,
    petStore,
  }
})