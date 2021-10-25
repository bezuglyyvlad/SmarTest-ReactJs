export const expertPanelQuestionEditSelectors = {
    getQuestion(state) {
        return state.expertQuestionEdit.question;
    },
    getAnswers(state) {
        return state.expertQuestionEdit.answers;
    }
}