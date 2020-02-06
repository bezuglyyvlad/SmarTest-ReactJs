import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import CategoryIcon from '@material-ui/icons/Category';
import AssessmentIcon from '@material-ui/icons/Assessment';
import {withRouter} from "react-router-dom";
import MainListItem from "./MainListItem/MainListItem";
import {compose} from "redux";
import {connect} from "react-redux";
import {signOut} from "../../../../redux/userReducer";

const useStyles = makeStyles(theme => ({
    root: {
        width: 300,
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

const MainList = React.memo(({toggleDrawer, location}) => {

    const classes = useStyles();

    const listItemIsActive = (path) => {
        const currentPath = '/' + location.pathname.split('/')[1];
        return currentPath === path;
    };

    return (
        <List component="nav" aria-label="main-list" className={classes.root}
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}>
            <MainListItem link='/category' listItemIsActive={listItemIsActive} text='Категории'
                          icon={<CategoryIcon/>}/>
            <MainListItem link='/statistics' listItemIsActive={listItemIsActive} text='Статистика'
                          icon={<AssessmentIcon/>}/>
        </List>)
})

export default compose(withRouter, connect(null, {signOut}))(MainList);