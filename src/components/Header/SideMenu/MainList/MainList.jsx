import React, { memo } from 'react'
import { withRouter } from 'react-router-dom'
import MainListItem from './MainListItem/MainListItem'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { signOut } from '../../../../redux/userReducer'
import { userSelectors } from '../../../../redux/selectors/userSelectors'
import { Divider, List } from '@material-ui/core'
import CategoryIcon from '@material-ui/icons/Category'
import AssessmentIcon from '@material-ui/icons/Assessment'
import { Tune } from '@material-ui/icons'

const MainList = memo(({ toggleDrawer, location, roles }) => {
  const listItemIsActive = (path) => {
    const currentPath = '/' + location.pathname.split('/')[1]
    return currentPath === path
  }

  return (
    <List component='nav' aria-label='main-list'
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
    >
      <MainListItem link='/testCatalog' listItemIsActive={listItemIsActive} text='Каталог тестів'
                    icon={<CategoryIcon />} />
      <MainListItem link='/statistics' listItemIsActive={listItemIsActive} text='Статистика'
                    icon={<AssessmentIcon />} />
      {roles.length !== 0 &&
      <>
        <Divider />
        {roles.map((value, key) => (
          <MainListItem key={key} link={`/${value}Panel`} listItemIsActive={listItemIsActive}
                        text={`${value.charAt(0).toUpperCase() + value.substr(1)} панель`}
                        icon={<Tune />} />
        ))}
      </>
      }
    </List>)
})

const mapStateToProps = (state) => ({
  roles: userSelectors.getRoles(state),
})

export default compose(withRouter, connect(mapStateToProps, { signOut }))(MainList)
