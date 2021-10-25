import {NavLink} from "react-router-dom";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import { memo } from "react";

const MainListItem = memo(({link, listItemIsActive, text, icon, ...props}) => {
    return <ListItem button component={NavLink} to={link} selected={listItemIsActive(link)}>
        <ListItemIcon>
            {icon}
        </ListItemIcon>
        <ListItemText primary={text}/>
        {props.children}
    </ListItem>
})

export default MainListItem;