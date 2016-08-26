import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const mutations = {
  INCREMENT: (state, amount) => { state.count += amount }
}

export default new Vuex.Store({
  state: {
    count: 0
  },
  getters: {
    getCount: state => state.count
  },
  mutations,
  actions: {
    incrementCounter: ({ commit }, count) => {
      commit('INCREMENT', 1)
    }
  }
})
