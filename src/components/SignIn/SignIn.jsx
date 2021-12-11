import React, { memo } from 'react'
import { Avatar, Container, Grid, Link, makeStyles, Typography } from '@material-ui/core'
import SignInForm from './SignInForm/SignInForm'
import { connect } from 'react-redux'
import { signIn } from '../../redux/userReducer'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { badRequestErrorHandler } from "../../utils/utils";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}))

const SignIn = memo(({ signIn }) => {

  const classes = useStyles()

  const onSubmit = async (formikData, setSubmitting, setStatus, formIsMounted) => {
    setSubmitting(true)
    await signIn(formikData)
      .catch((e) => {
        formIsMounted.current && setSubmitting(false)
        badRequestErrorHandler(e)
        formIsMounted.current && setStatus({ error: 'Неправильні дані користувача' })
      })
  }

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Вхід
        </Typography>
        <SignInForm onSubmit={onSubmit} />
        <Grid container justifyContent='flex-end'>
          <Grid item>
            <Link component={NavLink} to='/signup' variant='body2'>
              У вас немає облікового запису? Зареєструватися
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  )
})

export default compose(
  connect(null, { signIn }),
  withAuthRedirect
)(SignIn)
