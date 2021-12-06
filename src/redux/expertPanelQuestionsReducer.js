import { expertPanelQuestionsAPI } from '../api/api'
import { thunkErrorHandler, downloadFile } from '../utils/utils'

const SET_QUESTIONS = 'expertPanelQuestions/SET_QUESTIONS'
const DELETE_QUESTION = 'expertPanelQuestions/DELETE_QUESTION'

const initialState = {
  questions: null
}

const expertPanelQuestionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_QUESTIONS:
      return {
        ...state,
        questions: action.questions
      }
    case DELETE_QUESTION:
      return {
        ...state,
        questions: state.questions.filter(item => item.id !== action.questionId)
      }
    default:
      return state
  }
}

const setQuestionsAC = (questions) => ({
  type: SET_QUESTIONS,
  questions
})
const deleteQuestionAC = (questionId) => ({ type: DELETE_QUESTION, questionId })

export const getExpertQuestions = (expertTestId) => async (dispatch) => {
  try {
    const response = await expertPanelQuestionsAPI.getQuestions(expertTestId)
    dispatch(setQuestionsAC(response.data.data))
  } catch (e) {
    thunkErrorHandler(e, dispatch)
  }
}

export const deleteQuestion = (questionId) => async (dispatch) => {
  try {
    await expertPanelQuestionsAPI.deleteQuestion(questionId)
    dispatch(deleteQuestionAC(questionId))
  } catch (e) {
    thunkErrorHandler(e, dispatch)
  }
}

export const addQuestion = (data) => async (dispatch) => {
  try {
    await expertPanelQuestionsAPI.addQuestion(data)
  } catch (e) {
    thunkErrorHandler(e, dispatch)
  }
}

export const importQuestions = (data) => async (dispatch) => {
  try {
    const response = await expertPanelQuestionsAPI.importQuestions(data)
    dispatch(setQuestionsAC(response.data.data))
  } catch (e) {
    thunkErrorHandler(e, dispatch)
  }
}

export const exportQuestions = (expertTestId, expertTestName) => async (dispatch) => {
  const response = await expertPanelQuestionsAPI.exportQuestions(expertTestId)
  downloadFile(response.data, expertTestName)
}

export default expertPanelQuestionsReducer
