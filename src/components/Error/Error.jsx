import React, { memo } from 'react'
import { CssBaseline, Grid, IconButton, makeStyles, Typography } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import ErrorIcon from '@material-ui/icons/Error'
import HomeIcon from '@material-ui/icons/Home'

const useStyles = makeStyles(theme => ({
  icon: {
    marginBottom: theme.spacing(1),
    fontSize: '200px',
  },
  button: {
    marginTop: theme.spacing(10),
  }
}))

const Error = memo(({ error }) => {
  const classes = useStyles()

  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='center'
      style={{ minHeight: '85vh' }}
    >
      <CssBaseline />
      <ErrorIcon color='primary' className={classes.icon} />
      <Typography variant='h3'>
        {error.status}
      </Typography>
      <Typography variant='h5'>
        {error.statusText}
      </Typography>
      <IconButton component={NavLink} to='/' color='primary' aria-label='Домой' className={classes.button}>
        <HomeIcon fontSize='large' />
      </IconButton>
    </Grid>
  )
})

export default Error
