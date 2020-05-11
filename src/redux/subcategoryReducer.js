import {subcategoryAPI} from "../api/api";

const SET_SUBCATEGORY = 'subcategory/SET_SUBCATEGORY';

let initialState = {
    subcategory_id: null,
    name: null
};

const subcategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SUBCATEGORY:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}


const setSubcategory = ({subcategory_id, name}) => ({
    type: SET_SUBCATEGORY, payload:
        {subcategory_id, name}
});

export const getSubcategory = (subcategory_id) => async (dispatch) => {
    const response = await subcategoryAPI.getData(subcategory_id);
    dispatch(setSubcategory(response.data));
}

export default subcategoryReducer;