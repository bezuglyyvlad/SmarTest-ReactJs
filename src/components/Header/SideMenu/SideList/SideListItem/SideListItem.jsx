import {NavLink} from "react-router-dom";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import React from "react";

const SideListItem = React.memo(({link, listItemIsActive, text, ...props}) => {
    return <ListItem button component={NavLink} to={link} selected={listItemIsActive(link)}>
        <ListItemIcon>
            {props.children}
        </ListItemIcon>
        <ListItemText primary={text}/>
    </ListItem>
})

export default SideListItem;