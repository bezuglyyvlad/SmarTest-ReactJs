import React, { memo } from 'react'
import { Avatar, Container, Grid, Link, makeStyles, Typography } from '@material-ui/core'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import { connect } from 'react-redux'
import SignUpForm from './SignUpForm/SignUpForm'
import { signUp } from '../../redux/userReducer'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { validationErrorHandlerFormik } from "../../utils/utils";
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

const SignUp = memo(({ signUp }) => {
  const classes = useStyles()

  const onSubmit = async (formikData, setSubmitting, setErrors, formIsMounted) => {
    setSubmitting(true)
    await signUp(formikData)
      .catch((e) => {
        formIsMounted.current && setSubmitting(false)
        const errors = validationErrorHandlerFormik(e)
        formIsMounted.current && setErrors(errors)
      })
  }

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Реєстрація
        </Typography>
        <SignUpForm onSubmit={onSubmit} />
        <Grid container justifyContent='flex-end'>
          <Grid item>
            <Link component={NavLink} to='/signin' variant='body2'>
              Вже є аккаунт? Увійти
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  )
})

export default compose(
  connect(null, { signUp }),
  withAuthRedirect)(SignUp)
