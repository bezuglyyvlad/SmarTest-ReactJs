import { memo, useState, useEffect } from 'react'
import { List, makeStyles, Paper, Typography } from '@material-ui/core'
import { compose } from 'redux'
import TestCategoriesListItem from './TestCategoriesListItem/TestCategoriesListItem'
import { getTestCategories } from '../../../redux/testCategoriesReducer'
import { connect } from 'react-redux'
import { testCategoriesSelectors } from '../../../redux/selectors/testCategoriesSelectors'
import { ListCreator } from '../../common/UIElements'
import { Preloader } from '../../common/Preloader'
import { getDoublePaginationsUrlParams } from '../../../utils/utils'
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight'
import FolderIcon from '@material-ui/icons/Folder'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(2)
  }
}))

const TestCategories = memo(({
                               getTestCategories,
                               testCategories,
                               pagination,
                               test_category_page,
                               expert_test_page,
                               test_category_id,
                               locationPathname,
                               locationSearch
                             }) => {
  const classes = useStyles()
  const [dense, setDense] = useState(false)
  const [showPreloader, setShowPreloader] = useState(true)

  useEffect(() => {
    let mounted = true; // exclude memory leak
    (async () => {
      setShowPreloader(true)
      await getTestCategories(test_category_id, test_category_page)
      mounted && setShowPreloader(false)
    })()
    return () => mounted = false
  }, [test_category_page, getTestCategories, test_category_id])

  if (showPreloader) {
    return <Preloader />
  }

  const { mainPath, linkPageName } = getDoublePaginationsUrlParams(
    'test_category_page',
    expert_test_page,
    'expert_test_page',
    locationPathname,
    locationSearch
  )

  const icon = test_category_id ? <SubdirectoryArrowRightIcon /> : <FolderIcon />

  return (
    <>
      {
        testCategories.length !== 0 &&
        <Paper className={classes.paper}>
          <Typography variant='h5' align='left' component='h2'>
            {test_category_id ? 'Підкатегорії' : 'Категорії'}
          </Typography>
          <ListCreator pagination={pagination} dense={dense} setDense={setDense} mainPath={mainPath}
                       linkPageName={linkPageName}>
            <List dense={dense}>
              {
                testCategories.map(value => (
                  <TestCategoriesListItem key={value.id} value={value} icon={icon} />))
              }
            </List>
          </ListCreator>
        </Paper>
      }
    </>
  )
})

const mapStateToProps = (state) => ({
  testCategories: testCategoriesSelectors.getTestCategories(state),
  pagination: testCategoriesSelectors.getPagination(state),
})

export default compose(connect(mapStateToProps, { getTestCategories }))(TestCategories)
