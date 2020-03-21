import {userAPI} from "../api/api";
import {stopSubmit, startSubmit, setSubmitSucceeded, clearFields} from "redux-form";
import {getBearerTokenFromLS, removeBearerTokenFromLS, setBearerTokenToLS} from "../utils/utils";

const SET_USER_DATA = 'user/SET_USER_DATA';
const SET_USERNAME_AND_EMAIL = 'user/SET_USERNAME_AND_EMAIL';

let initialState = {
    userId: null,
    username: null,
    email: null,
    role: null,
    isAuth: false,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        case SET_USERNAME_AND_EMAIL:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}


const showErrorToForm = (dispatch, e, form) => {
    const errors = {};
    // eslint-disable-next-line array-callback-return
    e.response.data.map(object => {
        errors[object.field] = object.message;
    });
    dispatch(stopSubmit(form, errors));
}


const setAuthUserData = (userId, username, email, role, isAuth) => ({
    type: SET_USER_DATA, payload:
        {userId, username, email, role, isAuth}
});

const setUsernameAndEmail = (username, email) => ({
    type: SET_USERNAME_AND_EMAIL, payload:
        {username, email}
});

export const getUserData = () => async (dispatch) => {
    try {
        const response = await userAPI.getData();
        const roles = Object.keys(response.data.role);
        const {id, username, email} = response.data.user;
        dispatch(setAuthUserData(id, username, email, roles, true));
    } catch (e) {
        removeBearerTokenFromLS();
    }
}

export const signIn = (email, password) => async (dispatch) => {
    try {
        dispatch(startSubmit('signin'));
        const response = await userAPI.signIn(email, password);
        setBearerTokenToLS(response.data.access_token);
        dispatch(getUserData(getBearerTokenFromLS()));
    } catch (e) {
        if (e.response && e.response.status === 400 && e.response.data) {
            const message = e.response.data.message;
            dispatch(stopSubmit('signin', {_error: message}));
        } else {
            await Promise.reject(e);
        }
    }
}

export const signUp = (username, email, password) => async (dispatch) => {
    try {
        dispatch(startSubmit('signup'));
        await userAPI.signUp(username, email, password);
        dispatch(signIn(email, password));
    } catch (e) {
        if (e.response && e.response.status === 422 && e.response.data) {
            showErrorToForm(dispatch, e, 'signup');
        } else {
            await Promise.reject(e);
        }
    }
}

export const signOut = () => async (dispatch) => {
    await userAPI.signOut(getBearerTokenFromLS());
    dispatch(setAuthUserData(null, null, null, null, false));
}

export const updateUser = (userId, username, email, password) => async (dispatch) => {
    try {
        dispatch(startSubmit('profile'));
        const response = await userAPI.updateData(userId, username, email, password, getBearerTokenFromLS());
        dispatch(setUsernameAndEmail(response.data.username, response.data.email));
        dispatch(stopSubmit('profile'));
        dispatch(clearFields('profile', false, false, 'password'));
        dispatch(setSubmitSucceeded('profile'));
    } catch (e) {
        if (e.response && e.response.status === 422 && e.response.data) {
            showErrorToForm(dispatch, e, 'profile');
        } else {
            await Promise.reject(e);
        }
    }
}

export const deleteUser = (userId) => async (dispatch) => {
    await userAPI.deleteUser(userId, getBearerTokenFromLS());
    dispatch(setAuthUserData(null, null, null, null, false));
}

export default userReducer;