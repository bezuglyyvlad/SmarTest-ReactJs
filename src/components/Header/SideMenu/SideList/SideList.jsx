import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import AddBoxIcon from '@material-ui/icons/AddBox';
import AssessmentIcon from '@material-ui/icons/Assessment';
import {withRouter} from "react-router-dom";
import SideListItem from "./SideListItem/SideListItem";

const useStyles = makeStyles(theme => ({
    root: {
        width: 250,
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

const SideList = React.memo(({toggleDrawer, location}) => {

    const classes = useStyles();

    const listItemIsActive = (path) => {
        const currentPath = '/' + location.pathname.split('/')[1];
        return currentPath === path;
    };

    return (
        <div
            className={classes.root}
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List component="nav" aria-label="side-list">
                <SideListItem link='/newtest' listItemIsActive={listItemIsActive} text='Новый тест'>
                    <AddBoxIcon/>
                </SideListItem>
                <SideListItem link='/statistics' listItemIsActive={listItemIsActive} text='Статистика'>
                    <AssessmentIcon/>
                </SideListItem>
            </List>
        </div>)
})

export default withRouter(SideList);