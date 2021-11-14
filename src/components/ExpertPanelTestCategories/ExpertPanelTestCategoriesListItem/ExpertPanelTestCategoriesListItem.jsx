import { NavLink } from 'react-router-dom'
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import FolderIcon from '@material-ui/icons/Folder'

const ExpertPanelTestCategoriesListItem = ({ value }) => {
  return (
    <ListItem button component={NavLink} to={'/expertPanel/' + value.id}>
      <ListItemAvatar>
        <Avatar>
          <FolderIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={value.title}
      />
    </ListItem>
  )
}

export default ExpertPanelTestCategoriesListItem
