import { memo } from 'react'
import { CheckboxFormik, RadioFormik } from '../../../common/FormElements'
import { FormControlLabel, Radio } from '@material-ui/core'

const Answers = memo(({ type, data, formik }) => {
  let answers
  switch (type) {
    case 1:
      answers = <RadioFormik name="answer" formik={formik}>
        {data.map((value) => (
          <FormControlLabel key={value.id} value={String(value.id)} control={<Radio color='primary' />}
                            label={value.text} />))
        }
      </RadioFormik>
      break
    case 2:
      answers = data.map((value) => (
        <CheckboxFormik key={value.id} name='answer' value={String(value.id)} label={value.text}
                        formik={formik} />
      ))
      break
    default:
      answers = <></>
  }
  return answers
})

export default Answers
