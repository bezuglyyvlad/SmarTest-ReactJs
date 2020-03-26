export const testResultSelectors = {
    getTest(state) {
        return state.testResult.test;
    },
    getQuestions(state) {
        return state.testResult.questions;
    },
}