import React, { memo, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core'
import { SubmitButtonFormik } from '../../common/FormElements'
import Answers from './Answers/Answers'
import { useFormik } from "formik";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  }
}))

const TestForm = memo(({ onSubmit, answers, type }) => {
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
      answer: [],
    },
    onSubmit: (values) => {
      return onSubmit(values, formik.setSubmitting, formik.resetForm, formIsMounted)
    }
  });

  return (
    <form className={classes.root} onSubmit={formik.handleSubmit}>
      <Answers type={type} data={answers} formik={formik} />
      <SubmitButtonFormik text='Відповісти' formik={formik} />
    </form>
  )
})

export default TestForm
