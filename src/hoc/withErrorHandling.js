import React from "react";
import ErrorBoundary from "../components/Error/ErrorBoundary";

export const withErrorHandling = (Component) => {
    return (props) => {
        return <ErrorBoundary>
            <Component {...props} />
        </ErrorBoundary>
    };
}