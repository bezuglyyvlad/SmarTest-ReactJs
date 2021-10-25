import {NavLink} from "react-router-dom";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import FolderIcon from "@mui/icons-material/Folder";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";

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