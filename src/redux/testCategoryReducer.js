import { testCategoryAPI } from '../api/api'

const SET_TEST_CATEGORY = 'testCategory/SET_TEST_CATEGORY'

const initialState = {
  name: null
}

const testCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TEST_CATEGORY:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

const setTestCategory = ({ name }) => ({
  type: SET_TEST_CATEGORY,
  payload: { name }
})

export const getTestCategory = (testCategoryId) => async (dispatch) => {
  const response = await testCategoryAPI.getData(testCategoryId)
  dispatch(setTestCategory(response.data))
}

export default testCategoryReducer
