import { memo, useState, useEffect } from 'react'
import { Box, makeStyles } from "@material-ui/core"
import { compose } from "redux"
import { connect } from "react-redux"
import ExpertPanelExpertTestsTable from "./ExpertPanelTestCatalogExpertTestsTable/ExpertPanelExpertTestsTable"
import { Preloader } from "../../common/Preloader"
import { getExpertPanelTests } from "../../../redux/expertPanelTestCatalogReducer"

const useStyles = makeStyles(theme => ({
  table: {
    marginTop: theme.spacing(2),
  },
}))

const ExpertPanelTestCatalogExpertTests = memo(({ test_category_id, getExpertPanelTests, history, showError }) => {
  const classes = useStyles()
  const [showPreloader, setShowPreloader] = useState(true)

  useEffect(() => {
    let mounted = true; // exclude memory leak
    (async () => {
      setShowPreloader(true)
      await getExpertPanelTests(test_category_id)
      mounted && setShowPreloader(false)
    })()
    return () => mounted = false
  }, [test_category_id, getExpertPanelTests])

  if (showPreloader) {
    return <Preloader />
  }

  const rowClick = (event, rowData) => {
    history.push(`/expertPanel/${test_category_id}/${rowData.id}`)
  }

  return (
    <Box className={classes.table}>
      <ExpertPanelExpertTestsTable rowClick={rowClick} showError={showError}
                                   test_category_id={test_category_id} history={history} />
    </Box>
  )
})

export default compose(connect(null, {
  getExpertPanelTests
}))(ExpertPanelTestCatalogExpertTests)
