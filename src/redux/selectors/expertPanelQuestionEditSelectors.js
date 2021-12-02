export const expertPanelQuestionEditSelectors = {
  getQuestion (state) {
    return state.expertPanelQuestionEdit.question
  },
  getAnswers (state) {
    return state.expertPanelQuestionEdit.answers
  }
}
