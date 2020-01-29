import * as React from "react";
import {connect} from "react-redux";
import {setError} from "../../redux/errorReducer";
import Error from "./Error";

class ErrorBoundary extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(error) {
        // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
        return {hasError: true};
    }

    // componentDidCatch(error, errorInfo) {
    //     // Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
    //     logErrorToMyService(error, errorInfo);
    // }

    catchAllUnhandleErrors = (e) => {
        e.promise.catch(e => {
            this.props.setError(e.response.data);
        })
    }

    componentDidMount() {
        window.addEventListener("unhandledrejection", this.catchAllUnhandleErrors)
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandleErrors)
    }

    render() {
        if (Object.entries(this.props.error).length !== 0) {
            return <Error error={this.props.error}/>;
        }
        if (this.state.hasError) {
            // Можно отрендерить запасной UI произвольного вида
            console.log('Error');
            return <h1>Что-то пошло не так.</h1>;
        }

        return this.props.children;
    }
}

const mapStateToProps = (state) => ({
    error: state.error.error,
});

export default connect(mapStateToProps, {setError})(ErrorBoundary);