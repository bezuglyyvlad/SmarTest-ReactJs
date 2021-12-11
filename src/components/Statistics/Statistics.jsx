import React, { memo, useState, useEffect } from 'react'
import { Container, makeStyles, Typography } from '@material-ui/core'
import { compose } from 'redux'
import { withUnAuthRedirect } from '../../hoc/withUnAuthRedirect'
import { Preloader } from '../common/Preloader'
import TestsTable from './TestsTable/TestsTable'
import MyRating from './MyRating/MyRating'
import Chart from './Chart/Chart'
import { getRating } from '../../redux/statisticsReducer'
import { statisticsSelectors } from '../../redux/selectors/statisticsSelectors'
import { connect } from 'react-redux'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2)
  },
}))

const Statistics = memo(({ getRating, ratingInfo }) => {
  const classes = useStyles()
  const [ratingRequest, setRatingRequest] = useState(true)

  useEffect(() => {
    let mounted = true; // exclude memory leak
    (async () => {
      setRatingRequest(true)
      await getRating()
      mounted && setRatingRequest(false)
    })()
    return () => mounted = false
  }, [getRating])

  if (ratingRequest) return <Preloader />

  return (
    <Container component='main' maxWidth='lg' className={classes.root}>
      <Typography component='h1' variant='h5' align='center'>
        Статистика
      </Typography>
      <MyRating rating={ratingInfo.rating} ratingByCategory={ratingInfo.ratingByCategory} />
      <Chart data={ratingInfo.chartData} />
      <TestsTable />
    </Container>
  )
})

const mapStateToProps = (state) => ({
  ratingInfo: statisticsSelectors.getRating(state),
})

export default compose(withUnAuthRedirect, connect(mapStateToProps, { getRating }))(Statistics)
