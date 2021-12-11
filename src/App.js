import React, { lazy, memo, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Route } from 'react-router-dom'
import { Switch } from 'react-router'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { initializeApp } from './redux/appReducer'
import { Preloader } from './components/common/Preloader'
import { withSuspense } from './hoc/withSuspense'
import Header from './components/Header/Header'
import { appSelectors } from './redux/selectors/appSelectors'
import ErrorBoundary from './components/Error/ErrorBoundary'
import { SnackbarProvider } from 'notistack'
import { Box, CssBaseline, MuiThemeProvider } from '@material-ui/core'

const SignIn = lazy(() => import('./components/SignIn/SignIn'))
const SignUp = lazy(() => import('./components/SignUp/SignUp'))
const Profile = lazy(() => import('./components/Profile/Profile'))
const Statistics = lazy(() => import('./components/Statistics/Statistics'))
const MainPage = lazy(() => import('./components/MainPage/MainPage'))
const TestCatalog = lazy(() => import('./components/TestCatalog/TestCatalog'))
const Test = lazy(() => import('./components/Test/Test'))
const TestResult = lazy(() => import('./components/TestResult/TestResult'))
const AdminPanel = lazy(() => import('./components/AdminPanel/AdminPanel'))
const ExpertPanelTestCategories = lazy(() => import('./components/ExpertPanelTestCategories/ExpertPanelTestCategories'))
const ExpertPanelTests = lazy(() => import('./components/ExpertPanelTestCatalog/ExpertPanelTestCatalog'))
const ExpertPanelQuestions = lazy(() => import('./components/ExpertPanelQuestions/ExpertPanelQuestions'))
const ExpertPanelQuestionAdd = lazy(() => import('./components/ExpertPanelQuestionAdd/ExpertPanelQuestionAdd'))
const ExpertPanelQuestionEdit = lazy(() => import('./components/ExpertPanelQuestionEdit/ExpertPanelQuestionEdit'))
const XmlDocumentation = lazy(() => import('./components/XmlDocumentation/XmlDocumentation'))
const ExpertPanelTestStatistics = lazy(() => import('./components/ExpertPanelTestStatistics/ExpertPanelTestStatistics'))

const App = memo(({ initializeApp, initialized, muiTheme }) => {
  useEffect(() => {
    initializeApp()
  }, [initializeApp])

  if (!initialized) {
    return <MuiThemeProvider theme={muiTheme}><Preloader /></MuiThemeProvider>
  }

  return (
    <BrowserRouter>
      <MuiThemeProvider theme={muiTheme}>
        <ErrorBoundary>
          <SnackbarProvider
            maxSnack={3}
            preventDuplicate
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
          >
            <CssBaseline />
            <Header />
            <Box>
              <Switch>
                <Route
                  path='/signin'
                  render={withSuspense(SignIn)}
                />
                <Route
                  path='/signup'
                  render={withSuspense(SignUp)}
                />
                <Route
                  path='/profile'
                  render={withSuspense(Profile)}
                />
                <Route
                  path='/testCatalog/:test_category_id?'
                  render={withSuspense(TestCatalog)}
                />
                <Route
                  path='/test/:test_id/result' render={withSuspense(TestResult)}
                />
                <Route
                  path='/test/:test_id'
                  render={withSuspense(Test)}
                />
                <Route
                  path='/statistics'
                  render={withSuspense(Statistics)}
                />
                <Route
                  path='/documentation/xml'
                  render={withSuspense(XmlDocumentation)}
                />
                <Route
                  path='/expertPanel/:test_category_id/:expert_test_id/edit/:question_id'
                  render={withSuspense(ExpertPanelQuestionEdit)}
                />
                <Route
                  path='/expertPanel/:test_category_id/:expert_test_id/add'
                  render={withSuspense(ExpertPanelQuestionAdd)}
                />
                <Route
                  path='/expertPanel/:test_category_id/:expert_test_id/statistics'
                  render={withSuspense(ExpertPanelTestStatistics)}
                />
                <Route
                  path='/expertPanel/:test_category_id/:expert_test_id'
                  render={withSuspense(ExpertPanelQuestions)}
                />
                <Route
                  path='/expertPanel/:test_category_id'
                  render={withSuspense(ExpertPanelTests)}
                />
                <Route
                  path='/expertPanel'
                  render={withSuspense(ExpertPanelTestCategories)}
                />
                <Route
                  path='/adminPanel'
                  render={withSuspense(AdminPanel)}
                />
                <Route
                  path='/'
                  render={withSuspense(MainPage)}
                />
              </Switch>
            </Box>
          </SnackbarProvider>
        </ErrorBoundary>
      </MuiThemeProvider>
    </BrowserRouter>
  )
})

const mapStateToProps = (state) => ({
  initialized: appSelectors.getInitialized(state),
  muiTheme: appSelectors.getMuiTheme(state)
})

export default compose(
  connect(mapStateToProps, { initializeApp }))(App)
