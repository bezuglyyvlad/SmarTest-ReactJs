import { memo, useEffect, useState } from 'react'
import {
  Box,
  FormControlLabel,
  makeStyles,
  Paper, Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core'
import { compose } from 'redux'
import { withRouter } from 'react-router'
import { appSelectors } from '../../../redux/selectors/appSelectors'
import { statisticsSelectors } from '../../../redux/selectors/statisticsSelectors'
import { TablePaginationCreatorWithConnect } from '../../common/UIElements'
import { Preloader } from '../../common/Preloader'
import { getTests } from '../../../redux/statisticsReducer'
import { connect } from 'react-redux'

const useStyles = makeStyles(theme => ({
  tableRow: {
    cursor: 'pointer'
  },
  titleTable: {
    padding: '16px 0 0 16px'
  },
}))

const TestsTable = memo(({ history, perPage, pagination, tests, getTests }) => {
  const classes = useStyles()
  const [testsRequest, setTestsRequest] = useState(true)
  const [page, setPage] = useState(1)
  const [dense, setDense] = useState(false)

  useEffect(() => {
    let mounted = true; // exclude memory leak
    (async () => {
      setTestsRequest(true)
      await getTests(page, perPage)
      mounted && setTestsRequest(false)
    })()
    return () => mounted = false
  }, [getTests, page, perPage])

  const handleChangeDense = event => {
    setDense(event.target.checked)
  }

  const changePage = (event, newPage) => {
    setPage(newPage + 1)
  }

  if (testsRequest) return <Preloader />

  const indexFirstItem = pagination.total - ((pagination.current_page - 1) * pagination.per_page)

  return (
    <Box>
      <TableContainer component={Paper}>
        <Typography variant='h6' className={classes.titleTable}>
          Тести
        </Typography>
        <Table
          size={dense ? 'small' : 'medium'}
        >
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell>Назва</TableCell>
              <TableCell>Категорія</TableCell>
              <TableCell>Бали</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tests.map((t, index) => (
              <TableRow key={t.id} hover onClick={() => history.push(`/test/${t.id}/result`)}
                        className={classes.tableRow}>
                <TableCell>{indexFirstItem - index}</TableCell>
                <TableCell>{t.expert_test.title}</TableCell>
                <TableCell>{t.test_category.title}</TableCell>
                <TableCell>{t.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePaginationCreatorWithConnect
        pagination={pagination}
        changePage={changePage} />
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} color='primary' />}
        label='Зробити компактніше'
      />
    </Box>
  )
})

const mapStateToProps = (state) => ({
  perPage: appSelectors.getPerPage(state),
  tests: statisticsSelectors.getTests(state),
  pagination: statisticsSelectors.getPagination(state),
})

export default compose(withRouter, connect(mapStateToProps, { getTests }))(TestsTable)
