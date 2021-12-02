import { testAPI } from '../api/api'
import { thunkErrorHandler } from '../utils/utils'

const SET_TEST_RESULT_DATA = 'testResult/SET_TEST_RESULT_DATA'

const initialState = {
  test: null,
  questions: null,
  answers: null
}

const testResultReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TEST_RESULT_DATA:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

const setTestResultDataAC = (test, questions, answers) => ({
  type: SET_TEST_RESULT_DATA,
  payload: { test, questions, answers }
})

export const getTestResult = (testId) => async (dispatch) => {
  try {
    const response = await testAPI.getResult(testId)
    if (response.data.length !== 0) {
      const { test, questions, answers } = response.data
      dispatch(setTestResultDataAC(test, questions, answers))
    } else {
      await Promise.reject(new Error('403 Forbidden'))
    }
  } catch (e) {
    thunkErrorHandler(e, dispatch)
  }
}

export default testResultReducer
