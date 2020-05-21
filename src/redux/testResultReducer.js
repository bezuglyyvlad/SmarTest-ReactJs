import {testAPI} from "../api/api";

const SET_TEST_RESULT_DATA = 'testResult/SET_TEST_RESULT_DATA';

let initialState = {
    test: null,
    questions: null,
    answers: null
};

const testResultReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TEST_RESULT_DATA:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

const setTestResultDataAC = (test, questions, answers) => ({
    type: SET_TEST_RESULT_DATA,
    payload: {test, questions, answers}
});

export const getTestResult = (test_id) => async (dispatch) => {
    const response = await testAPI.getResult(test_id);
    const {test, questions, answers} = response.data;
    dispatch(setTestResultDataAC(test, questions, answers));
}

export default testResultReducer;