import { memo } from 'react'
import { Box, Breadcrumbs, Container, Link, makeStyles, Typography } from "@material-ui/core"
import { compose } from "redux"
import { withUnAuthRedirect } from "../../hoc/withUnAuthRedirect"
import { connect } from "react-redux"
import { withNotExpertRedirect } from "../../hoc/withNotExpertRedirect"
import { NavLink } from "react-router-dom"
import { withRouter } from "react-router"
import ExpertTestStatisticsTable from "./ExpertPanelTestStatisticsTable/ExpertPanelTestStatisticsTable"
import { expertPanelTestStatisticsSelectors } from "../../redux/selectors/expertPanelTestStatisticsSelectors"
import ExpertPanelTestStatisticsDataMining
  from "./ExpertPanelTestStatisticsDataMining/ExpertPanelTestStatisticsDataMining"

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
                                          match, testCategoryBreadcrumbs, expertTestName
                                        }) => {
  const classes = useStyles()

  const expert_test_id = match.params.expert_test_id

  return (
    <Container component="main" maxWidth="lg" className={classes.root}>
      {
        Array.isArray(testCategoryBreadcrumbs) && testCategoryBreadcrumbs.length ?
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" component={NavLink} to='/expertPanel'>
              Expert панель
            </Link>
            {
              testCategoryBreadcrumbs.map(value =>
                <Link key={value.id} color="inherit" component={NavLink}
                      to={`/expertPanel/${value.id}`}>
                  {value.title}
                </Link>
              )
            }
            <Typography color="textPrimary">{`${expertTestName} (статистика)`}</Typography>
          </Breadcrumbs> : ''
      }
      <Box className={classes.table}>
        <ExpertTestStatisticsTable expert_test_id={expert_test_id} expertTestName={expertTestName} />
        <ExpertPanelTestStatisticsDataMining expert_test_id={expert_test_id} />
      </Box>
    </Container>
  )
})

const mapStateToProps = (state) => ({
  testCategoryBreadcrumbs: expertPanelTestStatisticsSelectors.getTestCategoryBreadcrumbs(state),
  expertTestName: expertPanelTestStatisticsSelectors.getExpertTestName(state),
})

export default compose(withUnAuthRedirect, withNotExpertRedirect, withRouter,
  connect(mapStateToProps, null))(ExpertPanelTestStatistics)
