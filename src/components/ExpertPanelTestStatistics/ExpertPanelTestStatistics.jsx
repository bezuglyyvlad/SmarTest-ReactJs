import React, { memo, useEffect, useState } from 'react'
import { Box, Container, makeStyles, Typography } from "@material-ui/core"
import { compose } from "redux"
import { withUnAuthRedirect } from "../../hoc/withUnAuthRedirect"
import { connect } from "react-redux"
import { withNotExpertRedirect } from "../../hoc/withNotExpertRedirect"
import { withRouter } from "react-router"
import ExpertTestStatisticsTable from "./ExpertPanelTestStatisticsTable/ExpertPanelTestStatisticsTable"
import ExpertPanelTestStatisticsDataMining
  from "./ExpertPanelTestStatisticsDataMining/ExpertPanelTestStatisticsDataMining"
import { expertPanelBreadcrumbsSelectors } from "../../redux/selectors/expertPanelBreadcrumbsSelectors";
import ExpertPanelTestCategoryBreadcrumbs from "../common/ExpertPanel/ExpertPanelTestCategoryBreadcrumbs";
import { Preloader } from "../common/Preloader";
import { getExpertPanelBreadcrumbs } from "../../redux/expertPanelBreadcrumbsReducer";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
  },
  table: {
    marginTop: theme.spacing(2),
  },
}))

const ExpertPanelTestStatistics = memo(({
                                          match, breadcrumbs, expertTestName, getExpertPanelBreadcrumbs
                                        }) => {
  const classes = useStyles()
  const [showPreloader, setShowPreloader] = useState(true)

  const test_category_id = match.params.test_category_id
  const expert_test_id = match.params.expert_test_id

  useEffect(() => {
    let mounted = true; // exclude memory leak
    (async () => {
      setShowPreloader(true)
      await getExpertPanelBreadcrumbs(test_category_id, expert_test_id)
      mounted && setShowPreloader(false)
    })()
    return () => mounted = false
  }, [getExpertPanelBreadcrumbs, test_category_id, expert_test_id])

  if (showPreloader) {
    return <Preloader />
  }

  return (
    <Container component="main" maxWidth="lg" className={classes.root}>
      {
        breadcrumbs &&
        <ExpertPanelTestCategoryBreadcrumbs breadcrumbs={breadcrumbs}>
          <Typography color="textPrimary">{`${expertTestName} (статистика)`}</Typography>
        </ExpertPanelTestCategoryBreadcrumbs>
      }
      <Box className={classes.table}>
        <ExpertTestStatisticsTable expert_test_id={expert_test_id} expertTestName={expertTestName} />
        <ExpertPanelTestStatisticsDataMining expert_test_id={expert_test_id} />
      </Box>
    </Container>
  )
})

const mapStateToProps = (state) => ({
  breadcrumbs: expertPanelBreadcrumbsSelectors.getBreadcrumbs(state),
  expertTestName: expertPanelBreadcrumbsSelectors.getExpertTestName(state),
})

export default compose(withUnAuthRedirect, withNotExpertRedirect, withRouter,
  connect(mapStateToProps, { getExpertPanelBreadcrumbs }))(ExpertPanelTestStatistics)
