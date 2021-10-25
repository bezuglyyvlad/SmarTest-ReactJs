import {userAPI} from "../api/api";
import {stopSubmit, startSubmit, setSubmitSucceeded, clearFields, initialize} from "redux-form";
import {
    removeAccessTokenFromLS,
    removeRefreshTokenFromLS,
    setAccessTokenToLS,
    setRefreshTokenToLS
} from "../utils/localStorage";
import {defaultThunkReject} from "../utils/utils";

const SET_USER_DATA = 'user/SET_USER_DATA';
const SET_NAME_AND_EMAIL = 'user/SET_NAME_AND_EMAIL';

let initialState = {
    userId: null,
    name: null,
    email: null,
    roles: null,
    isAuth: false,
};

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
            return state;
    }
}

const setAuthUserData = (userId, name, email, roles, isAuth) => ({
    type: SET_USER_DATA, payload:
        {userId, name, email, roles, isAuth}
});

const setNameAndEmail = (name, email) => ({
    type: SET_NAME_AND_EMAIL, payload:
        {name, email}
});

export const getUserData = () => async (dispatch) => {
    try {
        const response = await userAPI.getData();
        const {id, name, email, roles} = response.data.data;
        dispatch(setAuthUserData(id, name, email, roles, true));
    } catch (e) {
        await defaultThunkReject(e, dispatch);
    }
}

export const signIn = (email, password) => async (dispatch) => {
    try {
        dispatch(startSubmit('signin'));
        const response = await userAPI.signIn(email, password);
        setAccessTokenToLS(response.data.access_token);
        setRefreshTokenToLS(response.data.refresh_token);
        await dispatch(getUserData());
        dispatch(stopSubmit('signin'));
    } catch (e) {
        if (e.response && e.response.status === 400 && e.response.data) {
            //const message = e.response.data.message;
            const message = 'Неправильні дані користувача';
            dispatch(initialize('signin', {email, password}));
            dispatch(stopSubmit('signin', {_error: message}));
        } else {
            await Promise.reject(e);
        }
    }
}

export const signUp = (name, email, password, password_confirmation) => async (dispatch) => {
    try {
        dispatch(startSubmit('signup'));
        await userAPI.signUp(name, email, password, password_confirmation);
        await dispatch(signIn(email, password));
        dispatch(stopSubmit('signup'));
    } catch (e) {
        if (e.response && e.response.status === 422 && e.response.data) {
            dispatch(stopSubmit('signup', e.response.data.errors));
        } else {
            await defaultThunkReject(e, dispatch);
        }
    }
}

export const signOut = () => async (dispatch) => {
    await userAPI.signOut();
    kickUser(dispatch);
}

export const updateUser = (userId, name, email, password, password_confirmation) => async (dispatch) => {
    try {
        dispatch(startSubmit('profile'));
        const response = await userAPI.updateData(userId, name, email, password, password_confirmation);
        dispatch(setNameAndEmail(response.data.data.name, response.data.data.email));
        dispatch(stopSubmit('profile'));
        dispatch(clearFields('profile', false, false, 'password', 'password_confirmation'));
        dispatch(setSubmitSucceeded('profile'));
    } catch (e) {
        if (e.response && e.response.status === 422 && e.response.data) {
            dispatch(stopSubmit('profile', e.response.data.errors));
        } else {
            await defaultThunkReject(e, dispatch);
        }
    }
}

export const deleteUser = (userId) => async (dispatch) => {
    await userAPI.deleteUser(userId);
    kickUser(dispatch);
}

export const kickUser = (dispatch) => {
    removeAccessTokenFromLS();
    removeRefreshTokenFromLS();
    dispatch(setAuthUserData(null, null, null, null, false));
}

export default userReducer;