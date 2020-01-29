import {userAPI} from "../api/api";
import {stopSubmit, startSubmit, setSubmitSucceeded} from "redux-form";
import {getBearerTokenFromLS, setBearerTokenToLS} from "../utils/utils";

const SET_USER_DATA = 'user/SET_USER_DATA';
const SET_USERNAME_AND_EMAIL = 'user/SET_USERNAME_AND_EMAIL';

let initialState = {
    userId: null,
    username: null,
    email: null,
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


const setAuthUserData = (userId, username, email, isAuth) => ({
    type: SET_USER_DATA, payload:
        {userId, username, email, isAuth}
});

const setUsernameAndEmail = (username, email) => ({
    type: SET_USERNAME_AND_EMAIL, payload:
        {username, email}
});

export const getUserData = () => async (dispatch) => {
    try {
        const response = await userAPI.getData();
        const {id, username, email} = response.data;
        dispatch(setAuthUserData(id, username, email, true));
    } catch (e) {
        localStorage.clear();
    }
}

export const signIn = (email, password) => async (dispatch) => {
    try {
        dispatch(startSubmit('signin'));
        const response = await userAPI.signIn(email, password);
        setBearerTokenToLS(response.data.access_token);
        dispatch(getUserData(getBearerTokenFromLS()));
        dispatch(startSubmit('signin'));
    } catch (e) {
        const message = e.response.data.message;
        dispatch(stopSubmit('signin', {_error: message}));
    }
}

export const signUp = (username, email, password) => async (dispatch) => {
    try {
        dispatch(startSubmit('signup'));
        await userAPI.signUp(username, email, password);
        dispatch(signIn(email, password));
        dispatch(startSubmit('signup'));
    } catch (e) {
        showErrorToForm(dispatch, e, 'signup');
    }
}

export const signOut = () => async (dispatch) => {
    await userAPI.signOut(getBearerTokenFromLS());
    dispatch(setAuthUserData(null, null, null, false));
}

export const updateUser = (userId, username, email, password) => async (dispatch) => {
    try {
        dispatch(startSubmit('profile'));
        const response = await userAPI.updateData(userId, username, email, password, getBearerTokenFromLS());
        dispatch(setUsernameAndEmail(response.data.username, response.data.email));
        dispatch(stopSubmit('profile'));
        dispatch(setSubmitSucceeded('profile'));
    } catch (e) {
        showErrorToForm(dispatch, e, 'profile');
    }
}

export const deleteUser = (userId) => async (dispatch) => {
    await userAPI.deleteUser(userId, getBearerTokenFromLS());
    dispatch(setAuthUserData(null, null, null, false));
}

export default userReducer;