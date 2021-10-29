import {testAPI} from "../api/api";
import {defaultThunkReject} from "../utils/utils";

const SET_TEST_RESULT_DATA = 'testResult/SET_TEST_RESULT_DATA';

let initialState = {
    test: null,
    questions: null,
    answers: null,
    basicPoints: null,
    correctionCoef: null
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
    try {
        const response = await testAPI.getResult(test_id);
        if (response.data.length !== 0) {
            const {test, questions, answers, basicPoints, correctionCoef} = response.data;
            dispatch(setTestResultDataAC(test, questions, answers, basicPoints, correctionCoef));
        } else {
            await Promise.reject('403 Forbidden');
        }
    } catch (e) {
        await defaultThunkReject(e, dispatch);
    }
}

export default testResultReducer;