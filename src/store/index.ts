import { createStore } from 'vuex'

import { module as headerStore } from './modules/common/headerStore'
import { module as groupStore } from './modules/group/groupStore'
import { module as petStore } from './modules/pet/petStore'
import { module as quickRecordStore } from './modules/checklist/quickRecordStore'
import { module as todoStore } from './modules/checklist/todoStore'
import { module as userStore } from './modules/user/userStore'

export default createStore({
  modules: {
    headerStore,
    groupStore,
    petStore,
    quickRecordStore,
    todoStore,
    userStore,
  },
})
