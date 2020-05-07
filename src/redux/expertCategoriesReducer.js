import {expertCategoriesAPI} from "../api/api";

const SET_CATEGORIES = 'expertCategories/SET_CATEGORIES';

let initialState = {
    categories: null,
};

const expertCategoriesReducer = (state = initialState, action) => {
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
    const response = await expertCategoriesAPI.getCategories();
    dispatch(setCategoriesAC(response.data));
}

export default expertCategoriesReducer;