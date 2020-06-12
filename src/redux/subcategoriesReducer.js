import {subcategoriesAPI, testAPI} from "../api/api";

const SET_SUBCATEGORIES = 'subcategory/SET_SUBCATEGORIES';
const SET_TEST_CREATED = 'subcategory/SET_TEST_CREATED';

let initialState = {
    subcategories: [],
    pagination: {},
    testCreatedId: null
};

const subcategoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SUBCATEGORIES:
            return {
                ...state,
                ...action.payload
            }
        case SET_TEST_CREATED:
            return {
                ...state,
                testCreatedId: action.test_id
            }
        default:
            return state;
    }
}


const setSubcategories = (subcategories, pagination) => ({
    type: SET_SUBCATEGORIES, payload:
        {subcategories, pagination}
});
const setTestCreated = (test_id) => ({type: SET_TEST_CREATED, test_id});

export const getSubcategories = (category_id, page) => async (dispatch) => {
    const response = await subcategoriesAPI.getData(category_id, page);
    dispatch(setTestCreated(null));
    dispatch(setSubcategories(response.data.items, response.data._meta));
}

export const createTest = (subcategory_id) => async (dispatch) => {
    const response = await testAPI.createTest(subcategory_id);
    const {test} = response.data;
    dispatch(setTestCreated(test.test_id));
}

export default subcategoriesReducer;