import { memo } from 'react'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup
} from '@material-ui/core'
import { TestResultAnswers } from "../../../common/FormElements";

const Answers = memo(({ type, data, user_answer }) => {
  let answers
  switch (type) {
    case 1:
      answers = <FormControl>
        <RadioGroup name='answers'>
          {data.map(a => {
            const radio = user_answer.includes(a.id) ?
              <Radio checked /> : <Radio />
            return (
              <TestResultAnswers key={a.id} answer={a}
                                 user_answer={user_answer}>
                <FormControlLabel key={a.id} value={a.id} disabled
                                  control={radio}
                                  label={a.text} />
              </TestResultAnswers>
            )
          })}
        </RadioGroup>
      </FormControl>
      break
    case 2:
      answers = <FormGroup>
        {data.map(a => {
          const ckeckbox = user_answer.includes(a.id) ?
            <Checkbox checked name='answers' /> : <Checkbox name='answers' />
          return (
            <TestResultAnswers key={a.id} answer={a}
                               user_answer={user_answer}>
              <FormControlLabel disabled control={ckeckbox} label={a.text} />
            </TestResultAnswers>
          )
        })}
      </FormGroup>
      break
    default:
      answers = <></>
  }
  return answers
})

export default Answers
