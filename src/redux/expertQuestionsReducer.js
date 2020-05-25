import {expertQuestionsAPI} from "../api/api";
import {startSubmit} from "redux-form";

const SET_QUESTIONS = 'expertQuestions/SET_QUESTIONS';

let initialState = {
    questions: null,
};

const expertQuestionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_QUESTIONS:
            return {
                ...state,
                questions: action.questions
            }
        default:
            return state;
    }
}

const setQuestionsAC = (questions) => ({type: SET_QUESTIONS, questions: questions});

export const getExpertQuestions = (subcategory_id) => async (dispatch) => {
    const response = await expertQuestionsAPI.getQuestions(subcategory_id);
    dispatch(setQuestionsAC(response.data));
}

export const deleteQuestion = (question_id, subcategory_id) => async (dispatch) => {
    await expertQuestionsAPI.deleteQuestion(question_id);
    await dispatch(getExpertQuestions(subcategory_id));
}

export const addQuestion = (data) => async (dispatch) => {
    dispatch(startSubmit('questionForm'));
    await expertQuestionsAPI.addQuestion(data);
}

export const importQuestions = (data, subcategory_id) => async (dispatch) => {
    await expertQuestionsAPI.importQuestions(data);
    await dispatch(getExpertQuestions(subcategory_id));
}

export default expertQuestionsReducer;