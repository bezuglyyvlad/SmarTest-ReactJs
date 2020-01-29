import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {userSelectors} from "../redux/selectors/userSelectors";

let mapStateToPropsForRedirect = (state) => ({
    isAuth: userSelectors.getIsAuth(state),
});

export const withAuthRedirect = (Component) => {

    const RedirectComponent = props => {
        if (props.isAuth) return <Redirect to='/'/>

        return <Component {...props}/>
    };

    return connect(mapStateToPropsForRedirect)(RedirectComponent);

}