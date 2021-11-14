import { memo } from 'react'
import { email, fieldMatch, maxLengthCreator, minLengthCreator, required } from '../../utils/validators'
import { Field } from 'redux-form'
import {
  Button, Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText, Grid,
  InputLabel,
  makeStyles, RadioGroup,
  Select,
  TextField
} from '@material-ui/core'
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";

const renderTextField = memo(({
                                label,
                                input,
                                meta: { touched, invalid, error },
                                ...custom
                              }) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
))


const renderFromHelper = ({ touched, error }) => {
  if (touched && error) {
    return <FormHelperText>{touched && error}</FormHelperText>
  }
}

const useStylesSelect = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(2),
  },
}))

const renderSelectField = memo(({
                                  input,
                                  label,
                                  meta: { touched, error },
                                  children,
                                  ...custom
                                }) => {
  const classes = useStylesSelect()

  return (
    <FormControl error={touched && error} fullWidth className={classes.formControl}>
      <InputLabel>{label}</InputLabel>
      <Select
        {...input}
        {...custom}
      >
        {children}
      </Select>
      {renderFromHelper({ touched, error })}
    </FormControl>)
})

const minLength2 = minLengthCreator(2)
const minLength6 = minLengthCreator(6)

const maxLength255 = maxLengthCreator(255)

export const NameField = memo(() => (
  <Field id='name' name='name' component={renderTextField}
         validate={[required, minLength2, maxLength255]}
         label='Ім`я користувача'
         variant='outlined'
         margin='normal'
         fullWidth />
))

export const EmailField = memo(() => (
  <Field id='email' name='email' component={renderTextField}
         validate={[required, email]}
         label='Електронна пошта'
         variant='outlined'
         margin='normal'
         fullWidth />
))

export const PasswordField = memo(({ labelText }) => (
  <Field id='password' name='password' component={renderTextField}
         validate={[required, minLength6, maxLength255]}
         label={labelText}
         variant='outlined'
         margin='normal'
         type='password'
         fullWidth />
))

export const PasswordConfirmationField = memo(({ labelText }) => (
  <Field id='password_confirmation' name='password_confirmation' component={renderTextField}
         validate={[required, minLength6, maxLength255, fieldMatch('password')]}
         label={labelText}
         variant='outlined'
         margin='normal'
         type='password'
         fullWidth />
))

const useStylesSubmitButton = makeStyles(theme => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export const SubmitButton = memo(({ textButton, disabled }) => {
  const classes = useStylesSubmitButton()

  return (
    <Button
      type='submit'
      fullWidth
      variant='contained'
      color='primary'
      className={classes.submit}
      disabled={disabled}
    >
      {textButton}
    </Button>)
})

export const TextareaField = memo(({ label, name, validators }) => (
  <Field
    name={name}
    component={renderTextField}
    validate={validators}
    label={label}
    multiline
    rowsMax='10'
    margin='normal'
    fullWidth
  />
))

export const SelectField = memo(({ children, name, label }) => (
  <Field
    name={name}
    component={renderSelectField}
    label={label}
  >
    {children}
  </Field>
))

export const radioButtons = ({ input, ...rest }) => (
  <FormControl>
    <RadioGroup {...input} {...rest}>
      {rest.children}
    </RadioGroup>
  </FormControl>
)

export const renderCheckbox = ({ input, label }) => (
  <div>
    <FormControlLabel
      control={
        <Checkbox color='primary'
                  checked={!!input.value}
                  onChange={input.onChange} />
      }
      label={label}
    />
  </div>
)

const useStylesTestResultAnswers = makeStyles(theme => ({
  checkIcon: {
    color: theme.palette.success.main
  },
  cancelIcon: {
    color: theme.palette.error.main
  },
}))

export const TestResultAnswers = memo(({ answer, user_answer, children }) => {
  const classes = useStylesTestResultAnswers()

  return <Grid container alignItems='center' wrap='nowrap'>
    {
      !!answer.is_correct !== user_answer.includes(answer.id) && (answer.is_correct === 1 ?
        <CheckCircleIcon className={classes.checkIcon} /> :
        <CancelIcon className={classes.cancelIcon} />)
    }
    {children}
  </Grid>
})
