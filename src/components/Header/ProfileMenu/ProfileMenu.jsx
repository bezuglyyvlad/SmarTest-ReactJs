import React, { memo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { getAvatarName } from '../../../utils/utils'
import { Avatar, IconButton, Menu, MenuItem } from '@material-ui/core'

const ProfileMenu = memo(({ signOut, name }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const [disableSignOut, setDisableSignOut] = useState(false)

  const handleCloseSignOut = () => {
    handleClose()
    setDisableSignOut(true)
    signOut()
  }

  return (
    <div>
      <IconButton edge='end'
                  color='inherit' aria-controls='profile-menu' aria-haspopup='true'
                  onClick={handleClick}><Avatar>{getAvatarName(name)}</Avatar></IconButton>
      <Menu
        id='profile-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem component={NavLink} to='/profile' onClick={handleClose}>Профіль</MenuItem>
        <MenuItem onClick={handleCloseSignOut} disabled={disableSignOut}>Вийти</MenuItem>
      </Menu>
    </div>
  )
})

export default ProfileMenu
