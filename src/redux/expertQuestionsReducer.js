import {expertQuestionsAPI} from "../api/api";
import {startSubmit} from "redux-form";
import {downloadFile} from "../utils/utils";

const SET_QUESTIONS = 'expertQuestions/SET_QUESTIONS';
const DELETE_QUESTION = 'expertQuestions/DELETE_QUESTION';
const SET_SERVER_ERRORS = 'expertQuestions/SET_SERVER_ERRORS';

let initialState = {
    questions: null,
    serverErrors: null,
};

const expertQuestionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_QUESTIONS:
            return {
                ...state,
                questions: action.questions
            }
        case DELETE_QUESTION:
            return {
                ...state,
                questions: state.questions.filter(item => item.question_id !== action.question_id)
            }
        case SET_SERVER_ERRORS:
            return {
                ...state,
                serverErrors: action.errors
            }
        default:
            return state;
    }
}

const setQuestionsAC = (questions) => ({type: SET_QUESTIONS, questions});
const deleteQuestionAC = (question_id) => ({type: DELETE_QUESTION, question_id});
const setServerErrorsAC = (errors) => ({type: SET_SERVER_ERRORS, errors});

export const getExpertQuestions = (subcategory_id) => async (dispatch) => {
    const response = await expertQuestionsAPI.getQuestions(subcategory_id);
    dispatch(setQuestionsAC(response.data));
    dispatch(setServerErrorsAC(null));
}

export const deleteQuestion = (question_id) => async (dispatch) => {
    await expertQuestionsAPI.deleteQuestion(question_id);
    dispatch(deleteQuestionAC(question_id));
}

export const addQuestion = (data) => async (dispatch) => {
    dispatch(startSubmit('questionForm'));
    await expertQuestionsAPI.addQuestion(data);
}

export const importQuestions = (data, subcategory_id) => async (dispatch) => {
    try {
        await expertQuestionsAPI.importQuestions(data);
        await dispatch(getExpertQuestions(subcategory_id));
    } catch (e) {
        if (e.response && e.response.status === 413 && e.response.data) {
            dispatch(setServerErrorsAC([e.response.data.message]));
        } else {
            await Promise.reject(e);
        }
    }
}

export const exportQuestions = (subcategory_id, categoryName, subcategoryName) => async (dispatch) => {
    const response = await expertQuestionsAPI.exportQuestions(subcategory_id);
    downloadFile(response.data, `${categoryName}-${subcategoryName}`);
}

export default expertQuestionsReducer;