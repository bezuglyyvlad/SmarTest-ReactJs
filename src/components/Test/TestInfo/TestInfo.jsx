import React, { memo } from 'react'
import { Grid, makeStyles, Typography } from '@material-ui/core'
import { getTimerString } from "../../../utils/utils";

const useStyles = makeStyles(theme => ({
  info: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
}))

const TestInfo = memo(({ expert_test_name, test_category_name, timer }) => {
  const classes = useStyles()

  const timerString = getTimerString(timer)

  return (
    <Grid
      container
      justifyContent='space-between'
    >
      <Grid item md={10} xs={8}>
        <Typography component='h3' className={`${classes.info}`} variant='subtitle1'>
          {`${expert_test_name} - ${test_category_name}`}
        </Typography>
      </Grid>
      <Grid item md={2} xs={4}>
        <Typography variant='subtitle1' align='right'>
          {timerString}
        </Typography>
      </Grid>
    </Grid>
  )
})

export default TestInfo
