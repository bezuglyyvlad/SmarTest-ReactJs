import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import {Switch} from "react-router";
import Box from "@material-ui/core/Box";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/appReducer";
import {Preloader} from "./components/common/Preloader";
import {withSuspense} from "./hoc/withSuspense";
import Header from "./components/Header/Header";
import {appSelectors} from "./redux/selectors/appSelectors";
import ErrorBoundary from "./components/Error/ErrorBoundary";
import {MuiThemeProvider} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import {SnackbarProvider} from "notistack";


const SignIn = React.lazy(() => import("./components/SignIn/SignIn"));
const SignUp = React.lazy(() => import("./components/SignUp/SignUp"));
const Profile = React.lazy(() => import("./components/Profile/Profile"));
const Statistics = React.lazy(() => import("./components/Statistics/Statistics"));
const MainPage = React.lazy(() => import("./components/MainPage/MainPage"));
const TestCatalog = React.lazy(() => import("./components/TestCatalog/TestCatalog"));
const Test = React.lazy(() => import("./components/Test/Test"));
const TestResult = React.lazy(() => import("./components/TestResult/TestResult"));
const AdminPanel = React.lazy(() => import("./components/AdminPanel/AdminPanel"));
const ExpertPanelTestCategories = React.lazy(() => import("./components/ExpertPanelTestCategories/ExpertPanelTestCategories"));
const ExpertPanelTests = React.lazy(() => import("./components/ExpertPanelTests/ExpertPanelTests"));
const ExpertPanelQuestions = React.lazy(() => import("./components/ExpertPanelQuestions/ExpertPanelQuestions"));
const ExpertPanelQuestionAdd = React.lazy(() => import("./components/ExpertPanelQuestionAdd/ExpertPanelQuestionAdd"));
const ExpertPanelQuestionEdit = React.lazy(() => import("./components/ExpertPanelQuestionEdit/ExpertPanelQuestionEdit"));
const XmlDocumentation = React.lazy(() => import("./components/XmlDocumentation/XmlDocumentation"));
const ExpertPanelTestStatistics = React.lazy(() => import("./components/ExpertPanelTestStatistics/ExpertPanelTestStatistics"));

const App = React.memo(({initializeApp, initialized, muiTheme}) => {
    useEffect(() => {
        initializeApp();
    }, [initializeApp]);

    if (!initialized) {
        return <MuiThemeProvider theme={muiTheme}><Preloader/></MuiThemeProvider>;
    }

    return (
        <BrowserRouter>
            <MuiThemeProvider theme={muiTheme}>
                <ErrorBoundary>
                    <SnackbarProvider maxSnack={3} preventDuplicate anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}>
                        <CssBaseline/>
                        <Header/>
                        <Box>
                            <Switch>
                                <Route path='/signin' render={withSuspense(SignIn)}/>
                                <Route path='/signup' render={withSuspense(SignUp)}/>
                                <Route path='/profile' render={withSuspense(Profile)}/>
                                <Route path="/testCatalog/:test_category_id?" render={withSuspense(TestCatalog)}/>
                                <Route path='/test/:test_id/result' render={withSuspense(TestResult)}/>
                                <Route path='/test/:test_id' render={withSuspense(Test)}/>
                                <Route path='/statistics' render={withSuspense(Statistics)}/>
                                <Route path='/documentation/xml' render={withSuspense(XmlDocumentation)}/>
                                <Route path='/expertPanel/:category_id/:subcategory_id/edit/:question_id'
                                       render={withSuspense(ExpertPanelQuestionEdit)}/>
                                <Route path='/expertPanel/:category_id/:subcategory_id/add'
                                       render={withSuspense(ExpertPanelQuestionAdd)}/>
                                <Route path='/expertPanel/:category_id/:subcategory_id/statistics'
                                       render={withSuspense(ExpertPanelTestStatistics)}/>
                                <Route path='/expertPanel/:category_id/:subcategory_id'
                                       render={withSuspense(ExpertPanelQuestions)}/>
                                <Route path='/expertPanel/:category_id' render={withSuspense(ExpertPanelTests)}/>
                                <Route path='/expertPanel' render={withSuspense(ExpertPanelTestCategories)}/>
                                <Route path='/adminPanel' render={withSuspense(AdminPanel)}/>
                                <Route path='/' render={withSuspense(MainPage)}/>
                            </Switch>
                        </Box>
                    </SnackbarProvider>
                </ErrorBoundary>
            </MuiThemeProvider>
        </BrowserRouter>
    );
})

const mapStateToProps = (state) => ({
    initialized: appSelectors.getInitialized(state),
    muiTheme: appSelectors.getMuiTheme(state),
});

export default compose(
    connect(mapStateToProps, {initializeApp}))(App);
