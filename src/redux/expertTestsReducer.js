import {expertTestsAPI} from "../api/api";
import {changeObjectInArray, errorInArrayOfString} from "../utils/utils";

const SET_TESTS = 'expertTests/SET_TESTS';
const ADD_TEST = 'expertTests/ADD_TEST';
const UPDATE_TEST = 'expertTests/UPDATE_TEST';
const DELETE_TEST = 'expertTests/DELETE_TEST';

let initialState = {
    tests: null,
};

const expertTestsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TESTS:
            return {
                ...state,
                tests: action.tests
            }
        case ADD_TEST:
            return {
                ...state,
                tests: [...state.tests, action.newTest]
            }
        case UPDATE_TEST:
            return {
                ...state,
                tests: changeObjectInArray(state.tests, action.newTest.subcategory_id, 'subcategory_id', action.newTest)
            }
        case DELETE_TEST:
            return {
                ...state,
                tests: state.tests.filter(item => item.subcategory_id !== action.subcategory_id)
            }
        default:
            return state;
    }
}

const setTestsAC = (tests) => ({type: SET_TESTS, tests});
const addTestAC = (newTest) => ({type: ADD_TEST, newTest});
const updateTestAC = (newTest) => ({type: UPDATE_TEST, newTest});
const deleteTestAC = (subcategory_id) => ({type: DELETE_TEST, subcategory_id});

export const getExpertTests = (category_id) => async (dispatch) => {
    const response = await expertTestsAPI.getTests(category_id);
    dispatch(setTestsAC(response.data));
}

export const addTest = (data) => async (dispatch) => {
    try {
        const response = await expertTestsAPI.addTest(data);
        dispatch(addTestAC(response.data));
    } catch (e) {
        if (e.response && e.response.status === 422 && e.response.data) {
            return errorInArrayOfString(e.response.data);
        } else {
            await Promise.reject(e);
        }
    }
}

export const updateTest = (data) => async (dispatch) => {
    try {
        const response = await expertTestsAPI.updateTest(data);
        dispatch(updateTestAC(response.data));
    } catch (e) {
        if (e.response && e.response.status === 422 && e.response.data) {
            return errorInArrayOfString(e.response.data);
        } else {
            await Promise.reject(e);
        }
    }
}

export const deleteTest = (subcategory_id) => async (dispatch) => {
    await expertTestsAPI.deleteTest(subcategory_id);
    dispatch(deleteTestAC(subcategory_id));
}

export default expertTestsReducer;