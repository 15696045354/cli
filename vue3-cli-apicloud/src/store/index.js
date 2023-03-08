import { createStore } from 'vuex'

export default createStore({
  state: {
    routerId: '',
    componentId: ''
  },
  getters: {},
  mutations: {
    upRouterId(state, step) {
      state.routerId = step
    },
    upComponentId(state, step) {
      state.componentId = step
    }
  },
  actions: {},
  modules: {}
})
