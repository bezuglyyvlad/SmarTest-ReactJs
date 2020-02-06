import {NavLink} from "react-router-dom";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import React from "react";

const MainListItem = React.memo(({link, listItemIsActive, text, icon, ...props}) => {
    return <ListItem button component={NavLink} to={link} selected={listItemIsActive(link)}>
        <ListItemIcon>
            {icon}
        </ListItemIcon>
        <ListItemText primary={text}/>
        {props.children}
    </ListItem>
})

export default MainListItem;