import { testCategoriesAPI } from '../api/api'
import { thunkErrorHandler } from '../utils/utils'

const SET_TEST_CATEGORIES = 'testCategories/SET_TEST_CATEGORIES'

const initialState = {
  testCategories: [],
  breadcrumbs: [],
  pagination: []
}

const testCategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TEST_CATEGORIES:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

const setTestCategories = (testCategories, breadcrumbs, pagination) => ({
  type: SET_TEST_CATEGORIES,
  payload: { testCategories, breadcrumbs, pagination }
})

export const getTestCategories = (testCategoryId, page) => async (dispatch) => {
  try {
    const response = await testCategoriesAPI.getData(testCategoryId, page)
    dispatch(setTestCategories(response.data.data, response.data.breadcrumbs, response.data.meta))
  } catch (e) {
    thunkErrorHandler(e, dispatch)
  }
}

export default testCategoriesReducer
