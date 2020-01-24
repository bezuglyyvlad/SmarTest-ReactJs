import {userAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {getBearerTokenFromLS, setBearerTokenToLS} from "../utils/utils";

const SET_USER_DATA = 'user/SET_USER_DATA';

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
        default:
            return state;
    }
}


export const setAuthUserData = (userId, username, email, isAuth) => ({
    type: SET_USER_DATA, payload:
        {userId, username, email, isAuth}
});

export const getUserData = (bearerToken) => async (dispatch) => {
    try {
        const response = await userAPI.getData(bearerToken);
        const {id, username, email} = response.data;
        dispatch(setAuthUserData(id, username, email, true));
    } catch (e) {
        localStorage.clear();
    }
}

export const signIn = (email, password) => async (dispatch) => {
    try {
        const response = await userAPI.signIn(email, password);
        setBearerTokenToLS(response.data.access_token);
        dispatch(getUserData(getBearerTokenFromLS()));
    } catch (e) {
        const message = e.response.data.message;
        dispatch(stopSubmit('signin', {_error: message}));
    }
}

export const signUp = (username, email, password) => async (dispatch) => {
    try {
        await userAPI.signUp(username, email, password);
        dispatch(signIn(email, password));
    } catch (e) {
        const errors = {};
        // eslint-disable-next-line array-callback-return
        e.response.data.map(object => {
            errors[object.field] = object.message;
        });
        dispatch(stopSubmit('signup', errors));
    }
}

export const signOut = () => async (dispatch) => {
    await userAPI.signOut(getBearerTokenFromLS());
    dispatch(setAuthUserData(null, null, null, false));
}

export default userReducer;