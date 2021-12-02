import { createSelector } from 'reselect'

export const testResultSelectors = {
  getTest (state) {
    return state.testResult.test
  },
  getQuestions (state) {
    return state.testResult.questions
  },
  getAnswers (state) {
    return state.testResult.answers
  }
}

const countOfCorrectAnswersReselect = createSelector(testResultSelectors.getQuestions, questions => {
  if (questions) {
    let countOfCorrectAnswers = 0
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].is_correct_answer === 1) {
        countOfCorrectAnswers++
      }
    }
    return countOfCorrectAnswers
  }
})

testResultSelectors.getCountOfCorrectAnswers = countOfCorrectAnswersReselect
