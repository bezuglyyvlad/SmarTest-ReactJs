import { memo, useState, useEffect } from 'react'
import { Box, Container, makeStyles, Typography } from '@material-ui/core'
import { compose } from 'redux'
import { withUnAuthRedirect } from '../../hoc/withUnAuthRedirect'
import { connect } from 'react-redux'
import { withNotAdminRedirect } from '../../hoc/withNotAdminRedirect'
import { getAdminTestCategories } from '../../redux/adminPanelReducer'
import { Preloader } from '../common/Preloader'
import AdminTable from './AdminPanelTable/AdminPanelTable'
import { useSnackbar } from 'notistack'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
  },
  table: {
    marginTop: theme.spacing(2),
  }
}))

const AdminPanel = memo(({ getAdminTestCategories }) => {
  const classes = useStyles()
  const [showPreloader, setShowPreloader] = useState(true)
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    let mounted = true; // exclude memory leak
    (async () => {
      setShowPreloader(true)
      await getAdminTestCategories()
      mounted && setShowPreloader(false)
    })()
    return () => mounted = false
  }, [getAdminTestCategories])

  if (showPreloader) {
    return <Preloader />
  }

  function showError (array) {
    array.forEach(item => {
      enqueueSnackbar(item, { variant: 'error' })
    })
  }

  return (
    <Container component='main' maxWidth='lg' className={classes.root}>
      <Typography component='h1' variant='h5' align='center'>
        Admin панель
      </Typography>
      <Box className={classes.table}>
        <AdminTable showError={showError} />
      </Box>
    </Container>
  )
})

export default compose(withUnAuthRedirect, withNotAdminRedirect, connect(null, {
  getAdminTestCategories,
}))(AdminPanel)
