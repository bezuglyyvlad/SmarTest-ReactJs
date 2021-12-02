import { expertPanelTestCatalogAPI } from '../api/api'
import { changeObjectInArray, thunkErrorHandler } from '../utils/utils'

const SET_EXPERT_TESTS = 'expertPanelTestCatalog/SET_EXPERT_TESTS'
const ADD_EXPERT_TEST = 'expertPanelTestCatalog/ADD_EXPERT_TEST'
const UPDATE_EXPERT_TEST = 'expertPanelTestCatalog/UPDATE_EXPERT_TEST'
const DELETE_EXPERT_TEST = 'expertPanelTestCatalog/DELETE_EXPERT_TEST'

const initialState = {
  expertTests: null
}

const expertPanelTestCatalogReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EXPERT_TESTS:
      return {
        ...state,
        expertTests: action.expertTests
      }
    case ADD_EXPERT_TEST:
      return {
        ...state,
        expertTests: [...state.expertTests, action.newExpertTest]
      }
    case UPDATE_EXPERT_TEST:
      return {
        ...state,
        expertTests: changeObjectInArray(
          state.expertTests, action.oldExpertTestId, 'id', action.newExpertTest
        )
      }
    case DELETE_EXPERT_TEST:
      return {
        ...state,
        expertTests: state.expertTests.filter(item => item.id !== action.expertTestId)
      }
    default:
      return state
  }
}

const setExpertTestsAC = (expertTests) => ({ type: SET_EXPERT_TESTS, expertTests })
const addExpertTestAC = (newExpertTest) => ({ type: ADD_EXPERT_TEST, newExpertTest })
const updateExpertTestAC = (oldExpertTestId, newExpertTest) => ({
  type: UPDATE_EXPERT_TEST,
  oldExpertTestId,
  newExpertTest
})
const deleteExpertTestAC = (expertTestId) => ({ type: DELETE_EXPERT_TEST, expertTestId })

export const getExpertPanelTests = (testCategoryId) => async (dispatch) => {
  try {
    const response = await expertPanelTestCatalogAPI.getExpertTests(testCategoryId)
    dispatch(setExpertTestsAC(response.data.data))
  } catch (e) {
    thunkErrorHandler(e, dispatch)
  }
}

export const addExpertTestExpertPanel = (data) => async (dispatch) => {
  try {
    const response = await expertPanelTestCatalogAPI.addTest(data)
    dispatch(addExpertTestAC(response.data.data))
  } catch (e) {
    thunkErrorHandler(e, dispatch)
  }
}

export const updateExpertTestExpertPanel = (id, title, isPublished) => async (dispatch) => {
  try {
    const response = await expertPanelTestCatalogAPI.updateTest(id, title, isPublished)
    dispatch(updateExpertTestAC(id, response.data.data))
  } catch (e) {
    thunkErrorHandler(e, dispatch)
  }
}

export const deleteExpertTestExpertPanel = (expertTestId) => async (dispatch) => {
  try {
    await expertPanelTestCatalogAPI.deleteTest(expertTestId)
    dispatch(deleteExpertTestAC(expertTestId))
  } catch (e) {
    thunkErrorHandler(e, dispatch)
  }
}

export default expertPanelTestCatalogReducer
