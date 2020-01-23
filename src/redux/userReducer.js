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

export const login = (email, password) => async (dispatch) => {
    try {
        const response = await userAPI.login(email, password);
        setBearerTokenToLS(response.data.access_token);
        dispatch(getUserData(getBearerTokenFromLS()));
    } catch (e) {
        const message = e.response.data.message;
        dispatch(stopSubmit('signin', {_error: message}));
    }
}

export const logout = () => async (dispatch) => {
    await userAPI.logout(getBearerTokenFromLS());
    dispatch(setAuthUserData(null, null, null, false));
}

export default userReducer;