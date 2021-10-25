import {memo} from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Switch from "@mui/material/Switch";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import {appSelectors} from "../../../../redux/selectors/appSelectors";
import {compose} from "redux";
import {connect} from "react-redux";
import {changeTheme, clearTheme} from "../../../../redux/appReducer";
import Divider from "@mui/material/Divider";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles(theme => ({
    root: {
        width: 280,
        maxWidth: 280,
    },
}));

const SettingsList = memo(({theme, changeTheme, clearTheme, toggleDrawer}) => {
    const classes = useStyles();
    const changeDarkMode = (e) => {
        e.target.checked ? changeTheme('dark') : clearTheme()
    }

    return (
        <List component="nav"
              aria-label="settings-list"
              style={{marginTop: 'auto'}}
              className={classes.root}
            // onClick={toggleDrawer(false)}
            // onKeyDown={toggleDrawer(false)}
        >
            <Divider/>
            <ListSubheader sx={{bgcolor: 'inherit'}}>Налаштування</ListSubheader>
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