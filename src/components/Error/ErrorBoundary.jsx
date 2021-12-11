import React, { PureComponent } from 'react'
import Error from './Error'
import { withRouter } from 'react-router'
import { isObjectEmpty } from "../../utils/utils";

class ErrorBoundary extends PureComponent {
  static defaultError;

  constructor (props) {
    super(props)
    this.state = { hasError: {} }
    this.defaultError = { status: 'Ууууупс', statusText: 'Щось пішло не так' }
  }

  errorExists (obj) {
    return !isObjectEmpty(obj)
  }

  static getDerivedStateFromError (error) {
    // error for fallback UI
    return { hasError: this.defaultError }
  }

  // componentDidCatch(error, errorInfo) {
  //     // save error to log service
  //     logErrorToMyService(error, errorInfo)
  // }

  catchAllUnhandleErrors = (e) => {
    e.promise.catch(e => {
      e?.response ? this.setState({ hasError: e.response }) : this.setState({
        hasError: this.defaultError
      })
    })
  }

  componentDidMount () {
    window.addEventListener('unhandledrejection', this.catchAllUnhandleErrors)
    this.unlisten = this.props.history.listen((location, action) => {
      if (this.errorExists(this.state.hasError)) {
        this.setState({ hasError: {} })
      }
    })
  }

  componentWillUnmount () {
    window.removeEventListener('unhandledrejection', this.catchAllUnhandleErrors)
    this.unlisten()
  }

  render () {
    if (this.errorExists(this.state.hasError)) {
      // render fallback UI
      return <Error error={this.state.hasError} />
    }

    return this.props.children
  }
}

export default withRouter(ErrorBoundary)
