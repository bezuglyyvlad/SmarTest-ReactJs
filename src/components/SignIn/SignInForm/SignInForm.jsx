import { NavLink } from 'react-router-dom'
import { memo } from 'react'
import { FormHelperText, Grid, Link, makeStyles } from '@material-ui/core'
import { reduxForm } from 'redux-form'
import {
  EmailField,
  PasswordField,
  SubmitButton,
} from '../../common/FormElements'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
}))

const SignInForm = memo(({ handleSubmit, pristine, submitting, error }) => {
  const classes = useStyles()

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <EmailField />
      <PasswordField labelText='Пароль' />
      {error && <FormHelperText error={!!error}>{error}</FormHelperText>}
      <SubmitButton textButton='Увійти' disabled={pristine || submitting} />
      <Grid container justifyContent='flex-end'>
        <Grid item>
          <Link component={NavLink} to='/signup' variant='body2'>
            У вас немає облікового запису? Зареєструватися
          </Link>
        </Grid>
      </Grid>
    </form>
  )
})

export default reduxForm({
  form: 'signin',
})(SignInForm)
