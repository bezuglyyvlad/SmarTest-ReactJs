import {createSelector} from "reselect";

export const testResultSelectors = {
    getTest(state) {
        return state.testResult.test;
    },
    getQuestions(state) {
        return state.testResult.questions;
    },
}

const questionReselect = createSelector(testResultSelectors.getQuestions, questions => {
    if (questions) {
        let complexity = [0, 0, 0];
        questions.forEach(item => {
            if (item.lvl === '1') {
                complexity[0] += 1;
            } else if (item.lvl === '2') {
                complexity[1] += 1;
            } else if (item.lvl === '3') {
                complexity[2] += 1;
            }
        })
        return complexity.join('/');
    }
})

testResultSelectors.getComplexity = questionReselect;