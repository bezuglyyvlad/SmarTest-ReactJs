import { NavLink } from 'react-router-dom'
import React, { memo, forwardRef, useState } from 'react'
import {
  Box,
  Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  FormControlLabel,
  IconButton,
  makeStyles, Slide,
  TablePagination,
  Typography,
  useTheme,
  withWidth,
} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import { connect } from 'react-redux'
import { changePerPage } from '../../redux/appReducer'
import { imageAcceptTypes } from '../../utils/utils'
import Image from 'material-ui-image'
import queryString from 'query-string'
import { Pagination, PaginationItem, Skeleton } from '@material-ui/lab'
import { PhotoCamera } from '@material-ui/icons'
import DeleteIcon from '@material-ui/icons/Delete'
import ClearIcon from '@material-ui/icons/Clear'

const TablePaginationCreator = memo(({ pagination, changePerPage, changePage }) => {
  function setPerPage (event) {
    changePerPage(event.target.value)
  }

  return (
    <TablePagination
      labelRowsPerPage='На сторінку'
      backIconButtonText='Попередня сторінка'
      nextIconButtonText='Наступна сторінка'
      rowsPerPageOptions={[5, 10, 15, 20]}
      component='div'
      count={pagination.total}
      rowsPerPage={pagination.per_page}
      page={pagination.current_page - 1}
      onPageChange={changePage}
      onRowsPerPageChange={setPerPage}
    />
  )
})

export const TablePaginationCreatorWithConnect = connect(null, { changePerPage })(TablePaginationCreator)


const useStylesPagination = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  ul: {
    justifyContent: 'center'
  }
}))

const PaginationCreator = memo(({ pagination, mainPath, linkPageName }) => {
  const classes = useStylesPagination()
  return (
    <Pagination classes={{ ul: classes.ul, root: classes.root }} count={pagination.last_page} color='primary'
                page={pagination.current_page} siblingCount={0} renderItem={item => (
      <PaginationItem
        component={NavLink}
        to={`${mainPath}${item.page === 1 ? '' : `${linkPageName}=${item.page}`}`}
        {...item}
      />
    )} />
  )
})

export const ListCreator = memo(({ pagination, dense, setDense, children, mainPath, linkPageName }) => {
  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            checked={dense}
            onChange={event => setDense(event.target.checked)}
            value='dense'
            color='primary'
          />
        }
        label='Зробити компактніше'
      />
      <Box align='center'>
        {children}
        {pagination && pagination.last_page > 1 &&
        <PaginationCreator pagination={pagination} mainPath={mainPath} linkPageName={linkPageName} />}
      </Box>
    </>
  )
})

const Transition = forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export const DialogCreator = memo(({ open, handleClose, title, text, confirmButton }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby='alert-dialog-slide-title'
      aria-describedby='alert-dialog-slide-description'
    >
      <DialogTitle id='alert-dialog-slide-title'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-slide-description'>
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Ні
        </Button>
        {confirmButton}
      </DialogActions>
    </Dialog>
  )
})

export function Alert (props) {
  // return <MuiAlert elevation={6} variant='filled' {...props} />
  return <MuiAlert elevation={6} variant='filled' {...props} />
}


const useStylesUpload = makeStyles(theme => ({
  uploadBox: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  input: {
    display: 'none'
  },
  uploadSubtitle: {
    display: 'flex',
    flexDirection: 'row'
  },
  clearButton: {
    margin: theme.spacing(0, 1),
  }
}))

export const UploadBox = memo(({ onUploadChange, image, setImage, visibleDelete, deleteAction }) => {
  const classes = useStylesUpload()
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (e) => {
    setOpen(false)
  }

  const deleteImage = () => {
    handleClose()
    deleteAction()
  }

  return (
    <Box className={classes.uploadBox}>
      <Box>
        <input accept={imageAcceptTypes} className={classes.input} id='image' type='file'
               onChange={onUploadChange} />
        <label htmlFor='image'>
          <IconButton color='primary' aria-label='upload image' component='span'>
            <PhotoCamera fontSize='large' />
          </IconButton>
        </label>
        {visibleDelete && <>
          <IconButton aria-label='delete' className={classes.margin}
                      onClick={handleClickOpen}>
            <DeleteIcon color='error' fontSize='large' />
          </IconButton>
          <DialogCreator open={open} handleClose={handleClose} title='Видалення зображення'
                         text='Ви дійсно хочете видалити зображення?' confirmButton={
            <Button onClick={deleteImage} color='primary'>
              Так
            </Button>} />
        </>
        }
      </Box>
      {image && <Box className={classes.uploadSubtitle}>
        <Typography variant='subtitle1'>
          {image.name}
        </Typography>
        <IconButton aria-label='delete' size='small' className={classes.clearButton} onClick={() => {
          setImage(null)
        }}>
          <ClearIcon fontSize='inherit' />
        </IconButton>
      </Box>}
    </Box>
  )
})


const useStylesImageBox = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(2, 0),
  }
}))

const ImageBox = memo(({ imageSrc, width, imageW, imageH }) => {
  const classes = useStylesImageBox()
  const theme = useTheme()

  if (!(imageW && imageH)) {
    const imageSize = queryString.parseUrl(imageSrc).query
    imageW = +imageSize.w
    imageH = +imageSize.h
  }

  return (
    <Box className={classes.root}>
      <Box style={{ width: imageW > (theme.breakpoints.values[width] || 320) ? '100%' : imageW }}>
        <Image color={theme.palette.background.default} animationDuration={2000}
               src={imageSrc}
               loading={<Skeleton animation='pulse' variant='rect' width={'inherit'}
                                  height={'inherit'} />}
               style={{ width: '100%' }} aspectRatio={imageW / imageH} />
      </Box>
    </Box>
  )
})

export default withWidth()(ImageBox)
