import {createSelector} from "reselect";

export const testResultSelectors = {
    getTest(state) {
        return state.testResult.test;
    },
    getQuestions(state) {
        return state.testResult.questions;
    },
    getAnswers(state) {
        return state.testResult.answers;
    },
    getBasicPoints(state) {
        return state.testResult.basicPoints;
    },
    getCorrectionCoef(state) {
        return state.testResult.correctionCoef;
    }
}

const countOfCorrectAnswersReselect = createSelector(testResultSelectors.getQuestions, questions => {
    if (questions) {
        let count_of_correct_answers = 0;
        for (let i = 0; i < questions.length; i++) {
            if (questions[i].is_correct_answer === 1) {
                count_of_correct_answers++;
            }
        }
        return count_of_correct_answers;
    }
})

testResultSelectors.getCountOfCorrectAnswers = countOfCorrectAnswersReselect;