export const expertPanelQuestionsSelectors = {
    getQuestions(state) {
        return state.expertQuestions.questions;
    },
    getServerErrors(state) {
        return state.expertQuestions.serverErrors;
    }
}