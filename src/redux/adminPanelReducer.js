import {adminPanelAPI} from "../api/api";

const SET_CATEGORIES = 'adminPanel/SET_CATEGORIES';

let initialState = {
    categories: null,
};

const adminPanelReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CATEGORIES:
            return {
                ...state,
                categories: action.categories
            }
        default:
            return state;
    }
}

const setCategoriesAC = (categories) => ({type: SET_CATEGORIES, categories: categories});

const errorInArrayOfString = array => {
    return array.map(i => {
        return i.message
    });
}

export const getAdminCategories = () => async (dispatch) => {
    const response = await adminPanelAPI.getCategories();
    dispatch(setCategoriesAC(response.data));
}

export const updateCategory = (category_id, name, userEmail) => async (dispatch) => {
    try {
        await adminPanelAPI.updateCategory(category_id, name, userEmail);
        await dispatch(getAdminCategories());
    } catch (e) {
        if (e.response && e.response.status === 422 && e.response.data) {
            return errorInArrayOfString(e.response.data);
        } else {
            await Promise.reject(e);
        }
    }
}

export const addCategory = (name, userEmail) => async (dispatch) => {
    try {
        await adminPanelAPI.addCategory(name, userEmail);
        await dispatch(getAdminCategories());
    } catch (e) {
        if (e.response && e.response.status === 422 && e.response.data) {
            return errorInArrayOfString(e.response.data);
        } else {
            await Promise.reject(e);
        }
    }
}

export const deleteCategory = (category_id) => async (dispatch) => {
    await adminPanelAPI.deleteCategory(category_id);
    await dispatch(getAdminCategories());
}

export default adminPanelReducer;