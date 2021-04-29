export default {
  actions: {
    addTeam ({ commit }) {
      commit('addTeam')
    },
    clear ({ commit }, team) {
      commit('updateTeams')
    },
    remove ({ commit }, team) {
      commit('removeTeam', team.id)
    },
    update ({commit}, {num, name}) {
      commit('updateTeams')
    }
  },
  mutations: {
    addTeam (state) {
      state.teams.push({num: Date.now(), id: state.teams.length + 1, name: ''})
    },
    updateTeams (state) {
      console.log(state.teams)
    },
    updateTeam (state, team) {
      console.log(team)
    },
    removeTeam (state, id) {
      let teams = state.teams.filter((team) => team.id !== id)
      teams.forEach((team, index) => {
        team.id = index + 1
      })
      state.teams = teams
    },
    setQuestionCount (state, value) {
      state.questionCount = value
    }
  },
  state: {
    teams: []
  },
  getters: {
    allTeams (state) {
      return state.teams.reverse()
    }
  }
}
