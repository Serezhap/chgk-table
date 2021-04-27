import Vue from 'vue'
import Vuex from 'vuex'

import { createPersistedState, createSharedMutations } from 'vuex-electron'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    teams: []
  },
  getters: {
    allTeams (state) {
      console.log(state.teams)
      return state.teams.reverse()
    }
  },
  actions: {
    addTeam ({ commit }) {
      console.log('sas')
      commit('addTeam')
    },
    clear ({ commit }, team) {
      commit('updateTeams', [])
    },
    remove ({ commit }, team) {
      commit('removeTeam', team.id)
    }
  },

  mutations: {
    addTeam (state) {
      state.teams.push({id: state.teams.length + 1, name: ''})
    },
    updateTeams (state, teams) {
      console.log(teams)
      state.teams = teams
    },
    removeTeam (state, id) {
      state.teams = state.teams.filter((team) => team.id !== id - 1)
      // state.teams = teams
    }
  },

  plugins: [createPersistedState(), createSharedMutations()],
  strict: process.env.NODE_ENV !== 'production'
})
