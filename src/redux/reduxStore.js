import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import userReducer from './userReducer'
import appReducer from './appReducer'
import testCategoriesReducer from './testCategoriesReducer'
import testReducer from './testReducer'
import testResultReducer from './testResultReducer'
import statisticsReducer from './statisticsReducer'
import testCategoriesCRUDReducer from './testCategoriesCRUDReducer'
import expertPanelTestCategoriesReducer from './expertPanelTestCategoriesReducer'
import expertPanelTestCatalogReducer from './expertPanelTestCatalogReducer'
import expertPanelQuestionsReducer from './expertPanelQuestionsReducer'
import expertPanelQuestionEditReducer from './expertPanelQuestionEditReducer'
import expertPanelTestStatisticsReducer from './expertPanelTestStatisticsReducer'
import expertTestsReducer from './expertTestsReducer'
import expertPanelBreadcrumbsReducer from './expertPanelBreadcrumbsReducer'

const reducers = combineReducers({
  user: userReducer,
  app: appReducer,
  testCategories: testCategoriesReducer,
  expertTests: expertTestsReducer,
  test: testReducer,
  testResult: testResultReducer,
  statistics: statisticsReducer,
  testCategoriesCRUD: testCategoriesCRUDReducer,
  expertPanelBreadcrumbs: expertPanelBreadcrumbsReducer,
  expertPanelTestCatalog: expertPanelTestCatalogReducer,
  expertPanelCategories: expertPanelTestCategoriesReducer,
  expertPanelTestStatistics: expertPanelTestStatisticsReducer,
  expertPanelQuestions: expertPanelQuestionsReducer,
  expertPanelQuestionEdit: expertPanelQuestionEditReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware))) // for development

// const store = createStore(reducers, applyMiddleware(thunkMiddleware)) // for production

export default store
