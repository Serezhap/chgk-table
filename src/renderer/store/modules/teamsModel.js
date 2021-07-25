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
    TOGGLE_ANSWER: ({commit, getters}, {num, question}) => {
      commit('TOGGLE_ANSWER', {num, question})
      commit('SET_RATING', {question, rating: getters.RATING(question)})
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
      state.teams = teams
    },
    RESET_ANSWERS: (state, count) => {
      state.teams.forEach(team => {
        team.answers = team.answers.filter(answer => answer <= count)
      })
    }
  },
  getters: {
    GET_TEAMS: state => {
      return state.teams
    },
    RATING: (state) => (question) => {
      return state.teams.length - state.teams.filter(team => team.answers.includes(question)).length + 1
    },
    RANK: (state, rootGetters) => num => {
      const teams = [...state.teams].sort((a, b) => {
        console.log(rootGetters.RATING(a))
        if (a.answers.length > b.answers.length) {
          return -1
        }
        if (a.answers.length < b.answers.length) {
          return 1
        }
        console.log(a.answers)
        console.log(b.answers)
        let aRate = rootGetters.TEAM_RATING(a.answers)
        let bRate = rootGetters.TEAM_RATING(b.answers)
        console.log('sas' + aRate)
        console.log(bRate)
        if (aRate > bRate) {
          return -1
        }
        if (aRate < bRate) {
          return 1
        }
        return 0
      })
      return teams.findIndex(team => team.num === num) + 1
    }
  }
}
