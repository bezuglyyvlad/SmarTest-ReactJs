import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { userSelectors } from '../redux/selectors/userSelectors'

const mapStateToPropsForRedirect = (state) => ({
  roles: userSelectors.getRoles(state)
})

export const withNotExpertRedirect = (Component) => {
  const RedirectComponent = props => {
    if (!props.roles.includes('expert')) return <Redirect to='/' />

    return <Component {...props} />
  }

  return connect(mapStateToPropsForRedirect)(RedirectComponent)
}
