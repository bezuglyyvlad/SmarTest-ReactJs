import { useState } from 'react'
import { DialogCreator } from '../../../common/UIElements'
import { NavLink } from 'react-router-dom'
import { Avatar, Button, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer'

const ExpertTestsListItem = ({ value, startTest }) => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <ListItem button onClick={handleClickOpen}>
        <ListItemAvatar>
          <Avatar>
            <QuestionAnswerIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={value.title} />
      </ListItem>
      {
        !value.test ?
          <DialogCreator open={open} handleClose={handleClose} title='Старт тесту'
                         text={`Ви дійсно хочете розпочати тест '${value.title}'?`}
                         confirmButton={
                           <Button onClick={() => startTest(value.id)} color='primary'>
                             Так
                           </Button>} />
          : <DialogCreator open={open} handleClose={handleClose} title='Продовження тесту'
                           text={
                             `У вас вже розпочато тест '${value.title}' 
                                         (закінчиться ${(new Date(value.test.finish_date))
                               .toLocaleString()}). Продовжити?`
                           }
                           confirmButton={
                             <Button component={NavLink} to={`/test/${value.test.id}`} color='primary'>
                               Так
                             </Button>} />
      }
    </>
  )
}

export default ExpertTestsListItem
