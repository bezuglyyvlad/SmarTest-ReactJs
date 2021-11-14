import { expertPanelQuestionsAPI } from '../api/api'
import { startSubmit } from 'redux-form'
import { downloadFile } from '../utils/utils'

const SET_QUESTIONS = 'expertPanelQuestions/SET_QUESTIONS'
const DELETE_QUESTION = 'expertPanelQuestions/DELETE_QUESTION'
const SET_SERVER_ERRORS = 'expertPanelQuestions/SET_SERVER_ERRORS'

const initialState = {
  questions: null,
  serverErrors: null
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
        questions: state.questions.filter(item => item.question_id !== action.questionId)
      }
    case SET_SERVER_ERRORS:
      return {
        ...state,
        serverErrors: action.errors
      }
    default:
      return state
  }
}

const setQuestionsAC = (questions) => ({ type: SET_QUESTIONS, questions })
const deleteQuestionAC = (questionId) => ({ type: DELETE_QUESTION, questionId })
const setServerErrorsAC = (errors) => ({ type: SET_SERVER_ERRORS, errors })

export const getExpertQuestions = (expertTestId) => async (dispatch) => {
  const response = await expertPanelQuestionsAPI.getQuestions(expertTestId)
  dispatch(setQuestionsAC(response.data))
  dispatch(setServerErrorsAC(null))
}

export const deleteQuestion = (questionId) => async (dispatch) => {
  await expertPanelQuestionsAPI.deleteQuestion(questionId)
  dispatch(deleteQuestionAC(questionId))
}

export const addQuestion = (data) => async (dispatch) => {
  dispatch(startSubmit('questionForm'))
  await expertPanelQuestionsAPI.addQuestion(data)
}

export const importQuestions = (data, subcategoryId) => async (dispatch) => {
  try {
    await expertPanelQuestionsAPI.importQuestions(data)
    await dispatch(getExpertQuestions(subcategoryId))
  } catch (e) {
    if (e.response && e.response.status === 413 && e.response.data) {
      dispatch(setServerErrorsAC([e.response.data.message]))
    } else {
      await Promise.reject(e)
    }
  }
}

export const exportQuestions = (subcategoryId, categoryName, subcategoryName) => async (dispatch) => {
  const response = await expertPanelQuestionsAPI.exportQuestions(subcategoryId)
  downloadFile(response.data, `${categoryName}-${subcategoryName}`)
}

export default expertPanelQuestionsReducer
