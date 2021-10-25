import {reducer as formReducer} from 'redux-form'
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import userReducer from "./userReducer";
import appReducer from "./appReducer";
import testCategoriesReducer from "./testCategoriesReducer";
import testReducer from "./testReducer";
import testResultReducer from "./testResultReducer";
import statisticsReducer from "./statisticsReducer";
import adminPanelReducer from "./adminPanelReducer";
import expertPanelTestCategoriesReducer from "./expertPanelTestCategoriesReducer";
import expertPanelTestsReducer from "./expertPanelTestsReducer";
import expertTestReducer from "./expertTestReducer";
import expertPanelQuestionsReducer from "./expertPanelQuestionsReducer";
import expertPanelQuestionEditReducer from "./expertPanelQuestionEditReducer";
import expertPanelTestStatisticsReducer from "./expertPanelTestStatisticsReducer";
import expertTestsReducer from "./expertTestsReducer";
import testCategoryReducer from "./testCategoryReducer";

let reducers = combineReducers({
    form: formReducer,
    user: userReducer,
    app: appReducer,
    testCategories: testCategoriesReducer,
    expertTests: expertTestsReducer,
    testCategory: testCategoryReducer,
    expertTest: expertTestReducer,
    test: testReducer,
    testResult: testResultReducer,
    statistics: statisticsReducer,
    adminPanel: adminPanelReducer,
    expertPanelTests: expertPanelTestsReducer,
    expertPanelCategories: expertPanelTestCategoriesReducer,
    expertPanelTestStatistics: expertPanelTestStatisticsReducer,
    expertPanelQuestions: expertPanelQuestionsReducer,
    expertPanelQuestionEdit: expertPanelQuestionEditReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware))); //for development

// const store = createStore(reducers, applyMiddleware(thunkMiddleware)); // for production

export default store;