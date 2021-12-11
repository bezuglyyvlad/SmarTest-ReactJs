import React, { memo } from 'react'
import {
  Box,
  Button, Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  makeStyles, RadioGroup,
  Select, Slider,
  TextField, Typography
} from '@material-ui/core'
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";

const useStylesSubmitButton = makeStyles(theme => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export const CheckboxFormik = memo(({ name, value, label, formik }) => (
  <div>
    <FormControlLabel
      name={name}
      control={<Checkbox color='primary' />}
      checked={formik.values[name].includes(value)}
      value={value}
      label={label}
      onChange={formik.handleChange}
    />
  </div>
))

export const RadioFormik = memo(({ name, formik, children }) => (
  <FormControl>
    <RadioGroup name={name}
                value={formik.values[name]}
                onChange={formik.handleChange}>
      {children}
    </RadioGroup>
  </FormControl>
))

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

export const TextFieldFormik = memo(({ name, label, placeholder = label, type = 'text', formik }) => (
  <TextField
    fullWidth
    variant='outlined'
    margin='normal'
    id={name}
    name={name}
    label={label}
    placeholder={placeholder}
    type={type}
    value={formik.values[name]}
    onChange={formik.handleChange}
    error={formik.touched[name] && Boolean(formik.errors[name])}
    helperText={formik.touched[name] && formik.errors[name]}
  />
))

export const TextareaFieldFormik = memo(({ name, label, placeholder = label, formik }) => (
  <TextField
    fullWidth
    multiline
    id={name}
    name={name}
    label={label}
    placeholder={placeholder}
    maxRows='10'
    margin='normal'
    value={formik.values[name]}
    onChange={formik.handleChange}
    error={formik.touched[name] && Boolean(formik.errors[name])}
    helperText={formik.touched[name] && formik.errors[name]}
  />
))

const useStylesSliderFormik = makeStyles(theme => ({
  slider: {
    marginTop: theme.spacing(2),
  }
}))

export const SliderFormik = memo(({ name, label, min, max, step, formik }) => {
  const classes = useStylesSliderFormik()

  return (
    <Box className={classes.slider}>
      <Typography id={name} color='textSecondary'>
        {label}
      </Typography>
      <Slider
        getAriaValueText={(value) => (value)}
        aria-labelledby={name}
        valueLabelDisplay="auto"
        step={step}
        marks
        min={min}
        max={max}
        value={formik.values[name]}
        onChange={(event, value) => formik.setFieldValue(name, value)}
      />
    </Box>
  )
})

const useStylesSelectFieldFormik = makeStyles(theme => ({
  formControl: {
    marginTop: theme.spacing(1),
  },
}))

export const SelectFieldFormik = memo(({ name, label, formik, children }) => {
  const classes = useStylesSelectFieldFormik()

  return (
    <FormControl fullWidth className={classes.formControl}>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        id={name}
        name={name}
        labelId={`${name}-label`}
        value={formik.values[name]}
        onChange={formik.handleChange}
      >
        {children}
      </Select>
    </FormControl>
  )
})

export const SubmitButtonFormik = memo(({ text, formik }) => {
  const classes = useStylesSubmitButton()

  return (
    <Button
      type='submit'
      fullWidth
      variant='contained'
      color='primary'
      className={classes.submit}
      disabled={!formik.dirty || formik.isSubmitting}
    >
      {text}
    </Button>
  )
})
