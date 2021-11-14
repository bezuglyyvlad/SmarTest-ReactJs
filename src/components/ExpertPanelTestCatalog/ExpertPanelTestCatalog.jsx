import { memo } from 'react'
import { Breadcrumbs, Container, Link, makeStyles, Typography } from '@material-ui/core'
import { compose } from 'redux'
import { withUnAuthRedirect } from '../../hoc/withUnAuthRedirect'
import { connect } from 'react-redux'
import { withNotExpertRedirect } from '../../hoc/withNotExpertRedirect'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import { useSnackbar } from 'notistack'
import { expertPanelTestCatalogSelectors } from '../../redux/selectors/expertPanelTestCatalogSelectors'
import ExpertPanelTestCatalogExpertTests from './ExpertPanelTestCatalogExpertTests/ExpertPanelTestCatalogExpertTests'
import ExpertPanelTestCatalogTestCategories
  from './ExpertPanelTestCatalogTestCategories/ExpertPanelTestCatalogTestCategories'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
  },
}))

const ExpertPanelTestCatalog = memo(({ history, match, breadcrumbs }) => {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()

  const test_category_id = match.params.test_category_id

  function showError (array) {
    array.forEach(item => {
      enqueueSnackbar(item, { variant: 'error' })
    })
  }

  return (
    <Container component='main' maxWidth='lg' className={classes.root}>
      {
        Array.isArray(breadcrumbs) && breadcrumbs.length &&
        <Breadcrumbs aria-label='breadcrumb'>
          <Link color='inherit' component={NavLink} to='/expertPanel'>
            Expert панель
          </Link>
          {
            breadcrumbs.length > 1 &&
            [...breadcrumbs].slice(0, -1).map(value =>
              <Link key={value.id} color='inherit' component={NavLink} to={`/expertPanel/${value.id}`}>
                {value.title}
              </Link>
            )
          }
          <Typography color='textPrimary'>{breadcrumbs[breadcrumbs.length - 1].title}</Typography>
        </Breadcrumbs>
      }
      <ExpertPanelTestCatalogTestCategories test_category_id={test_category_id} history={history}
                                            showError={showError} />
      <ExpertPanelTestCatalogExpertTests test_category_id={test_category_id} history={history}
                                         showError={showError} />
    </Container>
  )
})

const mapStateToProps = (state) => ({
  breadcrumbs: expertPanelTestCatalogSelectors.getBreadcrumbs(state),
})

export default compose(
  withUnAuthRedirect,
  withNotExpertRedirect,
  withRouter,
  connect(mapStateToProps, null)
)(ExpertPanelTestCatalog)
