import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import {Switch} from "react-router";
import Box from "@material-ui/core/Box";
import {connect} from "react-redux";
import {compose} from "redux";
import {changeTheme, initializeApp} from "./redux/appReducer";
import {Preloader} from "./components/common/Preloader";
import {withSuspense} from "./hoc/withSuspense";
import Header from "./components/Header/Header";
import {appSelectors} from "./redux/selectors/appSelectors";
import ErrorBoundary from "./components/Error/ErrorBoundary";
import {MuiThemeProvider} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import {getThemeFromLS} from "./utils/utils";
import {getTheme} from "./utils/theme";


const SignIn = React.lazy(() => import("./components/SignIn/SignIn"));
const SignUp = React.lazy(() => import("./components/SignUp/SignUp"));
const Profile = React.lazy(() => import("./components/Profile/Profile"));
const Categories = React.lazy(() => import("./components/Categories/Categories"));
const Statistics = React.lazy(() => import("./components/Statistics/Statistics"));
const MainPage = React.lazy(() => import("./components/MainPage/MainPage"));
const Subcategories = React.lazy(() => import("./components/Subcategories/Subcategories"));
const Test = React.lazy(() => import("./components/Test/Test"));
const TestResult = React.lazy(() => import("./components/TestResult/TestResult"));

const App = React.memo(({initializeApp, initialized, theme, changeTheme}) => {
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
                            <Route path='/expertPanel' render={() => (<>EXPERT PANEL</>)}/>
                            <Route path='/adminPanel' render={() => (<>ADMIN PANEL</>)}/>
                            <Route path='/' render={withSuspense(MainPage)}/>
                        </Switch>
                    </Box>
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
    connect(mapStateToProps, {initializeApp, changeTheme}))(App);
