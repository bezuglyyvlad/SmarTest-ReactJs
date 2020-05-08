import {expertTestsAPI} from "../api/api";
import {errorInArrayOfString} from "../utils/utils";

const SET_TESTS = 'expertTests/SET_TESTS';

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
        default:
            return state;
    }
}

const setTestsAC = (tests) => ({type: SET_TESTS, tests: tests});

export const getExpertTests = (category_id) => async (dispatch) => {
    const response = await expertTestsAPI.getTests(category_id);
    dispatch(setTestsAC(response.data));
}

export const addTest = (data) => async (dispatch) => {
    try {
        await expertTestsAPI.addTest(data);
        await dispatch(getExpertTests(data.category_id));
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
        await expertTestsAPI.updateTest(data);
        await dispatch(getExpertTests(data.category_id));
    } catch (e) {
        if (e.response && e.response.status === 422 && e.response.data) {
            return errorInArrayOfString(e.response.data);
        } else {
            await Promise.reject(e);
        }
    }
}

export const deleteTest = (subcategory_id, category_id) => async (dispatch) => {
    await expertTestsAPI.deleteTest(subcategory_id);
    await dispatch(getExpertTests(category_id));
}

export default expertTestsReducer;