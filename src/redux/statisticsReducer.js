import {statisticsApi} from "../api/api";

const SET_RATING = 'statistics/SET_RATING';
const SET_TESTS = 'statistics/SET_TESTS';

let initialState = {
    ratingInfo: null,
    tests: null,
    pagination: null
};

const statisticsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_RATING:
            return {
                ...state,
                ratingInfo: action.ratingInfo
            }
        case SET_TESTS:
            return {
                ...state,
                tests: action.tests,
                pagination: action.pagination
            }
        default:
            return state;
    }
}

const setRatingAC = (ratingInfo) => ({type: SET_RATING, ratingInfo});
const setTestsAC = (tests, pagination) => ({type: SET_TESTS, tests, pagination});

export const getRating = () => async (dispatch) => {
    const response = await statisticsApi.getRating();
    dispatch(setRatingAC(response.data));
}

export const getTests = (page, perPage) => async (dispatch) => {
    const response = await statisticsApi.getTests(page, perPage);
    const {items, _meta} = response.data;
    dispatch(setTestsAC(items, _meta));
}

export default statisticsReducer;