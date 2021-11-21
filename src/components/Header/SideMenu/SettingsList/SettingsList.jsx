import { memo } from 'react'
import { appSelectors } from '../../../../redux/selectors/appSelectors'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { changeTheme } from '../../../../redux/appReducer'
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction, ListItemText,
  ListSubheader,
  makeStyles, Switch
} from '@material-ui/core'
import Brightness4Icon from '@material-ui/icons/Brightness4'

const useStyles = makeStyles(theme => ({
  root: {
    width: 280,
    maxWidth: 280,
  },
}))

const SettingsList = memo(({ theme, changeTheme, toggleDrawer }) => {
  const classes = useStyles()
  const changeDarkMode = (e) => {
    e.target.checked ? changeTheme('dark') : changeTheme('light')
  }

  return (
    <List component='nav'
          aria-label='settings-list'
          style={{ marginTop: 'auto' }}
          className={classes.root}
      // onClick={toggleDrawer(false)}
      // onKeyDown={toggleDrawer(false)}
    >
      <Divider />
      <ListSubheader>Налаштування</ListSubheader>
      <ListItem>
        <ListItemIcon>
          <Brightness4Icon />
        </ListItemIcon>
        <ListItemText primary='Нічний режим' />
        <ListItemSecondaryAction>
          <Switch
            edge='end'
            onChange={changeDarkMode}
            checked={theme === 'dark'}
            color='primary'
          />
        </ListItemSecondaryAction>
      </ListItem>
    </List>)
})

const mapStateToProps = (state) => ({
  theme: appSelectors.getTheme(state),
})

export default compose(connect(mapStateToProps, { changeTheme }))(SettingsList)
