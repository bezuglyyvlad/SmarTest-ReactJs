import {subcategoriesAPI} from "../api/api";

const SET_SUBCATEGORIES = 'subcategory/SET_SUBCATEGORIES';

let initialState = {
    subcategories: [],
    pagination: {}
};

const subcategoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SUBCATEGORIES:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}


const setSubcategories = (subcategories, pagination) => ({
    type: SET_SUBCATEGORIES, payload:
        {subcategories, pagination}
});

export const getSubcategories = (category_id, page, perPage) => async (dispatch) => {
    const response = await subcategoriesAPI.getData(category_id, page, perPage);
    dispatch(setSubcategories(response.data.items, response.data._meta));
}

export default subcategoriesReducer;