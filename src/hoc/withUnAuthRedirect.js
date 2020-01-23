import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {getIsAuth} from "../redux/selectors/userSelectors";

let mapStateToPropsForRedirect = (state) => ({
    isAuth: getIsAuth(state),
});

export const withUnAuthRedirect = (Component) => {

    const RedirectComponent = props => {
        if (!props.isAuth) return <Redirect to='/signin'/>

        return <Component {...props}/>
    };

    return connect(mapStateToPropsForRedirect)(RedirectComponent);

}