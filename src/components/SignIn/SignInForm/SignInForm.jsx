import { memo, useEffect, useRef } from 'react'
import { FormHelperText, makeStyles } from '@material-ui/core'
import { SubmitButtonFormik, TextFieldFormik } from '../../common/FormElements'
import { useFormik } from "formik";
import { signInValidationSchema } from "../../../utils/validators";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
}))

const SignInForm = memo(({ onSubmit }) => {
  const classes = useStyles()
  const formIsMounted = useRef(true)

  // exclude memory leak
  useEffect(() => {
    return () => {
      formIsMounted.current = false;
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: signInValidationSchema,
    onSubmit: (values) => {
      // values for disable button after invalid submit
      // touched for show error through setErrors
      formik.resetForm({ values, touched: formik.touched })
      return onSubmit(values, formik.setSubmitting, formik.setStatus, formIsMounted)
    }
  });

  return (
    <form className={classes.root} onSubmit={formik.handleSubmit}>
      <TextFieldFormik name='email' label='Електронна пошта' formik={formik} />
      <TextFieldFormik name='password' label='Пароль' type='password' formik={formik} />
      {
        !formik.dirty &&
        formik.status &&
        formik.status.error &&
        <FormHelperText error={!!formik.status.error}>{formik.status.error}</FormHelperText>
      }
      <SubmitButtonFormik text='Увійти' formik={formik} />
    </form>
  )
})

export default SignInForm
