import Vue from 'vue'
import Vuex from 'vuex'
import teams from '../store/modules/teams'
import questions from './modules/questions'
import { createPersistedState, createSharedMutations } from 'vuex-electron'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    teams,
    questions
  },
  plugins: [createPersistedState(), createSharedMutations()],
  strict: process.env.NODE_ENV !== 'production'
})
