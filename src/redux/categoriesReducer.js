import {categoriesAPI} from "../api/api";

const SET_CATEGORIES = 'categories/SET_CATEGORIES';

let initialState = {
    categories: [],
    pagination: []
};

const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CATEGORIES:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}


const setCategories = (categories, pagination) => ({
    type: SET_CATEGORIES, payload:
        {categories, pagination}
});

export const getCategories = (page, perPage) => async (dispatch) => {
    const response = await categoriesAPI.getData(page, perPage);
    dispatch(setCategories(response.data.items, response.data._meta));
}

export default categoriesReducer;