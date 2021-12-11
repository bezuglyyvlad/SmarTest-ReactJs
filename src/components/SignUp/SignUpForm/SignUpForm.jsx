import React, { memo, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core'
import { TextFieldFormik, SubmitButtonFormik } from '../../common/FormElements'
import { useFormik } from "formik";
import { signUpValidationSchema } from "../../../utils/validators";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
}))

const SignUpForm = memo(({ onSubmit }) => {
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
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    },
    validationSchema: signUpValidationSchema,
    onSubmit: (values) => {
      // values for disable button after invalid submit
      // touched for show error through setErrors
      formik.resetForm({ values, touched: formik.touched })
      return onSubmit(values, formik.setSubmitting, formik.setErrors, formIsMounted)
    }
  });

  return (
    <form className={classes.root} onSubmit={formik.handleSubmit}>
      <TextFieldFormik name='name' label='Ім`я користувача' formik={formik} />
      <TextFieldFormik name='email' label='Електронна пошта' formik={formik} />
      <TextFieldFormik name='password' label='Пароль' type='password' formik={formik} />
      <TextFieldFormik name='password_confirmation' label='Підтвердження паролю' type='password' formik={formik} />
      <SubmitButtonFormik text='Зареєструватися' formik={formik} />
    </form>
  )
})

export default SignUpForm
