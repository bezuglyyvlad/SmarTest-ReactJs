import {reducer as formReducer} from 'redux-form'
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import userReducer from "./userReducer";
import appReducer from "./appReducer";
import categoriesReducer from "./categoriesReducer";
import subcategoriesReducer from "./subcategoriesReducer";
import categoryReducer from "./categoryReducer";
import errorReducer from "./errorReducer";

let reducers = combineReducers({
    form: formReducer,
    user: userReducer,
    app: appReducer,
    categories: categoriesReducer,
    subcategories: subcategoriesReducer,
    category: categoryReducer,
    error: errorReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;