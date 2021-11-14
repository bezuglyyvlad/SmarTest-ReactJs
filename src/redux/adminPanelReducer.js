import { adminPanelAPI, testCategoryAPI } from '../api/api'
import { changeObjectInArray, defaultThunkReject, errorHandling } from '../utils/utils'

const SET_TEST_CATEGORIES = 'adminPanel/SET_TEST_CATEGORIES'
const ADD_TEST_CATEGORY = 'adminPanel/ADD_TEST_CATEGORY'
const UPDATE_TEST_CATEGORY = 'adminPanel/UPDATE_TEST_CATEGORY'
const DELETE_TEST_CATEGORY = 'adminPanel/DELETE_TEST_CATEGORY'

const initialState = {
  testCategories: null
}

const adminPanelReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TEST_CATEGORIES:
      return {
        ...state,
        testCategories: action.testCategories
      }
    case ADD_TEST_CATEGORY:
      return {
        ...state,
        testCategories: [...state.testCategories, action.newTestCategory]
      }
    case UPDATE_TEST_CATEGORY:
      return {
        ...state,
        testCategories: changeObjectInArray(
          state.testCategories, action.oldTestCategoryId, 'id', action.newTestCategory
        )
      }
    case DELETE_TEST_CATEGORY:
      return {
        ...state,
        testCategories: state.testCategories.filter(item => item.id !== action.id)
      }
    default:
      return state
  }
}

const setTestCategoriesAC = (testCategories) => ({ type: SET_TEST_CATEGORIES, testCategories })
const addTestCategoryAC = (newTestCategory) => ({ type: ADD_TEST_CATEGORY, newTestCategory })
const updateTestCategoryAC = (oldTestCategoryId, newTestCategory) => ({
  type: UPDATE_TEST_CATEGORY,
  oldTestCategoryId,
  newTestCategory
})
const deleteTestCategoryAC = (id) => ({ type: DELETE_TEST_CATEGORY, id })

export const getAdminTestCategories = () => async (dispatch) => {
  try {
    const response = await adminPanelAPI.getCategories()
    dispatch(setTestCategoriesAC(response.data.data))
  } catch (e) {
    await defaultThunkReject(e, dispatch)
  }
}

export const addTestCategoryAdminPanel = (title, userEmail) => async (dispatch) => {
  try {
    const response = await testCategoryAPI.addCategory(title, userEmail)
    await dispatch(addTestCategoryAC(response.data.data))
  } catch (e) {
    return errorHandling(e, dispatch)
  }
}

export const updateTestCategoryAdminPanel = (id, title, userEmail) => async (dispatch) => {
  try {
    const response = await testCategoryAPI.updateCategory(id, title, userEmail)
    await dispatch(updateTestCategoryAC(id, response.data.data))
  } catch (e) {
    return errorHandling(e, dispatch)
  }
}

export const deleteTestCategoryAdminPanel = (id) => async (dispatch) => {
  try {
    await testCategoryAPI.deleteCategory(id)
    await dispatch(deleteTestCategoryAC(id))
  } catch (e) {
    await defaultThunkReject(e, dispatch)
  }
}

export default adminPanelReducer
