import { NavLink } from 'react-router-dom'
import { memo } from 'react'
import { FormHelperText, Grid, Link, makeStyles } from '@material-ui/core'
import { reduxForm } from 'redux-form'
import {
  EmailField,
  PasswordField,
  SubmitButton,
  NameField, PasswordConfirmationField,
} from '../../common/FormElements'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
}))

const SignUpForm = memo(({ handleSubmit, pristine, submitting, error }) => {
  const classes = useStyles()

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <NameField />
      <EmailField />
      <PasswordField labelText='Пароль' />
      <PasswordConfirmationField labelText='Підтвердження паролю' />
      {error && <FormHelperText error={!!error}>{error}</FormHelperText>}
      <SubmitButton textButton='Зареєструватися' disabled={pristine || submitting} />
      <Grid container justifyContent='flex-end'>
        <Grid item>
          <Link component={NavLink} to='/signin' variant='body2'>
            Вже є аккаунт? Увійти
          </Link>
        </Grid>
      </Grid>
    </form>
  )
})

export default reduxForm({
  form: 'signup',
})(SignUpForm)
