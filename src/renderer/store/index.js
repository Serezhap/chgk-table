import Vue from 'vue'
import Vuex from 'vuex'
import teamsModel from './modules/teamsModel'
import questionsModel from './modules/questionsModel'
import { createPersistedState, createSharedMutations } from 'vuex-electron'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {
    CLEAR_STATE (state) {
      console.log(state)
    }
  },
  actions: {
    reset (context) {
      context.commit('CLEAR_STATE')
    }
  },
  modules: {
    teamsModel,
    questionsModel
  },
  plugins: [createPersistedState(), createSharedMutations()],
  strict: process.env.NODE_ENV !== 'production'
})
