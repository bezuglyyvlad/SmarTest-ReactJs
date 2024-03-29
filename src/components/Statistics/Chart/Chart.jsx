import React, { memo } from 'react'
import { Box, makeStyles, useTheme } from '@material-ui/core'
import { Line } from 'react-chartjs-2'

const useStyles = makeStyles(theme => ({
  chart: {
    margin: theme.spacing(0, 0, 3),
  },
}))

const Chart = memo(({ data }) => {
  const theme = useTheme()
  const classes = useStyles()

  const chartData = {
    labels: Array.from({ length: data.length }, (v, k) => k + 1),
    datasets: [
      {
        label: 'Бали',
        fill: true,
        borderColor: theme.palette.primary.main,
        data: data,
        tension: 0.4
      }
    ]
  }

  return (
    <Box className={classes.chart}>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'Бали за останніх 30 днів',
              fontSize: 16
            },
            legend: {
              display: false,
            }
          },
        }}
        type='line'
      />
    </Box>
  )
})

export default Chart
