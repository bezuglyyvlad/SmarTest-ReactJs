import { expertPanelTestCatalogAPI, testCategoryAPI } from '../api/api'
import { changeObjectInArray, defaultThunkReject, errorHandling } from '../utils/utils'

const SET_EXPERT_TESTS = 'expertPanelTestCatalog/SET_EXPERT_TESTS'
const SET_TEST_CATEGORIES = 'expertPanelTestCatalog/SET_TEST_CATEGORIES'
const ADD_EXPERT_TEST = 'expertPanelTestCatalog/ADD_EXPERT_TEST'
const UPDATE_EXPERT_TEST = 'expertPanelTestCatalog/UPDATE_EXPERT_TEST'
const DELETE_EXPERT_TEST = 'expertPanelTestCatalog/DELETE_EXPERT_TEST'
const ADD_TEST_CATEGORY = 'expertPanelTestCatalog/ADD_TEST_CATEGORY'
const UPDATE_TEST_CATEGORY = 'expertPanelTestCatalog/UPDATE_TEST_CATEGORY'
const DELETE_TEST_CATEGORY = 'expertPanelTestCatalog/DELETE_TEST_CATEGORY'

const initialState = {
  expertTests: null,
  testCategories: null,
  breadcrumbs: null,
  parentSelect: null
}

const expertPanelTestCatalogReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EXPERT_TESTS:
      return {
        ...state,
        expertTests: action.expertTests
      }
    case SET_TEST_CATEGORIES:
      return {
        ...state,
        testCategories: action.testCategories,
        breadcrumbs: action.breadcrumbs,
        parentSelect: action.parentSelect
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

const setExpertTestsAC = (expertTests) => ({ type: SET_EXPERT_TESTS, expertTests })
const setTestCategoriesAC = (testCategories, breadcrumbs, parentSelect) => ({
  type: SET_TEST_CATEGORIES,
  testCategories,
  breadcrumbs,
  parentSelect
})
const addExpertTestAC = (newExpertTest) => ({ type: ADD_EXPERT_TEST, newExpertTest })
const updateExpertTestAC = (oldExpertTestId, newExpertTest) => ({
  type: UPDATE_EXPERT_TEST,
  oldExpertTestId,
  newExpertTest
})
const deleteExpertTestAC = (expertTestId) => ({ type: DELETE_EXPERT_TEST, expertTestId })

const addTestCategoryAC = (newTestCategory) => ({ type: ADD_TEST_CATEGORY, newTestCategory })
const updateTestCategoryAC = (oldTestCategoryId, newTestCategory) => ({
  type: UPDATE_TEST_CATEGORY,
  oldTestCategoryId,
  newTestCategory
})
const deleteTestCategoryAC = (testCategoryId) => ({ type: DELETE_TEST_CATEGORY, testCategoryId })

export const getExpertPanelTests = (testCategoryId) => async (dispatch) => {
  try {
    const response = await expertPanelTestCatalogAPI.getExpertTests(testCategoryId)
    dispatch(setExpertTestsAC(response.data.data))
  } catch (e) {
    await defaultThunkReject(e, dispatch)
  }
}

export const getExpertPanelTestCategories = (testCategoryId) => async (dispatch) => {
  try {
    const response = await expertPanelTestCatalogAPI.getTestCategories(testCategoryId)
    const { data, breadcrumbs, parentSelect } = response.data
    dispatch(setTestCategoriesAC(data, breadcrumbs, parentSelect))
  } catch (e) {
    await defaultThunkReject(e, dispatch)
  }
}

export const addExpertTestExpertPanel = (data) => async (dispatch) => {
  try {
    const response = await expertPanelTestCatalogAPI.addTest(data)
    dispatch(addExpertTestAC(response.data.data))
  } catch (e) {
    return errorHandling(e, dispatch)
  }
}

export const updateExpertTestExpertPanel = (id, title, isPublished) => async (dispatch) => {
  try {
    const response = await expertPanelTestCatalogAPI.updateTest(id, title, isPublished)
    dispatch(updateExpertTestAC(id, response.data.data))
  } catch (e) {
    return errorHandling(e, dispatch)
  }
}

export const deleteExpertTestExpertPanel = (expertTestId) => async (dispatch) => {
  try {
    await expertPanelTestCatalogAPI.deleteTest(expertTestId)
    dispatch(deleteExpertTestAC(expertTestId))
  } catch (e) {
    await defaultThunkReject(e, dispatch)
  }
}

export const addTestCategoryExpertPanel = (title, parentId, userEmail, testCategoryId) => async (dispatch) => {
  try {
    const response = await testCategoryAPI.addCategory(title, parentId, userEmail)
    if (parentId === testCategoryId) {
      await dispatch(addTestCategoryAC(response.data.data))
    } else {
      await dispatch(getExpertPanelTestCategories(testCategoryId))
    }
  } catch (e) {
    return errorHandling(e, dispatch)
  }
}

export const updateTestCategoryExpertPanel = (id, title, parentId, userEmail, testCategoryId) => async (dispatch) => {
  try {
    const response = await testCategoryAPI.updateCategory(id, title, userEmail)
    if (parentId === testCategoryId) {
      await dispatch(updateTestCategoryAC(id, response.data.data))
    } else {
      await dispatch(getExpertPanelTestCategories(testCategoryId))
    }
  } catch (e) {
    return errorHandling(e, dispatch)
  }
}

export const deleteTestCategoryExpertPanel = (testCategoryId) => async (dispatch) => {
  try {
    await testCategoryAPI.deleteCategory(testCategoryId)
    await dispatch(deleteTestCategoryAC(testCategoryId))
  } catch (e) {
    await defaultThunkReject(e, dispatch)
  }
}

export default expertPanelTestCatalogReducer
