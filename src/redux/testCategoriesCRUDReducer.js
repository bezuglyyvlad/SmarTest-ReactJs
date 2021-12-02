import { adminPanelAPI, expertPanelTestCatalogAPI, testCategoryAPI } from '../api/api'
import { changeObjectInArray, thunkErrorHandler } from '../utils/utils'

const SET_TEST_CATEGORIES = 'testCategoriesCRUD/SET_TEST_CATEGORIES'
const ADD_TEST_CATEGORY = 'testCategoriesCRUD/ADD_TEST_CATEGORY'
const UPDATE_TEST_CATEGORY = 'testCategoriesCRUD/UPDATE_TEST_CATEGORY'
const DELETE_TEST_CATEGORY = 'testCategoriesCRUD/DELETE_TEST_CATEGORY'

const initialState = {
  testCategories: null
}

const testCategoriesCRUDReducer = (state = initialState, action) => {
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
        testCategories: state.testCategories.filter(item => item.id !== action.testCategoryId)
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
const deleteTestCategoryAC = (testCategoryId) => ({ type: DELETE_TEST_CATEGORY, testCategoryId })

export const getAdminTestCategories = () => async (dispatch) => {
  try {
    const response = await adminPanelAPI.getCategories()
    dispatch(setTestCategoriesAC(response.data.data))
  } catch (e) {
    thunkErrorHandler(e, dispatch)
  }
}

export const getExpertPanelTestCategories = (testCategoryId) => async (dispatch) => {
  try {
    const response = await expertPanelTestCatalogAPI.getTestCategories(testCategoryId)
    dispatch(setTestCategoriesAC(response.data.data))
  } catch (e) {
    thunkErrorHandler(e, dispatch)
  }
}

export const addTestCategory = (title, userEmail, testCategoryId) => async (dispatch) => {
  try {
    const response = await testCategoryAPI.addCategory(title, userEmail, testCategoryId)
    dispatch(addTestCategoryAC(response.data.data))
  } catch (e) {
    thunkErrorHandler(e, dispatch)
  }
}

export const updateTestCategory = (id, title, userEmail) => async (dispatch) => {
  try {
    const response = await testCategoryAPI.updateCategory(id, title, userEmail)
    dispatch(updateTestCategoryAC(id, response.data.data))
  } catch (e) {
    thunkErrorHandler(e, dispatch)
  }
}

export const deleteTestCategory = (testCategoryId) => async (dispatch) => {
  try {
    await testCategoryAPI.deleteCategory(testCategoryId)
    dispatch(deleteTestCategoryAC(testCategoryId))
  } catch (e) {
    thunkErrorHandler(e, dispatch)
  }
}

export default testCategoriesCRUDReducer
