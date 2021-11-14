import { expertTestsAPI, testAPI } from '../api/api'
import { defaultThunkReject } from '../utils/utils'

const SET_EXPERT_TESTS = 'expertTests/SET_EXPERT_TESTS'
const SET_TEST_CREATED = 'expertTests/SET_TEST_CREATED'

const initialState = {
  expertTests: [],
  pagination: {},
  testCreatedId: null
}

const expertTestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EXPERT_TESTS:
      return {
        ...state,
        ...action.payload
      }
    case SET_TEST_CREATED:
      return {
        ...state,
        testCreatedId: action.id
      }
    default:
      return state
  }
}

const setExpertTests = (expertTests, pagination) => ({
  type: SET_EXPERT_TESTS,
  payload: { expertTests, pagination }
})
const setTestCreated = (id) => ({ type: SET_TEST_CREATED, id })

export const getExpertTests = (testCategoryId, page) => async (dispatch) => {
  try {
    const response = await expertTestsAPI.getData(testCategoryId, page)
    // dispatch(setTestCreated(null))
    dispatch(setExpertTests(response.data.data, response.data.meta))
  } catch (e) {
    await defaultThunkReject(e, dispatch)
  }
}

export const createTest = (expertTestId) => async (dispatch) => {
  try {
    const response = await testAPI.createTest(expertTestId)
    const { test } = response.data
    dispatch(setTestCreated(test.id))
  } catch (e) {
    await defaultThunkReject(e, dispatch)
  }
}

export default expertTestsReducer
