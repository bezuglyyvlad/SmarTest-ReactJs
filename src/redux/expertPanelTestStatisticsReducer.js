import {expertTestsAPI} from "../api/api";

const SET_TESTS = 'expertPanelTestStatistics/SET_TESTS';

let initialState = {
    tests: null,
};

const expertPanelTestStatisticsReducer = (state = initialState, action) => {
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

export const getExpertTestStatistics = (expert_test_id) => async (dispatch) => {
    const response = await expertTestsAPI.getTestStatistics(expert_test_id);
    dispatch(setTestsAC(response.data));
}

export default expertPanelTestStatisticsReducer;