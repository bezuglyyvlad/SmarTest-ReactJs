import {testCategoriesAPI} from "../api/api";
import {defaultThunkReject} from "../utils/utils";

const SET_TEST_CATEGORIES = 'testCategories/SET_TEST_CATEGORIES';

let initialState = {
    testCategories: [],
    breadcrumbs: [],
    pagination: []
};

const testCategoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TEST_CATEGORIES:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}


const setTestCategories = (testCategories, breadcrumbs, pagination) => ({
    type: SET_TEST_CATEGORIES, payload:
        {testCategories, breadcrumbs, pagination}
});

export const getTestCategories = (test_category_id, page) => async (dispatch) => {
    try {
        const response = await testCategoriesAPI.getData(test_category_id, page);
        dispatch(setTestCategories(response.data.data, response.data.breadcrumbs, response.data.meta));
    } catch (e) {
        await defaultThunkReject(e, dispatch);
    }
}

export default testCategoriesReducer;