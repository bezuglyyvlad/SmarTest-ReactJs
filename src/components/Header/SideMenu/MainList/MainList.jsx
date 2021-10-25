import {memo} from "react";
import List from "@mui/material/List";
import CategoryIcon from '@mui/icons-material/Category';
import AssessmentIcon from '@mui/icons-material/Assessment';
import {withRouter} from "react-router-dom";
import MainListItem from "./MainListItem/MainListItem";
import {compose} from "redux";
import {connect} from "react-redux";
import {signOut} from "../../../../redux/userReducer";
import Divider from "@mui/material/Divider";
import {Tune} from "@mui/icons-material";
import {userSelectors} from "../../../../redux/selectors/userSelectors";

const MainList = memo(({toggleDrawer, location, roles}) => {
    const listItemIsActive = (path) => {
        const currentPath = '/' + location.pathname.split('/')[1];
        return currentPath === path;
    };

    return (
        <List component="nav" aria-label="main-list"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
        >
            <MainListItem link='/testCatalog' listItemIsActive={listItemIsActive} text='Каталог тестів'
                          icon={<CategoryIcon/>}/>
            <MainListItem link='/statistics' listItemIsActive={listItemIsActive} text='Статистика'
                          icon={<AssessmentIcon/>}/>
            {roles.length !== 0 &&
            <>
                <Divider/>
                {roles.map((value, key) => (
                    <MainListItem key={key} link={`/${value}Panel`} listItemIsActive={listItemIsActive}
                                  text={`${value.charAt(0).toUpperCase() + value.substr(1)} панель`}
                                  icon={<Tune/>}/>
                ))}
            </>
            }
        </List>)
})

const mapStateToProps = (state) => ({
    roles: userSelectors.getRoles(state),
})

export default compose(withRouter, connect(mapStateToProps, {signOut}))(MainList);