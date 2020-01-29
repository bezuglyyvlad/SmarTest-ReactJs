const SET_ERROR = 'error/SET_ERROR';

let initialState = {
    error: {},
};

const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ERROR:
            return {
                ...state,
                error: action.error
            }
        default:
            return state;
    }
}


export const appError = (error) => ({type: SET_ERROR, error});

export const setError = (error) => (dispatch) => {
    dispatch(appError(error))
}

export const clearError = () => (dispatch) => {
    dispatch(appError({}))
}


export default errorReducer;