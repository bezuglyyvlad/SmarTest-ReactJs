import {NavLink} from "react-router-dom";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import FolderIcon from "@mui/icons-material/Folder";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";

const ExpertPanelTestCategoriesListItem = ({value}) => {
    return (
        <ListItem button component={NavLink} to={'/expertPanel/' + value.test_category_id}>
            <ListItemAvatar>
                <Avatar>
                    <FolderIcon/>
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={value.name}
            />
        </ListItem>
    )
}

export default ExpertPanelTestCategoriesListItem;