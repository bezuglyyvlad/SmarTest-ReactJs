import {testAPI} from "../api/api";

const CREATE_TEST = 'test/CREATE_TEST';
const SET_TEST_DATA = 'test/SET_TEST_DATA';

let initialState = {
    testInfo: null,
    question: null,
    answers: []
};

const testReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TEST:
        case SET_TEST_DATA:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}


const createTestAC = (testInfo, question, answers) => ({type: CREATE_TEST, payload: {testInfo, question, answers}});
const setTestDataAC = (testInfo, question, answers) => ({type: SET_TEST_DATA, payload: {testInfo, question, answers}});

export const createTest = (subcategory_id) => async (dispatch) => {
    const test = await testAPI.createTest(subcategory_id);
    const test_id = test.data.test_id;
    const questionData = await testAPI.nextQuestion(test_id);
    dispatch(createTestAC(test.data, questionData.data.question, questionData.data.answers));
    return test_id;
}

export const getTest = (test_id) => async (dispatch) => {
    const response = await testAPI.getTest(test_id);
    const {test, question, answers} = response.data;
    dispatch(setTestDataAC(test, question, answers));
}

export default testReducer;