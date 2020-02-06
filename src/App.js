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
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import {getThemeFromLS} from "./utils/utils";


const SignIn = React.lazy(() => import("./components/SignIn/SignIn"));
const SignUp = React.lazy(() => import("./components/SignUp/SignUp"));
const Profile = React.lazy(() => import("./components/Profile/Profile"));
const Categories = React.lazy(() => import("./components/Categories/Categories"));
const Statistics = React.lazy(() => import("./components/Statistics/Statistics"));
const MainPage = React.lazy(() => import("./components/MainPage/MainPage"));
const Subcategories = React.lazy(() => import("./components/Subcategories/Subcategories"));

const App = React.memo(({initializeApp, initialized, theme, changeTheme}) => {
    useEffect(() => {
        initializeApp();
    }, [initializeApp]);


    const lightTheme = createMuiTheme({
        palette: {
            type: 'light',
            primary: {main: '#1976d2'},
            secondary: {main: '#dc004e'},
        },
    });

    const darkTheme = createMuiTheme({
        palette: {
            type: 'dark',
            primary: {main: '#4791db'},
            secondary: {main: '#f48fb1'},
        },
    });

    changeTheme(getThemeFromLS());

    const muiTheme = theme === 'dark' ? darkTheme : lightTheme;

    if (!initialized) {
        return <MuiThemeProvider theme={muiTheme}><Preloader/></MuiThemeProvider>;
    }

    return (
        <BrowserRouter>
            <ErrorBoundary>
                <MuiThemeProvider theme={muiTheme}>
                    <CssBaseline/>
                    <Header/>
                    <Box>
                        <Switch>
                            <Route path='/signin' render={withSuspense(SignIn)}/>
                            <Route path='/signup' render={withSuspense(SignUp)}/>
                            <Route path='/profile' render={withSuspense(Profile)}/>
                            <Route path='/category/:category_id' render={withSuspense(Subcategories)}/>
                            <Route path='/category' render={withSuspense(Categories)}/>
                            <Route path='/test' render={() => <>Test</>}/>
                            <Route path='/statistics' render={withSuspense(Statistics)}/>
                            <Route path='/' render={withSuspense(MainPage)}/>
                        </Switch>
                    </Box>
                </MuiThemeProvider>
            </ErrorBoundary>
        </BrowserRouter>
    );
})

const mapStateToProps = (state) => ({
    initialized: appSelectors.getInitialized(state),
    theme: appSelectors.getTheme(state),
});

export default compose(
    connect(mapStateToProps, {initializeApp, changeTheme}))(App);
