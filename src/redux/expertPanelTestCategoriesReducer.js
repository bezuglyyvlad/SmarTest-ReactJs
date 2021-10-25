import {expertPanelTestCategoriesAPI} from "../api/api";

const SET_TEST_CATEGORIES = 'expertPanelCategories/SET_TEST_CATEGORIES';

let initialState = {
    categories: null,
};

const expertPanelTestCategoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TEST_CATEGORIES:
            return {
                ...state,
                categories: action.categories
            }
        default:
            return state;
    }
}

const setTestCategoriesAC = (categories) => ({type: SET_TEST_CATEGORIES, categories});

export const getExpertTestCategories = () => async (dispatch) => {
    const response = await expertPanelTestCategoriesAPI.getTestCategories();
    dispatch(setTestCategoriesAC(response.data));
}

export default expertPanelTestCategoriesReducer;