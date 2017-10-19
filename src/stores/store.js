import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const mutations = {
  INCREMENT: (state, amount) => { state.count += amount }
}

const store = new Vuex.Store({
  state: {
    count: 0
  },
  getters: {
    getCount: state => state.count
  },
  mutations,
  actions: {
    INCREMENT_COUNTER: ({ commit }, count) => {
      commit('INCREMENT', 1)
    }
  }
})

export { mutations, store }
