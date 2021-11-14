import { statisticsAPI } from '../api/api'
import { defaultThunkReject } from '../utils/utils'

const SET_RATING = 'statistics/SET_RATING'
const SET_TESTS = 'statistics/SET_TESTS'

const initialState = {
  ratingInfo: null,
  tests: null,
  pagination: null
}

const statisticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RATING:
      return {
        ...state,
        ratingInfo: action.ratingInfo
      }
    case SET_TESTS:
      return {
        ...state,
        tests: action.tests,
        pagination: action.pagination
      }
    default:
      return state
  }
}

const setRatingAC = (ratingInfo) => ({ type: SET_RATING, ratingInfo })
const setTestsAC = (tests, pagination) => ({ type: SET_TESTS, tests, pagination })

export const getRating = () => async (dispatch) => {
  try {
    const response = await statisticsAPI.getRating()
    dispatch(setRatingAC(response.data))
  } catch (e) {
    await defaultThunkReject(e, dispatch)
  }
}

export const getTests = (page, perPage) => async (dispatch) => {
  try {
    const response = await statisticsAPI.getTests(page, perPage)
    const { data, meta } = response.data
    dispatch(setTestsAC(data, meta))
  } catch (e) {
    await defaultThunkReject(e, dispatch)
  }
}

export default statisticsReducer
