import {testAPI} from "../api/api";
import {startSubmit, reset} from "redux-form";

const SET_TEST_DATA = 'test/SET_TEST_DATA';
const GET_NEXT_QUESTION = 'test/GET_NEXT_QUESTION';

let initialState = {
    testInfo: null,
    question: null,
    answers: []
};

const testReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TEST_DATA:
            return {
                ...state,
                ...action.payload
            }
        case GET_NEXT_QUESTION:
            return {
                ...state,
                question: action.question,
                answers: action.answers,
            }
        default:
            return state;
    }
}

const setTestDataAC = (testInfo, question, answers) => ({type: SET_TEST_DATA, payload: {testInfo, question, answers}});
const setNewQuestion = (question, answers) => ({type: GET_NEXT_QUESTION, question, answers});

export const getTest = (test_id) => async (dispatch) => {
    const response = await testAPI.getTest(test_id);
    const {test, question, answers} = response.data;
    dispatch(setTestDataAC(test, question, answers));
}

export const nextQuestion = (test_id, answer) => async (dispatch) => {
    dispatch(startSubmit('test'));
    const response = await testAPI.nextQuestion(test_id, answer);
    if (response.data) {
        const {question, answers} = response.data;
        dispatch(setNewQuestion(question, answers));
        dispatch(reset('test'));
    }
}

export default testReducer;