import {expertPanelAPI} from "../api/api";

const SET_CATEGORIES = 'expertPanel/SET_CATEGORIES';

let initialState = {
    categories: null,
};

const expertPanelReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CATEGORIES:
            return {
                ...state,
                categories: action.categories
            }
        default:
            return state;
    }
}

const setCategoriesAC = (categories) => ({type: SET_CATEGORIES, categories: categories});

export const getExpertCategories = () => async (dispatch) => {
    const response = await expertPanelAPI.getCategories();
    dispatch(setCategoriesAC(response.data));
}

export default expertPanelReducer;