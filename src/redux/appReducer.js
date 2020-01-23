import {getUserData} from "./userReducer";
import {getBearerTokenFromLS} from "../utils/utils";

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS';

let initialState = {
    initialized: false
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }

        default:
            return state;
    }
}


export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});

export const initializeApp = () => (dispatch) => {
    const token = getBearerTokenFromLS();
    if (!token) {
        return dispatch(initializedSuccess())
    }
    let promise = dispatch(getUserData(token));

    //dispatch(somethingelse());
    //dispatch(somethingelse());
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess());
        });
}


export default appReducer;