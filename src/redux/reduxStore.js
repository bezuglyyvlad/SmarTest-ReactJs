import {reducer as formReducer} from 'redux-form'
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import userReducer from "./userReducer";
import appReducer from "./appReducer";
import categoriesReducer from "./categoriesReducer";
import subcategoriesReducer from "./subcategoriesReducer";
import categoryReducer from "./categoryReducer";
import testReducer from "./testReducer";
import testResultReducer from "./testResultReducer";
import statisticsReducer from "./statisticsReducer";

let reducers = combineReducers({
    form: formReducer,
    user: userReducer,
    app: appReducer,
    categories: categoriesReducer,
    subcategories: subcategoriesReducer,
    category: categoryReducer,
    test: testReducer,
    testResult: testResultReducer,
    statistics: statisticsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware))); //for development

// const store = createStore(reducers, applyMiddleware(thunkMiddleware)); // for production

export default store;