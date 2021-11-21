import { memo, useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import { compose } from "redux"
import { connect } from "react-redux"
import { changePerPage } from "../../../redux/appReducer"
import { appSelectors } from "../../../redux/selectors/appSelectors"
import { materialTableLocalization } from "../../../utils/localization"
import { expertPanelTestStatisticsSelectors } from "../../../redux/selectors/expertPanelTestStatisticsSelectors"
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty'
import { Preloader } from "../../common/Preloader"
import { getExpertTestStatistics } from "../../../redux/expertPanelTestStatisticsReducer"

const ExpertPanelTestStatisticsTable = memo(({
                                               perPage,
                                               changePerPage,
                                               tests,
                                               expert_test_id,
                                               getExpertTestStatistics,
                                               expertTestName
                                             }) => {
  const [showPreloader, setShowPreloader] = useState(true)

  useEffect(() => {
    let mounted = true; // exclude memory leak
    (async () => {
      setShowPreloader(true)
      await getExpertTestStatistics(expert_test_id)
      mounted && setShowPreloader(false)
    })()
    return () => mounted = false
  }, [getExpertTestStatistics, expert_test_id])

  if (showPreloader) {
    return <Preloader />
  }

  const columns = [
    {
      title: '№',
      field: 'tableData.id',
      render: rowData => rowData.tableData.id + 1
    },
    { title: "Ім'я користувача", field: 'user.name' },
    { title: 'Електронна пошта', field: 'user.email' },
    {
      title: 'Початок тесту',
      field: 'start_date',
      render: rowData => (new Date(rowData.start_date)).toLocaleString()
    },
    {
      title: 'Завершення тесту',
      field: 'finish_date',
      render: rowData => (new Date(rowData.finish_date)).toLocaleString()
    },
    { title: 'Бали', field: 'score' },
    {
      title: 'Проходить',
      field: 'is_finished',
      render: rowData => !rowData.is_finished && <HourglassEmptyIcon />,
      export: false
    }
  ]

  function setPerPage (perPage) {
    changePerPage(perPage)
  }

  return (
    <MaterialTable
      title='Результати'
      columns={columns}
      data={tests}
      options={{
        sorting: true,
        pageSize: +perPage,
        exportButton: { csv: true, pdf: false },
        exportAllData: true,
        exportFileName: 'Результати_' + expertTestName
      }}
      localization={materialTableLocalization}
      onChangeRowsPerPage={setPerPage}
    />
  )
})

const mapStateToProps = (state) => ({
  tests: expertPanelTestStatisticsSelectors.getTests(state),
  perPage: appSelectors.getPerPage(state),
})

export default compose(connect(mapStateToProps, {
  changePerPage,
  getExpertTestStatistics
}))(ExpertPanelTestStatisticsTable)
