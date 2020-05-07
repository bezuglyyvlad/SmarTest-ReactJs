import {expertCategoriesAPI, expertTestsAPI} from "../api/api";

const SET_TESTS = 'expertTests/SET_TESTS';

let initialState = {
    tests: null,
};

const expertTestsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TESTS:
            return {
                ...state,
                tests: action.tests
            }
        default:
            return state;
    }
}

const setTestsAC = (tests) => ({type: SET_TESTS, tests: tests});

export const getExpertTests = (category_id) => async (dispatch) => {
    const response = await expertTestsAPI.getTests(category_id);
    dispatch(setTestsAC(response.data));
}

export default expertTestsReducer;