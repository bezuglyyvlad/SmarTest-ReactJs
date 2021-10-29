import {adminPanelAPI} from "../api/api";
import {defaultThunkReject, errorInArrayOfString} from "../utils/utils";

const SET_CATEGORIES = 'adminPanel/SET_CATEGORIES';
const DELETE_CATEGORY = 'adminPanel/DELETE_CATEGORY';

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
        case DELETE_CATEGORY:
            return {
                ...state,
                categories: state.categories.filter(item => item.category_id !== action.category_id)
            }
        default:
            return state;
    }
}

const setCategoriesAC = (categories) => ({type: SET_CATEGORIES, categories});
const deleteCategoryAC = (category_id) => ({type: DELETE_CATEGORY, category_id});

export const getAdminTestCategories = () => async (dispatch) => {
    try {
        const response = await adminPanelAPI.getCategories();
        dispatch(setCategoriesAC(response.data.data));
    } catch (e) {
        await defaultThunkReject(e, dispatch);
    }
}

export const updateTestCategory = (category_id, name, userEmail) => async (dispatch) => {
    try {
        await adminPanelAPI.updateCategory(category_id, name, userEmail);
        await dispatch(getAdminTestCategories());
    } catch (e) {
        if (e.response && e.response.status === 422 && e.response.data) {
            return errorInArrayOfString(e.response.data);
        } else {
            await Promise.reject(e);
        }
    }
}

export const addTestCategory = (name, userEmail) => async (dispatch) => {
    try {
        await adminPanelAPI.addCategory(name, userEmail);
        await dispatch(getAdminTestCategories());
    } catch (e) {
        if (e.response && e.response.status === 422 && e.response.data) {
            return errorInArrayOfString(e.response.data);
        } else {
            await Promise.reject(e);
        }
    }
}

export const deleteTestCategory = (category_id) => async (dispatch) => {
    await adminPanelAPI.deleteCategory(category_id);
    await dispatch(deleteCategoryAC(category_id));
}

export default adminPanelReducer;