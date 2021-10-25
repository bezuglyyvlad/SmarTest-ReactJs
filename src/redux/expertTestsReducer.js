import {expertTestsAPI, testAPI} from "../api/api";

const SET_EXPERT_TESTS = 'expertTest/SET_EXPERT_TESTS';
const SET_TEST_CREATED = 'expertTest/SET_TEST_CREATED';

let initialState = {
    expertTests: [],
    pagination: {},
    testCreatedId: null
};

const expertTestsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EXPERT_TESTS:
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


const setExpertTests = (expertTests, pagination) => ({
    type: SET_EXPERT_TESTS, payload:
        {expertTests, pagination}
});
const setTestCreated = (test_id) => ({type: SET_TEST_CREATED, test_id});

export const getExpertTests = (test_category_id, page) => async (dispatch) => {
    const response = await expertTestsAPI.getData(test_category_id, page);
    //dispatch(setTestCreated(null));
    dispatch(setExpertTests(response.data.data, response.data.meta));
}

export const createTest = (expert_test_id) => async (dispatch) => {
    const response = await testAPI.createTest(expert_test_id);
    const {test} = response.data;
    dispatch(setTestCreated(test.test_id));
}

export default expertTestsReducer;