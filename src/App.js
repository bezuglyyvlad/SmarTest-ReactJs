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
import {getTheme} from "./utils/theme";
import {SnackbarProvider} from "notistack";


const SignIn = React.lazy(() => import("./components/SignIn/SignIn"));
const SignUp = React.lazy(() => import("./components/SignUp/SignUp"));
const Profile = React.lazy(() => import("./components/Profile/Profile"));
const Categories = React.lazy(() => import("./components/Categories/Categories"));
const Statistics = React.lazy(() => import("./components/Statistics/Statistics"));
const MainPage = React.lazy(() => import("./components/MainPage/MainPage"));
const Subcategories = React.lazy(() => import("./components/Subcategories/Subcategories"));
const Test = React.lazy(() => import("./components/Test/Test"));
const TestResult = React.lazy(() => import("./components/TestResult/TestResult"));
const AdminPanel = React.lazy(() => import("./components/AdminPanel/AdminPanel"));
const ExpertCategories = React.lazy(() => import("./components/ExpertCategories/ExpertCategories"));
const ExpertTests = React.lazy(() => import("./components/ExpertTests/ExpertTests"));
const ExpertQuestions = React.lazy(() => import("./components/ExpertQuestions/ExpertQuestions"));
const ExpertQuestionAdd = React.lazy(() => import("./components/ExpertQuestionAdd/ExpertQuestionAdd"));
const ExpertQuestionEdit = React.lazy(() => import("./components/ExpertQuestionEdit/ExpertQuestionEdit"));
const XmlDocumentation = React.lazy(() => import("./components/XmlDocumentation/XmlDocumentation"));

const App = React.memo(({initializeApp, initialized, theme}) => {
    useEffect(() => {
        initializeApp();
    }, [initializeApp]);

    const muiTheme = getTheme(theme);

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
                                <Route path='/category/:category_id' render={withSuspense(Subcategories)}/>
                                <Route path='/category' render={withSuspense(Categories)}/>
                                <Route path='/test/:test_id/result' render={withSuspense(TestResult)}/>
                                <Route path='/test/:test_id' render={withSuspense(Test)}/>
                                <Route path='/statistics' render={withSuspense(Statistics)}/>
                                <Route path='/documentation/xml' render={withSuspense(XmlDocumentation)}/>
                                <Route path='/expertPanel/:category_id/:subcategory_id/edit/:question_id'
                                       render={withSuspense(ExpertQuestionEdit)}/>
                                <Route path='/expertPanel/:category_id/:subcategory_id/add'
                                       render={withSuspense(ExpertQuestionAdd)}/>
                                <Route path='/expertPanel/:category_id/:subcategory_id'
                                       render={withSuspense(ExpertQuestions)}/>
                                <Route path='/expertPanel/:category_id' render={withSuspense(ExpertTests)}/>
                                <Route path='/expertPanel' render={withSuspense(ExpertCategories)}/>
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
    theme: appSelectors.getTheme(state),
});

export default compose(
    connect(mapStateToProps, {initializeApp}))(App);
