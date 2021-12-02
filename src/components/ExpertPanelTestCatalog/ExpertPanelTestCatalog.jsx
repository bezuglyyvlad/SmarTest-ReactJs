import { memo, useEffect, useState } from 'react'
import { Container, makeStyles, Typography } from '@material-ui/core'
import { compose } from 'redux'
import { withUnAuthRedirect } from '../../hoc/withUnAuthRedirect'
import { connect } from 'react-redux'
import { withNotExpertRedirect } from '../../hoc/withNotExpertRedirect'
import { withRouter } from 'react-router'
import { useSnackbar } from 'notistack'
import ExpertPanelTestCatalogExpertTests from './ExpertPanelTestCatalogExpertTests/ExpertPanelTestCatalogExpertTests'
import ExpertPanelTestCatalogTestCategories
  from './ExpertPanelTestCatalogTestCategories/ExpertPanelTestCatalogTestCategories'
import { getExpertPanelBreadcrumbs } from "../../redux/expertPanelBreadcrumbsReducer";
import { expertPanelBreadcrumbsSelectors } from "../../redux/selectors/expertPanelBreadcrumbsSelectors";
import { Preloader } from "../common/Preloader";
import ExpertPanelTestCategoryBreadcrumbs from "../common/ExpertPanel/ExpertPanelTestCategoryBreadcrumbs";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
  },
}))

const ExpertPanelTestCatalog = memo(({ history, match, breadcrumbs, getExpertPanelBreadcrumbs }) => {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const [showPreloader, setShowPreloader] = useState(true)

  const test_category_id = match.params.test_category_id

  useEffect(() => {
    let mounted = true; // exclude memory leak
    (async () => {
      setShowPreloader(true)
      await getExpertPanelBreadcrumbs(test_category_id)
      mounted && setShowPreloader(false)
    })()
    return () => mounted = false
  }, [getExpertPanelBreadcrumbs, test_category_id])

  if (showPreloader) {
    return <Preloader />
  }

  function showError (array) {
    array.forEach(item => {
      enqueueSnackbar(item, { variant: 'error' })
    })
  }

  return (
    <Container component='main' maxWidth='lg' className={classes.root}>
      {
        breadcrumbs &&
        <ExpertPanelTestCategoryBreadcrumbs breadcrumbs={breadcrumbs.slice(0, -1)}>
          <Typography color='textPrimary'>{breadcrumbs[breadcrumbs.length - 1].title}</Typography>
        </ExpertPanelTestCategoryBreadcrumbs>
      }
      <ExpertPanelTestCatalogTestCategories test_category_id={test_category_id} history={history}
                                            showError={showError} />
      <ExpertPanelTestCatalogExpertTests test_category_id={test_category_id} history={history}
                                         showError={showError} />
    </Container>
  )
})

const mapStateToProps = (state) => ({
  breadcrumbs: expertPanelBreadcrumbsSelectors.getBreadcrumbs(state),
})

export default compose(
  withUnAuthRedirect,
  withNotExpertRedirect,
  withRouter,
  connect(mapStateToProps, { getExpertPanelBreadcrumbs })
)(ExpertPanelTestCatalog)
