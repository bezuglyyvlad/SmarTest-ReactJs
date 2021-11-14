import { memo } from 'react'
import { FormHelperText, makeStyles, MenuItem } from '@material-ui/core'
import { reduxForm } from 'redux-form'
import {
  SelectField,
  SubmitButton, TextareaField,
} from '../FormElements'
import { required } from '../../../utils/validators'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%', // Fix IE 11 issue.
    marginBottom: theme.spacing(2),
  },
}))

const ExpertQuestionForm = memo(({ handleSubmit, pristine, submitting, error }) => {
  const classes = useStyles()

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextareaField label='Текст' name='text' validators={[required]} />
      <TextareaField label='Опис' name='description' />
      <SelectField name='lvl' label='Складність'>
        <MenuItem value={1}>Легкий</MenuItem>
        <MenuItem value={2}>Середній</MenuItem>
        <MenuItem value={3}>Складний</MenuItem>
      </SelectField>
      <SelectField name='type' label='Тип'>
        <MenuItem value={1}>Одиночний</MenuItem>
        <MenuItem value={2}>Множинний</MenuItem>
      </SelectField>
      {error && <FormHelperText error={!!error}>{error}</FormHelperText>}
      <SubmitButton textButton='Зберегти' disabled={pristine || submitting} />
    </form>
  )
})

export default reduxForm({
  form: 'questionForm',
})(ExpertQuestionForm)
