import {getUserData} from "./userReducer";
import {getBearerTokenFromLS, getPerPageFromLS, removeThemeFromLS, setPerPageToLS, setThemeToLS} from "../utils/utils";

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS';
const SET_THEME = 'app/SET_THEME';
const SET_PER_PAGE = 'app/SET_PER_PAGE';

let initialState = {
    initialized: false,
    theme: null,
    perPage: null
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
        case SET_PER_PAGE:
            return {
                ...state,
                perPage: action.perPage
            }
        default:
            return state;
    }
}


export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});
const setTheme = (theme) => ({type: SET_THEME, theme: theme});
const setPerPage = (perPage) => ({type: SET_PER_PAGE, perPage: perPage});

export const changePerPage = (perPage) => (dispatch) => {
    setPerPageToLS(perPage);
    dispatch(setPerPage(perPage));
}

export const changeTheme = (theme) => (dispatch) => {
    setThemeToLS(theme);
    dispatch(setTheme(theme));
}

export const clearTheme = () => (dispatch) => {
    removeThemeFromLS();
    dispatch(setTheme(null));
}

export const initializeApp = () => (dispatch) => {
    const perPageFromLS = getPerPageFromLS();
    const perPage = perPageFromLS ? perPageFromLS : 10;
    dispatch(changePerPage(perPage));
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