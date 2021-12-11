import React, { memo, useState, useEffect } from 'react'
import { List, makeStyles, Paper, Typography } from '@material-ui/core'
import { compose } from 'redux'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { ListCreator } from '../../common/UIElements'
import ExpertTestsListItem from './ExpertTestsListItem/ExpertTestsListItem'
import { Preloader } from '../../common/Preloader'
import { createTest, getExpertTests } from '../../../redux/expertTestsReducer'
import { expertTestsSelectors } from '../../../redux/selectors/expertTestsSelectors'
import { getDoublePaginationsUrlParams } from '../../../utils/utils'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(2)
  }
}))

const ExpertTests = memo(({
                            getExpertTests, expert_test_page, test_category_page, test_category_id, expertTests,
                            pagination, createTest, testCreatedId, locationPathname, locationSearch
                          }) => {
  const classes = useStyles()
  const [dense, setDense] = useState(false)
  const [showPreloader, setShowPreloader] = useState(true)

  useEffect(() => {
    let mounted = true; // exclude memory leak
    (async () => {
      setShowPreloader(true)
      await getExpertTests(test_category_id, expert_test_page)
      mounted && setShowPreloader(false)
    })()
    return () => mounted = false
  }, [expert_test_page, getExpertTests, test_category_id])

  const startTest = async (expert_test_id) => {
    setShowPreloader(true)
    await createTest(expert_test_id)
    setShowPreloader(false)
  }

  if (showPreloader) return <Preloader />

  if (testCreatedId) return <Redirect to={`/test/${testCreatedId}`} />

  const { mainPath, linkPageName } = getDoublePaginationsUrlParams(
    'expert_test_page',
    test_category_page,
    'test_category_page',
    locationPathname,
    locationSearch
  )

  return (
    <Paper className={classes.paper}>
      <Typography variant='h5' align='left' component='h2'>
        {'Тести'}
      </Typography>
      {
        expertTests.length !== 0 &&
        <ListCreator pagination={pagination} dense={dense} setDense={setDense}
                     mainPath={mainPath}
                     linkPageName={linkPageName}>
          <List dense={dense}>
            {
              expertTests.map(value => (
                <ExpertTestsListItem key={value.id} value={value} startTest={startTest} />))
            }
          </List>
        </ListCreator>
      }
    </Paper>
  )
})

const mapStateToProps = (state) => ({
  expertTests: expertTestsSelectors.getExpertTests(state),
  pagination: expertTestsSelectors.getPagination(state),
  testCreatedId: expertTestsSelectors.getTestCreatedId(state),
})

export default compose(connect(mapStateToProps, {
  getExpertTests,
  createTest,
}))(ExpertTests)
