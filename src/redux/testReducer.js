import { testAPI } from '../api/api'
import { startSubmit, reset } from 'redux-form'
import { defaultThunkReject } from '../utils/utils'

const SET_TEST_DATA = 'test/SET_TEST_DATA'
const GET_NEXT_QUESTION = 'test/GET_NEXT_QUESTION'
const SET_TEST_IS_FINISHED = 'test/SET_TEST_IS_FINISHED'

const initialState = {
  testInfo: null,
  question: null,
  answers: [],
  testIsFinished: false
}

const testReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TEST_DATA:
      return {
        ...state,
        ...action.payload
      }
    case GET_NEXT_QUESTION:
      return {
        ...state,
        question: action.question,
        answers: action.answers
      }
    case SET_TEST_IS_FINISHED:
      return {
        ...state,
        testIsFinished: action.testIsFinished
      }
    default:
      return state
  }
}

const setTestDataAC = (testInfo, question, answers) => ({
  type: SET_TEST_DATA,
  payload: { testInfo, question, answers }
})
const setNewQuestion = (question, answers) => ({ type: GET_NEXT_QUESTION, question, answers })
export const setTestIsFinished = (testIsFinished) => ({ type: SET_TEST_IS_FINISHED, testIsFinished })

export const getTest = (testId) => async (dispatch) => {
  try {
    const response = await testAPI.getTest(testId)
    if (response.data.length !== 0) {
      const { test, question, answers } = response.data
      dispatch(setTestDataAC(test, question, answers))
    } else {
      await Promise.reject(new Error('403 Forbidden'))
    }
  } catch (e) {
    await defaultThunkReject(e, dispatch)
  }
}

export const nextQuestion = (testId, answer) => async (dispatch) => {
  try {
    dispatch(startSubmit('test'))
    const response = await testAPI.nextQuestion(testId, answer)
    if (response.data.length !== 0) {
      const { question, answers } = response.data
      dispatch(setNewQuestion(question, answers))
      dispatch(reset('test'))
    } else {
      dispatch(setTestIsFinished(true))
    }
  } catch (e) {
    await defaultThunkReject(e, dispatch)
  }
}

export default testReducer
