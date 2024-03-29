import React, { memo } from 'react'
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import Answers from './Answers/Answers'
import ImageBox from '../../common/UIElements'
import { roundToTwo } from '../../../utils/utils'
import CancelIcon from '@material-ui/icons/Cancel'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2, 2),
    marginBottom: theme.spacing(2)
  },
  checkIcon: {
    color: theme.palette.success.main
  },
  cancelIcon: {
    color: theme.palette.error.main
  },
}))

const Question = memo(({ q }) => {
  const classes = useStyles()

  const maxScore = roundToTwo(q.max_score)
  const score = roundToTwo(q.score)

  return (
    <Paper className={classes.paper}>
      <Grid
        container
        justifyContent='space-between'
      >
        <Grid item>
          <Typography variant='subtitle2'>
            Бали - {`${score > maxScore ? maxScore : score} из ${maxScore}`}
          </Typography>
        </Grid>
        <Grid item>
          {q.is_correct_answer === 1 ?
            <CheckCircleIcon className={classes.checkIcon} /> :
            <CancelIcon className={classes.cancelIcon} />}
        </Grid>
      </Grid>
      <Typography variant='h6'>
        {`${q.serial_number}. ${q.question.text}`}
      </Typography>
      {q.question.image && <ImageBox imageSrc={q.question.image} />}
      <Answers type={q.question.type}
               data={q.answers}
               user_answer={q.user_answer} />
      {q.question.description && <Typography variant='subtitle1'>
        <strong>Пояснення: </strong> {q.question.description}
      </Typography>}
    </Paper>
  )
})

export default Question
