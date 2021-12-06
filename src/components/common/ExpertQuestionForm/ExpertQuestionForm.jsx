import { memo, useEffect, useRef } from 'react'
import {
  makeStyles,
  MenuItem
} from '@material-ui/core'
import {
  SelectFieldFormik, SliderFormik,
  SubmitButtonFormik, TextareaFieldFormik,
} from '../FormElements'
import { questionValidationSchema } from '../../../utils/validators'
import { useFormik } from "formik"

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%', // Fix IE 11 issue.
    marginBottom: theme.spacing(2)
  }
}))

const ExpertQuestionForm = memo(({
                                   onSubmit,
                                   initialValues = {
                                     text: '',
                                     description: '',
                                     complexity: 0,
                                     significance: 0,
                                     relevance: 0,
                                     type: 1
                                   }
                                 }) => {
  const classes = useStyles()
  const formIsMounted = useRef(true)

  // exclude memory leak
  useEffect(() => {
    return () => {
      formIsMounted.current = false;
    }
  }, []);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: questionValidationSchema,
    onSubmit: (values) => {
      formik.resetForm({ values })
      return onSubmit(values, formik.setSubmitting, formIsMounted)
    }
  });

  return (
    <form className={classes.root} onSubmit={formik.handleSubmit}>
      <TextareaFieldFormik name='text' label='Текст*' formik={formik} />
      <TextareaFieldFormik name='description' label='Опис (пояснення відповіді)' formik={formik} />

      <SliderFormik name="complexity" label='Складність' min={0} max={10} step={1} formik={formik} />
      <SliderFormik name="significance" label='Значимість' min={0} max={10} step={1} formik={formik} />
      <SliderFormik name="relevance" label='Актуальність' min={0} max={10} step={1} formik={formik} />

      <SelectFieldFormik name='type' label='Тип' formik={formik}>
        <MenuItem value={1}>Одиночний</MenuItem>
        <MenuItem value={2}>Множинний</MenuItem>
      </SelectFieldFormik>

      <SubmitButtonFormik text='Зберегти' formik={formik} />
    </form>
  )
})

export default ExpertQuestionForm
