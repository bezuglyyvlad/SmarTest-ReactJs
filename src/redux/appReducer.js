import {getUserData} from "./userReducer";
import {getBearerTokenFromLS, removeThemeFromLS, setThemeFromLS} from "../utils/utils";

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS';
const SET_THEME = 'app/SET_THEME';

let initialState = {
    initialized: false,
    theme: null
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        case SET_THEME:
            return {
                ...state,
                theme: action.theme
            }
        default:
            return state;
    }
}


export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});
export const setTheme = (theme) => ({type: SET_THEME, theme: theme});

export const changeTheme = (theme) => (dispatch) => {
    setThemeFromLS(theme);
    dispatch(setTheme(theme));
}

export const clearTheme = () => (dispatch) => {
    removeThemeFromLS();
    dispatch(setTheme(null));
}

export const initializeApp = () => (dispatch) => {
    const token = getBearerTokenFromLS();
    if (!token) {
        return dispatch(initializedSuccess())
    }
    let promise = dispatch(getUserData(token));

    //dispatch(somethingelse());
    //dispatch(somethingelse());
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess());
        });
}


export default appReducer;