import React, { memo } from 'react'
import { Breadcrumbs, Container, Link, makeStyles, Typography } from '@material-ui/core'
import { compose } from 'redux'
import { withRouter } from 'react-router'
import queryString from 'query-string'
import { withUnAuthRedirect } from '../../hoc/withUnAuthRedirect'
import TestCategories from './TestCategories/TestCategories'
import ExpertTests from './ExpertTests/ExpertTests'
import { NavLink } from 'react-router-dom'
import { testCategoriesSelectors } from '../../redux/selectors/testCategoriesSelectors'
import { connect } from 'react-redux'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(2, 0),
  },
}))

const TestCatalog = memo(({ location, match, breadcrumbs }) => {
  const classes = useStyles()

  const test_category_page = +queryString.parse(location.search).test_category_page || 1
  const expert_test_page = +queryString.parse(location.search).expert_test_page || 1
  const test_category_id = match.params.test_category_id

  return (
    <Container component='main' maxWidth='lg' className={classes.root}>
      {
        Array.isArray(breadcrumbs) && breadcrumbs.length ?
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" component={NavLink} to='/testCatalog'>
              Каталог тестів
            </Link>
            {
              breadcrumbs.length > 1 &&
              [...breadcrumbs].slice(0, -1).map(value =>
                <Link key={value.id} color="inherit" component={NavLink} to={`/testCatalog/${value.id}`}>
                  {value.title}
                </Link>
              )
            }
            <Typography color="textPrimary">{breadcrumbs[breadcrumbs.length - 1].title}</Typography>
          </Breadcrumbs> : ''
      }
      <Typography variant="h5" align='center' className={classes.title} component='h1'>
        Каталог тестів
      </Typography>
      <TestCategories test_category_page={test_category_page} expert_test_page={expert_test_page}
                      test_category_id={test_category_id} locationPathname={location.pathname}
                      locationSearch={location.search} />
      {
        test_category_id &&
        <ExpertTests expert_test_page={expert_test_page} test_category_page={test_category_page}
                     test_category_id={test_category_id} locationPathname={location.pathname}
                     locationSearch={location.search} />
      }
    </Container>
  )
})

const mapStateToProps = (state) => ({
  breadcrumbs: testCategoriesSelectors.getBreadcrumbs(state),
})

export default compose(withUnAuthRedirect, withRouter, connect(mapStateToProps))(TestCatalog)
