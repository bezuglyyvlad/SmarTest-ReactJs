import { memo, useEffect, useState } from 'react'
import { compose } from "redux"
import { connect } from "react-redux"
import { expertPanelTestStatisticsSelectors } from "../../../redux/selectors/expertPanelTestStatisticsSelectors"
import { Preloader } from "../../common/Preloader"
import { getExpertDataMining } from "../../../redux/expertPanelTestStatisticsReducer"
import { Box, makeStyles, Typography } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(2, 0),
  },
}))

const ExpertPanelTestStatisticsDataMining = memo(({
                                                    expert_test_id,
                                                    getExpertDataMining,
                                                    dataMining
                                                  }) => {
  const classes = useStyles()
  const [showPreloader, setShowPreloader] = useState(true)

  useEffect(() => {
    let mounted = true; // exclude memory leak
    (async () => {
      setShowPreloader(true)
      await getExpertDataMining(expert_test_id)
      mounted && setShowPreloader(false)
    })()
    return () => mounted = false
  }, [expert_test_id, getExpertDataMining])

  if (showPreloader) {
    return <Preloader />
  }

  console.log(dataMining)

  return (
    <Box className={classes.root}>
      <Typography component="h1" variant="h5" align='center' className={classes.title}>
        Інтелектуальний аналіз даних
      </Typography>
    </Box>
  )
})

const mapStateToProps = (state) => ({
  dataMining: expertPanelTestStatisticsSelectors.getDataMining(state),
})

export default compose(
  connect(mapStateToProps, { getExpertDataMining })
)(ExpertPanelTestStatisticsDataMining)
