import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { userSelectors } from '../redux/selectors/userSelectors'

const mapStateToPropsForRedirect = (state) => ({
  roles: userSelectors.getRoles(state)
})

export const withNotAdminRedirect = (Component) => {
  const RedirectComponent = props => {
    if (!props.roles.includes('admin')) return <Redirect to='/' />

    return <Component {...props} />
  }

  return connect(mapStateToPropsForRedirect)(RedirectComponent)
}
