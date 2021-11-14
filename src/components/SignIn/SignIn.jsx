import { memo } from 'react'
import { Avatar, Container, makeStyles, Typography } from '@material-ui/core'
import SignInForm from './SignInForm/SignInForm'
import { connect } from 'react-redux'
import { signIn } from '../../redux/userReducer'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(5),
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

  const onSubmit = ({ email, password }) => {
    signIn(email, password)
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
      </div>
    </Container>
  )
})

export default compose(
  connect(null, { signIn }),
  withAuthRedirect)(SignIn)
