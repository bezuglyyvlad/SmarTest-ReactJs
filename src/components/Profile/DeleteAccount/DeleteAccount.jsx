import { memo, useState } from 'react'
import { DialogCreator } from '../../common/UIElements'
import { Button, Link } from '@material-ui/core'

const DeleteAccount = memo(({ deleteUser, userId }) => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (e) => {
    setOpen(false)
  }

  const deleteAccount = () => {
    handleClose()
    deleteUser(userId)
  }

  return (
    <>
      <Link component='button' variant='body2' color='secondary' onClick={handleClickOpen}>
        Видалити акаунт
      </Link>
      <DialogCreator open={open} handleClose={handleClose} title='Видалення акаунта'
                     text='Ви дійсно хочете видалити акаунт?' confirmButton={
        <Button onClick={deleteAccount} color='primary'>
          Так
        </Button>} />
    </>
  )
})

export default DeleteAccount
