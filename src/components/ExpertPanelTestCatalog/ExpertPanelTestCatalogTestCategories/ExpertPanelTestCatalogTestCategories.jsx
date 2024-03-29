import React, { memo, useState, useEffect } from 'react'
import { Box, makeStyles } from "@material-ui/core"
import { compose } from "redux"
import { connect } from "react-redux"
import { Preloader } from "../../common/Preloader"
import { getExpertPanelTestCategories } from "../../../redux/testCategoriesCRUDReducer";
import TestCategoriesCRUDTable from "../../common/testCategoriesCRUD/testCategoriesCRUDTable";

const useStyles = makeStyles(theme => ({
  table: {
    marginTop: theme.spacing(2),
  },
}))

const ExpertPanelTestCatalogTestCategories = memo(({
                                                     test_category_id,
                                                     getExpertPanelTestCategories,
                                                     history,
                                                     showError
                                                   }) => {
  const classes = useStyles()
  const [showPreloader, setShowPreloader] = useState(true)

  useEffect(() => {
    let mounted = true; // exclude memory leak
    (async () => {
      setShowPreloader(true)
      await getExpertPanelTestCategories(test_category_id)
      mounted && setShowPreloader(false)
    })()
    return () => mounted = false
  }, [getExpertPanelTestCategories, test_category_id])

  if (showPreloader) {
    return <Preloader />
  }

  const rowClick = (event, rowData) => {
    history.push(`/expertPanel/${rowData.id}`)
  }

  return (
    <Box className={classes.table}>
      <TestCategoriesCRUDTable rowClick={rowClick} test_category_id={test_category_id} showError={showError} />
    </Box>
  )
})

export default compose(connect(null, {
  getExpertPanelTestCategories
}))(ExpertPanelTestCatalogTestCategories)
