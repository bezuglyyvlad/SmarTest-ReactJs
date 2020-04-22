import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Switch from "@material-ui/core/Switch";
import Brightness4Icon from '@material-ui/icons/Brightness4';
import {appSelectors} from "../../../../redux/selectors/appSelectors";
import {compose} from "redux";
import {connect} from "react-redux";
import {changeTheme, clearTheme} from "../../../../redux/appReducer";
import Divider from "@material-ui/core/Divider";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        width: 280,
        maxWidth: 280,
        backgroundColor: theme.palette.background.paper,
    },
}));

const SettingsList = React.memo(({theme, changeTheme, clearTheme, toggleDrawer}) => {
    const classes = useStyles();
    const changeDarkMode = (e) => {
        e.target.checked ? changeTheme('dark') : clearTheme()
    }

    return (
        <List component="nav" aria-label="settings-list" style={{marginTop: 'auto'}} className={classes.root}
            // onClick={toggleDrawer(false)}
            // onKeyDown={toggleDrawer(false)}
        >
            <Divider/>
            <ListSubheader>Налаштування</ListSubheader>
            <ListItem>
                <ListItemIcon>
                    <Brightness4Icon/>
                </ListItemIcon>
                <ListItemText primary="Нічний режим"/>
                <ListItemSecondaryAction>
                    <Switch
                        edge="end"
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

export default compose(connect(mapStateToProps, {changeTheme, clearTheme}))(SettingsList);