export default {
  state: {
    questions: []
  },
  actions: {
    SET_QUESTIONS: ({commit}, count) => {
      commit('SET_QUESTIONS', count)
      commit('RESET_ANSWERS', count)
    },
    SET_RATING: ({commit}, {question, rating}) => {
      commit('SET_RATING', {question, rating})
    }
  },
  mutations: {
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
    },
    SET_RATING: (state, {question, rating}) => {
      state.questions[question - 1].rating = rating
    }
  },
  getters: {
    QUESTION_COUNT: state => {
      return state.questions.length
    },
    TEAM_RATING: state => answers => {
      if (answers.length === 0) return 0
      let rating = 0
      answers.forEach(answer => {
        rating += state.questions[answer - 1].rating
      })
      return rating
    },
    GET_QUESTIONS: state => {
      return state.questions
    }
  }
}
