import { NavLink } from 'react-router-dom'
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'

const TestCategoriesListItem = ({ value, icon }) => {
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

export default TestCategoriesListItem
