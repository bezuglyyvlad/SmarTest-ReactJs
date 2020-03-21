import React from "react";
import List from "@material-ui/core/List";
import CategoryIcon from '@material-ui/icons/Category';
import AssessmentIcon from '@material-ui/icons/Assessment';
import {withRouter} from "react-router-dom";
import MainListItem from "./MainListItem/MainListItem";
import {compose} from "redux";
import {connect} from "react-redux";
import {signOut} from "../../../../redux/userReducer";
import Divider from "@material-ui/core/Divider";
import {Tune} from "@material-ui/icons";
import {userSelectors} from "../../../../redux/selectors/userSelectors";
import {Box} from "@material-ui/core";

const MainList = React.memo(({toggleDrawer, location, role}) => {
    const listItemIsActive = (path) => {
        const currentPath = '/' + location.pathname.split('/')[1];
        return currentPath === path;
    };

    return (
        <List component="nav" aria-label="main-list"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}>
            <MainListItem link='/category' listItemIsActive={listItemIsActive} text='Категории'
                          icon={<CategoryIcon/>}/>
            <MainListItem link='/statistics' listItemIsActive={listItemIsActive} text='Статистика'
                          icon={<AssessmentIcon/>}/>
            {role.length !== 0 &&
            <Box>
                <Divider/>
                {role.map((value, key) => (
                    <MainListItem key={key} link={`/${value}Panel`} listItemIsActive={listItemIsActive}
                                  text={`${value.charAt(0).toUpperCase() + value.substr(1)} панель`}
                                  icon={<Tune/>}/>
                ))}
            </Box>
            }
        </List>)
})

const mapStateToProps = (state) => ({
    role: userSelectors.getRole(state),
})

export default compose(withRouter, connect(mapStateToProps, {signOut}))(MainList);