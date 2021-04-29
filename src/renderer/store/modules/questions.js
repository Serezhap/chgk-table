export default {
  actions: {
    questionCountSet ({commit}, value) {
      commit('setQuestionCount', value)
    }
  },
  mutations: {
    setQuestionCount (state, value) {
      state.questionCount = value
    }
  },
  state: {
    questionCount: 0
  },
  getters: {
    getQuestionCount (state) {
      return state.questionCount
    }
  }
}
