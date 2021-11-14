import { expertPanelTestCatalogAPI } from '../api/api'
import { defaultThunkReject } from '../utils/utils'

const SET_TESTS = 'expertPanelTestStatistics/SET_TESTS'
const SET_DATA_MINING = 'expertPanelTestStatistics/SET_DATA_MINING'

const initialState = {
  tests: null,
  testCategoryBreadcrumbs: null,
  expertTestName: null,
  dataMining: null
}

const expertPanelTestStatisticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TESTS:
      return {
        ...state,
        tests: action.tests,
        testCategoryBreadcrumbs: action.testCategoryBreadcrumbs,
        expertTestName: action.expertTestName
      }
    case SET_DATA_MINING:
      return {
        ...state,
        dataMining: action.dataMining
      }
    default:
      return state
  }
}

const setTestsAC = (tests, testCategoryBreadcrumbs, expertTestName) => ({
  type: SET_TESTS,
  tests,
  testCategoryBreadcrumbs,
  expertTestName
})
const setDataMiningAC = (dataMining) => ({
  type: SET_DATA_MINING,
  dataMining
})

export const getExpertTestStatistics = (expertTestId) => async (dispatch) => {
  try {
    const response = await expertPanelTestCatalogAPI.getTestStatistics(expertTestId)
    const { tests, testCategoryBreadcrumbs, expertTestName } = response.data
    dispatch(setTestsAC(tests, testCategoryBreadcrumbs, expertTestName))
  } catch (e) {
    await defaultThunkReject(e, dispatch)
  }
}

export const getExpertDataMining = (expertTestId) => async (dispatch) => {
  try {
    const response = await expertPanelTestCatalogAPI.getDataMining(expertTestId)
    dispatch(setDataMiningAC(response.data))
  } catch (e) {
    await defaultThunkReject(e, dispatch)
  }
}

export default expertPanelTestStatisticsReducer
