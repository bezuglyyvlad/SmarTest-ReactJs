import {categoryAPI} from "../api/api";

const SET_CATEGORY = 'category/SET_CATEGORY';

let initialState = {
    category_id: null,
    name: null
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CATEGORY:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}


const setCategory = ({category_id, name}) => ({
    type: SET_CATEGORY, payload:
        {category_id, name}
});

export const getCategory = (category_id) => async (dispatch) => {
    const response = await categoryAPI.getData(category_id);
    dispatch(setCategory(response.data));
}

export default categoryReducer;