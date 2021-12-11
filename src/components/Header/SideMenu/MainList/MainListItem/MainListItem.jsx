import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'

const MainListItem = memo(({ link, listItemIsActive, text, icon, ...props }) => {
  return <ListItem button component={NavLink} to={link} selected={listItemIsActive(link)}>
    <ListItemIcon>
      {icon}
    </ListItemIcon>
    <ListItemText primary={text} />
    {props.children}
  </ListItem>
})

export default MainListItem
