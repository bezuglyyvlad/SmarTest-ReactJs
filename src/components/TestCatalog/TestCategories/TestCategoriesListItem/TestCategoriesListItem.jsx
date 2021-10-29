import {NavLink} from "react-router-dom";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";

const TestCategoriesListItem = ({value, icon}) => {
    return (
        <ListItem button component={NavLink} to={'/testCatalog/' + value.id}>
            <ListItemAvatar>
                <Avatar>
                    {icon}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={value.title}
            />
        </ListItem>
    )
}

export default TestCategoriesListItem;