import { PureComponent } from "react";
import Error from "./Error";
import {withRouter} from "react-router";

class ErrorBoundary extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {hasError: {}};
    }

    errorExists(obj) {
        return !(Object.entries(obj).length === 0 && obj.constructor === Object);
    }

    static getDerivedStateFromError(error) {
        // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
        return {hasError: {status: 'Ууууупс', name: 'Щось пішло не так'}};
    }

    // componentDidCatch(error, errorInfo) {
    //     // Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
    //     logErrorToMyService(error, errorInfo);
    // }

    catchAllUnhandleErrors = (e) => {
        e.promise.catch(e => {
            e?.response && e.response?.data ? this.setState({hasError: e.response.data}) : this.setState({
                hasError: {
                    status: 'Ууууупс',
                    name: 'Щось пішло не так'
                }
            })
        })
    }

    componentDidMount() {
        window.addEventListener("unhandledrejection", this.catchAllUnhandleErrors)
        this.unlisten = this.props.history.listen((location, action) => {
            if (this.errorExists(this.state.hasError)) {
                this.setState({hasError: {}});
            }
        });
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandleErrors)
        this.unlisten();
    }

    render() {
        if (this.errorExists(this.state.hasError)) {
            // Можно отрендерить запасной UI произвольного вида
            return <Error error={this.state.hasError}/>;
        }

        return this.props.children;
    }
}

export default withRouter(ErrorBoundary);