export const testSelectors = {
    getTestInfo(state) {
        return state.test.testInfo;
    },
    getQuestion(state) {
        return state.test.question;
    },
    getAnswers(state) {
        return state.test.answers;
    },
    getTestIsFinished(state) {
        return state.test.testIsFinished;
    }
}