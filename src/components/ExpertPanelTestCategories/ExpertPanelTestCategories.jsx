import { memo, useState, useEffect } from 'react'
import { Container, List, makeStyles, Typography } from '@material-ui/core'
import { compose } from 'redux'
import { withUnAuthRedirect } from '../../hoc/withUnAuthRedirect'
import { connect } from 'react-redux'
import { Preloader } from '../common/Preloader'
import { withNotExpertRedirect } from '../../hoc/withNotExpertRedirect'
import { ListCreator } from '../common/UIElements'
import ExpertCategoriesListItem from './ExpertPanelTestCategoriesListItem/ExpertPanelTestCategoriesListItem'
import { getExpertTestCategories } from '../../redux/expertPanelTestCategoriesReducer'
import { expertPanelCategoriesSelectors } from '../../redux/selectors/expertPanelCategoriesSelectors'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(2, 0),
  },
}))

const ExpertPanelTestCategories = memo(({ categories, getExpertTestCategories }) => {
  const classes = useStyles()
  const [showPreloader, setShowPreloader] = useState(true)
  const [dense, setDense] = useState(false)

  useEffect(() => {
    let mounted = true; // exclude memory leak
    (async () => {
      setShowPreloader(true)
      await getExpertTestCategories()
      mounted && setShowPreloader(false)
    })()
    return () => mounted = false
  }, [getExpertTestCategories])

  if (showPreloader) {
    return <Preloader />
  }

  return (
    <Container component='main' maxWidth='lg' className={classes.root}>
      <Typography component='h1' variant='h5' align='center' className={classes.title}>
        Expert панель {categories.length === 0 && '(на жаль категорій немає)'}
      </Typography>
      {categories.length !== 0 &&
      <ListCreator dense={dense} setDense={setDense}>
        <List dense={dense}>
          {categories.map(value => (
            <ExpertCategoriesListItem key={value.id} value={value} />))}
        </List>
      </ListCreator>}
    </Container>
  )
})

const mapStateToProps = (state) => ({
  categories: expertPanelCategoriesSelectors.getCategories(state),
})

export default compose(withUnAuthRedirect, withNotExpertRedirect,
  connect(mapStateToProps, { getExpertTestCategories }))(ExpertPanelTestCategories)
