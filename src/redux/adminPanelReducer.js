import {adminPanelAPI, testAPI} from "../api/api";
import {startSubmit, reset} from "redux-form";

const SET_CATEGORIES = 'adminPanel/SET_CATEGORIES';

let initialState = {
    categories: null,
};

const adminPanelReducer = (state = initialState, action) => {
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

const setCategoriesAC = (categories) => ({type: SET_CATEGORIES, categories: {categories}});

export const getAdminCategories = () => async (dispatch) => {
    const response = await adminPanelAPI.getCategories();
    const categories = response.data.items;
    dispatch(setCategoriesAC(categories));
}

export default adminPanelReducer;