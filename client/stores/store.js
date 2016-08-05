import Vue from 'vue/dist/vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 0
}

export const mutations = {
  INCREMENT (state, amount) {
    state.count += amount
  }
}

export default new Vuex.Store({
  state,
  mutations
})
