import {reducer as formReducer} from 'redux-form'
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;