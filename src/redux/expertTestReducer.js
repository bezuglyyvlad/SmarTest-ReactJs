import {expertTestAPI} from "../api/api";

const SET_EXPERT_TEST = 'expertTest/SET_EXPERT_TEST';

let initialState = {
    expert_test_id: null,
    name: null
};

const expertTestReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EXPERT_TEST:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}


const setExpertTest = ({expert_test_id, name}) => ({
    type: SET_EXPERT_TEST, payload:
        {expert_test_id, name}
});

export const getExpertTest = (expert_test_id) => async (dispatch) => {
    const response = await expertTestAPI.getData(expert_test_id);
    dispatch(setExpertTest(response.data));
}

export default expertTestReducer;