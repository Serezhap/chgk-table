import Vue from 'vue'
import Vuex from 'vuex'
import { createPersistedState, createSharedMutations } from 'vuex-electron'
import broadcaster from '../store/broadcaster'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    filePath: false,
    teams: [],
    order: 'default',
    questions: []
  },
  getters: {
    GET_QUESTIONS: state => {
      return state.questions
    },
    QUESTION_COUNT: state => {
      return state.questions.length
    },
    GET_TEAMS: state => {
      console.log(state.order)
      switch (state.order) {
        case 'rank':
          let teams = state.teams.slice()
          return teams.sort((a, b) => {
            if (a.rank < b.rank) {
              return -1
            }
            if (a.rank > b.rank) {
              return 1
            }
            return 0
          })
        case 'default':
        default:
          return state.teams
      }
    },
    GET_STATE: state => {
      return JSON.stringify(state)
    }
  },
  mutations: {
    CLEAR_STATE (state) {
      state = {
        teams: [],
        order: 'default',
        questions: []
      }
      console.log(state)
    },
    ADD_TEAM: state => {
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
    SET_QUESTIONS: (state, count) => {
      let diff = count - state.questions.length
      let questions = state.questions
      if (diff > 0) {
        for (let i = 0; i < diff; i++) {
          questions.push({rating: 0})
        }
      } else if (diff < 0) {
        questions.splice(count, -diff)
      }
      state.questions = questions
      state.teams.forEach(team => {
        team.answers = team.answers.filter(answer => answer <= count)
      })
    },
    TOGGLE_ANSWER: (state, {num, question}) => {
      let teams = state.teams.slice()
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
      // state.teams = teams
      let rating = teams.length - teams.filter(team => team.answers.includes(question)).length + 1
      let questions = state.questions
      questions[question - 1].rating = rating

      teams.forEach(team => {
        if (team.answers.length === 0) team.rating = 0
        team.rating = 0
        team.answers.forEach(answer => {
          team.rating += questions[answer - 1].rating
        })
      })

      teams.sort((a, b) => {
        if (a.answers.length > b.answers.length) {
          return -1
        }
        if (a.answers.length < b.answers.length) {
          return 1
        }
        if (a.rating > b.rating) {
          return -1
        }
        if (a.rating < b.rating) {
          return 1
        }
        return 0
      })
      let fr = 0
      let lr = 0
      for (let i = 0; i < teams.length; i++) {
        teams[i].rank = i + 1
        teams[i].lastrank = null
        if (i < teams.length - 1) {
          if (teams[i].answers.length === teams[i + 1].answers.length && teams[i].rating === teams[i + 1].rating) {
            if (fr === 0) {
              fr = i + 1
              lr = i + 2
            } else {
              lr = i + 2
            }
          } else {
            if (fr !== 0) {
              let end = lr
              for (let j = fr - 1; j < end; j++) {
                teams[j].lastrank = lr
                teams[j].rank = fr
                if (j === end - 1) {
                  fr = 0
                  lr = 0
                }
              }
            }
          }
        } else {
          teams[i].rank = i + 1
          teams[i].lastrank = null
          if (fr !== 0) {
            let end = lr
            for (let j = fr - 1; j < end; j++) {
              teams[j].lastrank = lr
              teams[j].rank = fr
              if (j === end - 1) {
                fr = 0
                lr = 0
              }
            }
          }
        }
      }
      teams.forEach(team => {
        state.teams.forEach(team2 => {
          if (team.num === team2.num) {
            team2 = team
          }
        })
      })
    },
    SET_ORDER: (state, order) => {
      state.order = order
    },
    SET_STATE: (state, {newState, path}) => {
      state.teams = newState.teams
      state.questions = newState.questions
      state.order = newState.order
      state.filePath = path
    }
  },
  actions: {
    reset (context) {
      context.commit('CLEAR_STATE')
    },
    ADD_TEAM: ({commit}) => {
      commit('ADD_TEAM')
    },
    REMOVE_TEAM: ({commit}, num) => {
      commit('REMOVE_TEAM', num)
    },
    RENAME_TEAM: ({commit}, {num, name}) => {
      commit('RENAME_TEAM', {num, name})
    },
    SET_QUESTIONS: ({commit}, count) => {
      commit('SET_QUESTIONS', count)
    },
    TOGGLE_ANSWER: ({commit, getters}, {num, question}) => {
      commit('TOGGLE_ANSWER', {num, question})
      // commit('SET_RATING', {question, rating: getters.RATING(question)})
      // commit('SET_TEAM_RATING', getters)
      // commit('SET_TEAM_RANK')
    },
    SET_ORDER: ({commit}, order) => {
      commit('SET_ORDER', order)
    },
    SET_STATE: ({commit}, {state, path}) => {
      commit('SET_STATE', {newState: state, path})
    }
  },
  modules: {
    // teamsModel,
    // questionsModel
  },
  plugins: [createPersistedState({throttle: 1000}), createSharedMutations(), broadcaster],
  strict: process.env.NODE_ENV !== 'production'
})
