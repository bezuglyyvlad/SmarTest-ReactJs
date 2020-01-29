import {NavLink} from "react-router-dom";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import React from "react";
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

const SubcategoriesListItem = ({value, number}) => {
    return (
        <ListItem button component={NavLink} to='/test'>
            <ListItemAvatar>
                <Avatar>
                    <SubdirectoryArrowRightIcon/>
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`Тест №${number + 1} - ${value.name}`} secondary={value.time + ' minute'}/>
        </ListItem>
    )
}

export default SubcategoriesListItem;