export default {
  state: {
    teams: []
  },
  actions: {
    ADD_TEAM: ({commit}) => {
      commit('ADD_TEAM')
    },
    REMOVE_TEAM: ({commit}, num) => {
      commit('REMOVE_TEAM', num)
    },
    RENAME_TEAM: ({commit}, {num, name}) => {
      commit('RENAME_TEAM', {num, name})
    },
    TOGGLE_ANSWER: ({commit}, {num, question}) => {
      commit('TOGGLE_ANSWER', {num, question})
    }
  },
  mutations: {
    ADD_TEAM: state => {
      console.log(state)
      state.teams.push({num: Date.now(), id: state.teams.length + 1, name: '', answers: []})
    },
    REMOVE_TEAM (state, num) {
      let teams = state.teams.filter((team) => team.num !== num)
      teams.forEach((team, index) => {
        team.id = index + 1
      })
      state.teams = teams
    },
    RENAME_TEAM: (state, {num, name}) => {
      let teams = state.teams
      teams.forEach(team => {
        if (team.num === parseInt(num)) {
          team.name = name
        }
      })
      state.teams = teams
    },
    TOGGLE_ANSWER: (state, {num, question}) => {
      let teams = state.teams
      teams.forEach(team => {
        if (team.num === parseInt(num)) {
          let val = team.answers.indexOf(question)
          if (val !== -1) {
            team.answers.splice(val, 1)
          } else {
            team.answers.push(question)
          }
        }
      })
      console.log(teams)
      state.teams = teams
    }
  },
  getters: {
    GET_TEAMS: state => {
      return state.teams
    }
  }
}
