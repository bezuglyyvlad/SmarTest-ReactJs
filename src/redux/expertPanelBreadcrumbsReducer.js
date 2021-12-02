import { expertPanelTestCatalogAPI } from '../api/api'
import { thunkErrorHandler } from '../utils/utils'

const SET_BREADCRUMBS = 'expertPanelBreadcrumbs/SET_BREADCRUMBS'

const initialState = {
  breadcrumbs: null,
  expertTestName: null
}

const expertPanelBreadcrumbsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BREADCRUMBS:
      return {
        ...state,
        breadcrumbs: action.breadcrumbs,
        expertTestName: action.expertTestName
      }
    default:
      return state
  }
}

const setBreadcrumbsAC = ({ breadcrumbs, expertTestName }) => ({ type: SET_BREADCRUMBS, breadcrumbs, expertTestName })

export const getExpertPanelBreadcrumbs = (testCategoryId, expertTestId = '') => async (dispatch) => {
  try {
    const response = await expertPanelTestCatalogAPI.getBreadcrumbs(testCategoryId, expertTestId)
    dispatch(setBreadcrumbsAC(response.data))
  } catch (e) {
    thunkErrorHandler(e, dispatch)
  }
}

export default expertPanelBreadcrumbsReducer
