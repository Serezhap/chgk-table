export default {
  state: {
    questions: []
  },
  actions: {
    SET_QUESTIONS: ({commit}, count) => {
      commit('SET_QUESTIONS', count)
    }
  },
  mutations: {
    SET_QUESTIONS: (state, count) => {
      let diff = count - state.questions.length
      let questions = state.questions
      if (diff > 0) {
        for (let i = 0; i < diff; i++) {
          questions.push({})
        }
      } else if (diff < 0) {
        questions.splice(count, -diff)
      }
      state.questions = questions
    }
  },
  getters: {
    QUESTION_COUNT: state => {
      return state.questions.length
    }
  }
}
