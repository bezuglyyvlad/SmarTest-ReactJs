import { expertPanelTestCatalogAPI } from '../api/api'
import { thunkErrorHandler } from '../utils/utils'

const SET_TESTS = 'expertPanelTestStatistics/SET_TESTS'
const SET_DATA_MINING = 'expertPanelTestStatistics/SET_DATA_MINING'

const initialState = {
  tests: null,
  dataMining: null
}

const expertPanelTestStatisticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TESTS:
      return {
        ...state,
        tests: action.tests
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

const setTestsAC = ({ tests }) => ({
  type: SET_TESTS,
  tests
})
const setDataMiningAC = (dataMining) => ({
  type: SET_DATA_MINING,
  dataMining
})

export const getExpertTestStatistics = (expertTestId) => async (dispatch) => {
  try {
    const response = await expertPanelTestCatalogAPI.getTestStatistics(expertTestId)
    dispatch(setTestsAC(response.data))
  } catch (e) {
    thunkErrorHandler(e, dispatch)
  }
}

export const getExpertDataMining = (expertTestId) => async (dispatch) => {
  try {
    const response = await expertPanelTestCatalogAPI.getDataMining(expertTestId)
    dispatch(setDataMiningAC(response.data))
  } catch (e) {
    thunkErrorHandler(e, dispatch)
  }
}

export default expertPanelTestStatisticsReducer
