import { memo, useState, useEffect, useRef } from 'react'
import { Box, Container, makeStyles, Typography } from '@material-ui/core'
import { compose } from 'redux'
import { withUnAuthRedirect } from '../../hoc/withUnAuthRedirect'
import { connect } from 'react-redux'
import { Preloader } from '../common/Preloader'
import { withNotExpertRedirect } from '../../hoc/withNotExpertRedirect'
import { withRouter } from 'react-router'
import { exportQuestions, getExpertQuestions } from '../../redux/expertPanelQuestionsReducer'
import ExpertQuestionsTable from './ExpertPanelQuestionsTable/ExpertPanelQuestionsTable'
import { useSnackbar } from 'notistack'
import ExpertPanelTestCategoryBreadcrumbs from "../common/ExpertPanel/ExpertPanelTestCategoryBreadcrumbs";
import { getExpertPanelBreadcrumbs } from "../../redux/expertPanelBreadcrumbsReducer";
import { expertPanelBreadcrumbsSelectors } from "../../redux/selectors/expertPanelBreadcrumbsSelectors";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
  },
  table: {
    marginTop: theme.spacing(2),
  },
}))

const ExpertPanelQuestions = memo(({
                                     match,
                                     history,
                                     getExpertQuestions,
                                     getExpertPanelBreadcrumbs,
                                     exportQuestions,
                                     breadcrumbs,
                                     expertTestName
                                   }) => {
  const classes = useStyles()
  const [showPreloader, setShowPreloader] = useState(true)
  const [disableExport, setDisableExport] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const isMounted = useRef(true)

  const test_category_id = match.params.test_category_id
  const expert_test_id = match.params.expert_test_id

  // exclude memory leak
  useEffect(() => {
    return () => {
      isMounted.current = false;
    }
  }, []);

  useEffect(() => {
    (async () => {
      setShowPreloader(true)
      await getExpertPanelBreadcrumbs(test_category_id, expert_test_id)
      await getExpertQuestions(expert_test_id)
      isMounted.current && setShowPreloader(false)
    })()
  }, [getExpertQuestions, expert_test_id, getExpertPanelBreadcrumbs, test_category_id])

  if (showPreloader) {
    return <Preloader />
  }

  function showError (array) {
    array.forEach(item => {
      enqueueSnackbar(item, { variant: 'error' })
    })
  }

  async function exportQuestionsAction () {
    setDisableExport(true)
    await exportQuestions(expert_test_id, expertTestName)
    isMounted.current && setDisableExport(false)
  }

  return (
    <Container component='main' maxWidth='lg' className={classes.root}>
      {
        breadcrumbs &&
        <ExpertPanelTestCategoryBreadcrumbs breadcrumbs={breadcrumbs}>
          <Typography color="textPrimary">{expertTestName}</Typography>
        </ExpertPanelTestCategoryBreadcrumbs>
      }
      <Box className={classes.table}>
        <ExpertQuestionsTable history={history} test_category_id={test_category_id} expert_test_id={expert_test_id}
                              showError={showError} exportQuestionsAction={exportQuestionsAction}
                              disableExport={disableExport} />
      </Box>
    </Container>
  )
})

const mapStateToProps = (state) => ({
  breadcrumbs: expertPanelBreadcrumbsSelectors.getBreadcrumbs(state),
  expertTestName: expertPanelBreadcrumbsSelectors.getExpertTestName(state)
})

export default compose(withUnAuthRedirect, withNotExpertRedirect, withRouter, connect(mapStateToProps, {
  getExpertPanelBreadcrumbs,
  getExpertQuestions,
  exportQuestions
}))(ExpertPanelQuestions)
