import {expertTestsAPI} from "../api/api";
import {changeObjectInArray, errorInArrayOfString} from "../utils/utils";

const SET_TESTS = 'expertPanelTests/SET_TESTS';
const ADD_TEST = 'expertPanelTests/ADD_TEST';
const UPDATE_TEST = 'expertPanelTests/UPDATE_TEST';
const DELETE_TEST = 'expertPanelTests/DELETE_TEST';

let initialState = {
    tests: null,
};

const expertPanelTestsReducer = (state = initialState, action) => {
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
                tests: changeObjectInArray(state.tests, action.newTest.expert_test_id, 'expert_test_id', action.newTest)
            }
        case DELETE_TEST:
            return {
                ...state,
                tests: state.tests.filter(item => item.expert_test_id !== action.expert_test_id)
            }
        default:
            return state;
    }
}

const setTestsAC = (tests) => ({type: SET_TESTS, tests});
const addTestAC = (newTest) => ({type: ADD_TEST, newTest});
const updateTestAC = (newTest) => ({type: UPDATE_TEST, newTest});
const deleteTestAC = (expert_test_id) => ({type: DELETE_TEST, expert_test_id});

export const getExpertPanelTests = (test_category_id) => async (dispatch) => {
    const response = await expertTestsAPI.getTests(test_category_id);
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

export default expertPanelTestsReducer;