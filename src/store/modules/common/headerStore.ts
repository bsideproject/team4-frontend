import { makeModuleTypes } from '@/utils/store/index'

const MODULE_NAME = 'headerStore'

const TYPES = makeModuleTypes([
  'title',
  'getTitle',
  'setTitle',
  'headerType',
  'getHeaderType',
  'setHeaderType',
  'moreOptionList',
  'getMoreOptionList',
  'setMoreOptionList',

  'weeklyCalendarDate',
  'getWeeklyCalendarDate',
  'setWeeklyCalendarDate',
])
type TYPES = typeof TYPES[keyof typeof TYPES]

const module = {
  namespaced: true,
  state: {
    title: '',
    headerType: '',
    moreOptionList: [],
    weeklyCalendarDate: new Date(),
  },
  getters: {
    [TYPES.getTitle](state: any) {
      return state.title
    },
    [TYPES.getHeaderType](state: any) {
      return state.headerType
    },
    [TYPES.getMoreOptionList](state: any) {
      return state.moreOptionList
    },
    [TYPES.getWeeklyCalendarDate](state: any) {
      return state.weeklyCalendarDate
    },
  },
  mutations: {
    [TYPES.setTitle](state: any, payload: any) {
      state.title = payload
    },
    [TYPES.setHeaderType](state: any, payload: any) {
      state.headerType = payload
    },
    [TYPES.setMoreOptionList](state: any, payload: any) {
      state.moreOptionList = payload
    },
    [TYPES.setWeeklyCalendarDate](state: any, payload: any) {
      state.weeklyCalendarDate = payload
    },
  },
}

export { module, MODULE_NAME, TYPES }
