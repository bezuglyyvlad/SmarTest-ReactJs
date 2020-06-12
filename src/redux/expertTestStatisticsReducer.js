import {expertTestsAPI} from "../api/api";

const SET_TESTS = 'expertTestStatistics/SET_TESTS';

let initialState = {
    tests: null,
};

const expertTestStatisticsReducer = (state = initialState, action) => {
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

const setTestsAC = (tests) => ({type: SET_TESTS, tests});

export const getExpertTestStatistics = (subcategory_id) => async (dispatch) => {
    const response = await expertTestsAPI.getTestStatistics(subcategory_id);
    dispatch(setTestsAC(response.data));
}

export default expertTestStatisticsReducer;