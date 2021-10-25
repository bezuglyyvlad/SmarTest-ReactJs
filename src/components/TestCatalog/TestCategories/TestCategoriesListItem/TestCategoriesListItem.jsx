import {NavLink} from "react-router-dom";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import FolderIcon from "@material-ui/icons/Folder";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import React from "react";

const TestCategoriesListItem = ({value}) => {
    return (
        <ListItem button component={NavLink} to={'/testCatalog/' + value.id}>
            <ListItemAvatar>
                <Avatar>
                    <FolderIcon/>
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={value.title}
            />
        </ListItem>
    )
}

export default TestCategoriesListItem;