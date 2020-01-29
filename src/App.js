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


const SignIn = React.lazy(() => import("./components/SignIn/SignIn"));
const SignUp = React.lazy(() => import("./components/SignUp/SignUp"));
const Profile = React.lazy(() => import("./components/Profile/Profile"));
const Categories = React.lazy(() => import("./components/Categories/Categories"));
const Statistics = React.lazy(() => import("./components/Statistics/Statistics"));
const MainPage = React.lazy(() => import("./components/MainPage/MainPage"));
const Subcategories = React.lazy(() => import("./components/Subcategories/Subcategories"));

const App = ({initializeApp, initialized}) => {
    useEffect(() => {
        initializeApp();
    }, [initializeApp]);

    if (!initialized) {
        return <Preloader/>;
    }

    return (
        <BrowserRouter>
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
        </BrowserRouter>
    );
};

const mapStateToProps = (state) => ({
    initialized: appSelectors.getInitialized(state),
});

export default compose(
    connect(mapStateToProps, {initializeApp}))(App);