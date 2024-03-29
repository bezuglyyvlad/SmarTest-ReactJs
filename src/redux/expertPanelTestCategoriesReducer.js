import { expertPanelTestCategoriesAPI } from '../api/api'
import { thunkErrorHandler } from '../utils/utils'

const SET_TEST_CATEGORIES = 'expertPanelTestCategories/SET_TEST_CATEGORIES'

const initialState = {
  testCategories: null
}

const expertPanelTestCategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TEST_CATEGORIES:
      return {
        ...state,
        testCategories: action.testCategories
      }
    default:
      return state
  }
}

const setTestCategoriesAC = (testCategories) => ({ type: SET_TEST_CATEGORIES, testCategories })

export const getExpertTestCategories = () => async (dispatch) => {
  try {
    const response = await expertPanelTestCategoriesAPI.getTestCategories()
    dispatch(setTestCategoriesAC(response.data.data))
  } catch (e) {
    thunkErrorHandler(e, dispatch)
  }
}

export default expertPanelTestCategoriesReducer
