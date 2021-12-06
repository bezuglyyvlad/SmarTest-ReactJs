import { userAPI } from '../api/api'
import {
  removeAccessTokenFromLS,
  removeRefreshTokenFromLS,
  setAccessTokenToLS,
  setRefreshTokenToLS
} from '../utils/localStorage'
import { thunkErrorHandler } from '../utils/utils'

const SET_USER_DATA = 'user/SET_USER_DATA'
const SET_NAME_AND_EMAIL = 'user/SET_NAME_AND_EMAIL'

const initialState = {
  userId: null,
  name: null,
  email: null,
  roles: null,
  isAuth: false
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload
      }
    case SET_NAME_AND_EMAIL:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

const setAuthUserData = (userId, name, email, roles, isAuth) => ({
  type: SET_USER_DATA,
  payload: { userId, name, email, roles, isAuth }
})

const setNameAndEmail = (name, email) => ({
  type: SET_NAME_AND_EMAIL,
  payload: { name, email }
})

export const getUserData = () => async (dispatch) => {
  try {
    const response = await userAPI.getData()
    const { id, name, email, roles } = response.data.data
    dispatch(setAuthUserData(id, name, email, roles, true))
  } catch (e) {
    thunkErrorHandler(e, dispatch)
  }
}

export const signIn = ({ email, password }) => async (dispatch) => {
  const response = await userAPI.signIn(email, password)
  setAccessTokenToLS(response.data.access_token)
  setRefreshTokenToLS(response.data.refresh_token)
  dispatch(getUserData())
}

export const signUp = ({ name, email, password, password_confirmation: passwordConfirmation }) => async (dispatch) => {
  try {
    await userAPI.signUp(name, email, password, passwordConfirmation)
    dispatch(signIn({ email, password }))
  } catch (e) {
    thunkErrorHandler(e, dispatch)
  }
}

export const signOut = () => async (dispatch) => {
  try {
    await userAPI.signOut()
    kickUser(dispatch)
  } catch (e) {
    thunkErrorHandler(e, dispatch)
  }
}

export const updateUser = (
  userId,
  {
    name,
    email,
    password,
    password_confirmation: passwordConfirmation
  }
) => async (dispatch) => {
  try {
    const response = await userAPI.updateData(userId, name, email, password, passwordConfirmation)
    dispatch(setNameAndEmail(response.data.data.name, response.data.data.email))
  } catch (e) {
    thunkErrorHandler(e, dispatch)
  }
}

export const deleteUser = (userId) => async (dispatch) => {
  try {
    await userAPI.deleteUser(userId)
    kickUser(dispatch)
  } catch (e) {
    thunkErrorHandler(e, dispatch)
  }
}

export const kickUser = (dispatch) => {
  removeAccessTokenFromLS()
  removeRefreshTokenFromLS()
  dispatch(setAuthUserData(null, null, null, null, false))
}

export default userReducer
