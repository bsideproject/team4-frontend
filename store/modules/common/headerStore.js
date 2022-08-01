const ModuleName = 'headerStore'
const module = {
  namespaced: true,
  state: {
    test: 'test!'
  },
  getters: {
    getTest(state) {
      return state.test
    }
  }
}

export {
  module,
  ModuleName
}