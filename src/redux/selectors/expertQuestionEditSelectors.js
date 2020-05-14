export const expertQuestionEditSelectors = {
    getQuestion(state) {
        return state.expertQuestionEdit.question;
    },
    getAnswers(state) {
        return state.expertQuestionEdit.answers;
    }
}