import { expertPanelAnswersAPI, expertPanelQuestionAPI } from '../api/api'
import { changeObjectInArray, thunkErrorHandler } from '../utils/utils'

const SET_QUESTION = 'expertPanelQuestionEdit/SET_QUESTION'
const SET_ANSWERS = 'expertPanelQuestionEdit/SET_ANSWERS'
const ADD_ANSWER = 'expertPanelQuestionEdit/ADD_ANSWER'
const UPDATE_ANSWER = 'expertPanelQuestionEdit/UPDATE_ANSWER'
const DELETE_ANSWER = 'expertPanelQuestionEdit/DELETE_ANSWER'

const initialState = {
  question: null,
  answers: null
}

const expertPanelQuestionEditReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_QUESTION:
      return {
        ...state,
        question: action.question
      }
    case SET_ANSWERS:
      return {
        ...state,
        answers: action.answers
      }
    case ADD_ANSWER:
      return {
        ...state,
        answers: [...state.answers, action.newAnswer]
      }
    case UPDATE_ANSWER:
      return {
        ...state,
        answers: changeObjectInArray(state.answers, action.oldAnswerId, 'id', action.newAnswer)
      }
    case DELETE_ANSWER:
      return {
        ...state,
        answers: state.answers.filter(item => item.id !== action.answerId)
      }
    default:
      return state
  }
}

const setQuestionAC = (question) => ({ type: SET_QUESTION, question })
const setAnswersAC = (answers) => ({ type: SET_ANSWERS, answers })
const addAnswerAC = (newAnswer) => ({ type: ADD_ANSWER, newAnswer })
const updateAnswerAC = (oldAnswerId, newAnswer) => ({ type: UPDATE_ANSWER, oldAnswerId, newAnswer })
const deleteAnswerAC = (answerId) => ({ type: DELETE_ANSWER, answerId })

export const getExpertQuestion = (questionId) => async (dispatch) => {
  try {
    const response = await expertPanelQuestionAPI.getQuestion(questionId)
    dispatch(setQuestionAC(response.data.data))
  } catch (e) {
    thunkErrorHandler(e, dispatch)
  }
}

export const editQuestion = (data, questionId) => async (dispatch) => {
  try {
    const response = await expertPanelQuestionAPI.updateQuestion(data, questionId)
    dispatch(setQuestionAC(response.data.data))
  } catch (e) {
    thunkErrorHandler(e, dispatch)
  }
}

export const uploadQuestionImage = (data, questionId) => async (dispatch) => {
  try {
    const response = await expertPanelQuestionAPI.uploadImage(data, questionId)
    dispatch(setQuestionAC(response.data.data))
  } catch (e) {
    thunkErrorHandler(e, dispatch)
  }
}

export const deleteQuestionImage = (questionId) => async (dispatch) => {
  try {
    const response = await expertPanelQuestionAPI.deleteImage(questionId)
    dispatch(setQuestionAC(response.data.data))
  } catch (e) {
    thunkErrorHandler(e, dispatch)
  }
}

export const getExpertAnswers = (questionId) => async (dispatch) => {
  try {
    const response = await expertPanelAnswersAPI.getAnswers(questionId)
    dispatch(setAnswersAC(response.data.data))
  } catch (e) {
    thunkErrorHandler(e, dispatch)
  }
}

export const addAnswer = (data) => async (dispatch) => {
  try {
    const response = await expertPanelAnswersAPI.addAnswer(data)
    dispatch(addAnswerAC(response.data.data))
  } catch (e) {
    thunkErrorHandler(e, dispatch)
  }
}

export const updateAnswer = (data) => async (dispatch) => {
  try {
    const response = await expertPanelAnswersAPI.updateAnswer(data)
    dispatch(updateAnswerAC(data.id, response.data.data))
  } catch (e) {
    thunkErrorHandler(e, dispatch)
  }
}

export const deleteAnswer = (answerId) => async (dispatch) => {
  try {
    await expertPanelAnswersAPI.deleteAnswer(answerId)
    dispatch(deleteAnswerAC(answerId))
  } catch (e) {
    thunkErrorHandler(e, dispatch)
  }
}

export default expertPanelQuestionEditReducer
