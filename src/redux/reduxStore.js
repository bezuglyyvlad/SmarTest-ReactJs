import { reducer as formReducer } from 'redux-form'
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import userReducer from "./userReducer";
import appReducer from "./appReducer";

let reducers = combineReducers({
    form: formReducer,
    user: userReducer,
    app: appReducer
});

const store = createStore(reducers,  applyMiddleware(thunkMiddleware));

export default store;