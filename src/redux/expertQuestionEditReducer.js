import {expertAnswersAPI, expertQuestionAPI} from "../api/api";
import {initialize, startSubmit, stopSubmit} from "redux-form";

const SET_QUESTION = 'expertQuestionEdit/SET_QUESTION';
const SET_ANSWERS = 'expertQuestionEdit/SET_ANSWERS';

let initialState = {
    question: null,
    answers: null
};

const expertQuestionEditReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_QUESTION:
            return {
                ...state,
                question: action.question
            }
        case SET_ANSWERS:
            return {
                ...state,
                answers: action.answers
            }
        default:
            return state;
    }
}

const setQuestionAC = (question) => ({type: SET_QUESTION, question});
const setAnswersAC = (answers) => ({type: SET_ANSWERS, answers});

export const getExpertQuestion = (question_id) => async (dispatch) => {
    const response = await expertQuestionAPI.getQuestion(question_id);
    dispatch(setQuestionAC(response.data));
}

export const editQuestion = (data, question_id) => async (dispatch) => {
    dispatch(startSubmit('questionForm'));
    await expertQuestionAPI.updateQuestion(data, question_id);
    dispatch(getExpertQuestion(question_id));
    dispatch(initialize('questionForm', data));
    dispatch(stopSubmit('questionForm'));
}

export const uploadQuestionImage = (data, question_id) => async (dispatch) => {
    const response = await expertQuestionAPI.uploadImage(data, question_id);
    dispatch(setQuestionAC(response.data));
}

export const deleteQuestionImage = (question_id) => async (dispatch) => {
    const response = await expertQuestionAPI.deleteImage(question_id);
    dispatch(setQuestionAC(response.data));
}

export const getExpertAnswers = (question_id) => async (dispatch) => {
    const response = await expertAnswersAPI.getAnswers(question_id);
    dispatch(setAnswersAC(response.data));
}

export const addAnswer = (data) => async (dispatch) => {
    await expertAnswersAPI.addAnswer(data);
    dispatch(getExpertAnswers(data.question_id));
}

export const updateAnswer = (data) => async (dispatch) => {
    await expertAnswersAPI.updateAnswer(data);
    dispatch(getExpertAnswers(data.question_id));
}

export const deleteAnswer = (answer_id, question_id) => async (dispatch) => {
    await expertAnswersAPI.deleteAnswer(answer_id);
    dispatch(getExpertAnswers(question_id));
}

export default expertQuestionEditReducer;