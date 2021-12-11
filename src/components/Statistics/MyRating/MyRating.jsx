import React, { memo, useState } from 'react'
import { Badge, Grid, makeStyles, Popover, Typography } from '@material-ui/core'
import GradeIcon from '@material-ui/icons/Grade'

const useStyles = makeStyles(theme => ({
  rating: {
    margin: theme.spacing(1, 0),
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
}))

const MyRating = memo(({ rating, ratingByCategory }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)

  const handlePopoverOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <Grid
      container
      justifyContent='space-between'
      className={classes.rating}
    >
      <Grid item>
        <Typography variant='h6'>
          Рейтинг
        </Typography>
      </Grid>
      <Grid item>
        {ratingByCategory.length === 0 ?
          <Grid container alignItems='center'>
            <Typography variant='h6'>
              {rating}
            </Typography>
            <GradeIcon />
          </Grid> :
          <>
            <Grid container alignItems='center' component={Badge} color='primary' variant='dot'
                  aria-owns={open ? 'mouse-over-popover' : undefined}
                  aria-haspopup='true'
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}>
              <Typography variant='h6'>
                {rating}
              </Typography>
              <GradeIcon />
            </Grid>
            <Popover
              className={classes.popover}
              classes={{
                paper: classes.paper,
              }}
              open={open}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              onClose={handlePopoverClose}
              disableRestoreFocus
            >
              {ratingByCategory.map(i => (
                <Typography key={i.id}>{i.title} - {i.score}</Typography>
              ))}
            </Popover>
          </>}
      </Grid>
    </Grid>
  )
})

export default MyRating
