import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {userSelectors} from "../redux/selectors/userSelectors";

let mapStateToPropsForRedirect = (state) => ({
    role: userSelectors.getRole(state),
});

export const withNotAdminRedirect = (Component) => {
    const RedirectComponent = props => {
        if (!props.role.includes('admin')) return <Redirect to='/'/>

        return <Component {...props}/>
    };

    return connect(mapStateToPropsForRedirect)(RedirectComponent);

}