import {expertAnswersAPI, expertQuestionAPI} from "../api/api";
import {initialize, startSubmit, stopSubmit} from "redux-form";
import {changeObjectInArray} from "../utils/utils";

const SET_QUESTION = 'expertQuestionEdit/SET_QUESTION';
const SET_ANSWERS = 'expertQuestionEdit/SET_ANSWERS';
const ADD_ANSWER = 'expertQuestionEdit/ADD_ANSWER';
const UPDATE_ANSWER = 'expertQuestionEdit/UPDATE_ANSWER';
const DELETE_ANSWER = 'expertQuestionEdit/DELETE_ANSWER';

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
        case ADD_ANSWER:
            return {
                ...state,
                answers: [...state.answers, action.newAnswer]
            }
        case UPDATE_ANSWER:
            return {
                ...state,
                answers: changeObjectInArray(state.answers, action.newAnswer.answer_id, 'answer_id', action.newAnswer)
            }
        case DELETE_ANSWER:
            return {
                ...state,
                answers: state.answers.filter(item => item.answer_id !== action.answer_id)
            }
        default:
            return state;
    }
}

const setQuestionAC = (question) => ({type: SET_QUESTION, question});
const setAnswersAC = (answers) => ({type: SET_ANSWERS, answers});
const addAnswerAC = (newAnswer) => ({type: ADD_ANSWER, newAnswer});
const updateAnswerAC = (newAnswer) => ({type: UPDATE_ANSWER, newAnswer});
const deleteAnswerAC = (answer_id) => ({type: DELETE_ANSWER, answer_id});

export const getExpertQuestion = (question_id) => async (dispatch) => {
    const response = await expertQuestionAPI.getQuestion(question_id);
    dispatch(setQuestionAC(response.data));
}

export const editQuestion = (data, question_id) => async (dispatch) => {
    dispatch(startSubmit('questionForm'));
    const response = await expertQuestionAPI.updateQuestion(data, question_id);
    dispatch(setQuestionAC(response.data));
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
    const response = await expertAnswersAPI.addAnswer(data);
    dispatch(addAnswerAC(response.data));
}

export const updateAnswer = (data) => async (dispatch) => {
    const response = await expertAnswersAPI.updateAnswer(data);
    dispatch(updateAnswerAC(response.data));
}

export const deleteAnswer = (answer_id) => async (dispatch) => {
    await expertAnswersAPI.deleteAnswer(answer_id);
    dispatch(deleteAnswerAC(answer_id));
}

export default expertQuestionEditReducer;