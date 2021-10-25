import {testCategoryAPI} from "../api/api";

const SET_TEST_CATEGORY = 'testCategory/SET_TEST_CATEGORY';

let initialState = {
    test_category_id: null,
    name: null
};

const testCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TEST_CATEGORY:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}


const setTestCategory = ({test_category_id, name}) => ({
    type: SET_TEST_CATEGORY, payload:
        {test_category_id, name}
});

export const getTestCategory = (test_category_id) => async (dispatch) => {
    const response = await testCategoryAPI.getData(test_category_id);
    dispatch(setTestCategory(response.data));
}

export default testCategoryReducer;