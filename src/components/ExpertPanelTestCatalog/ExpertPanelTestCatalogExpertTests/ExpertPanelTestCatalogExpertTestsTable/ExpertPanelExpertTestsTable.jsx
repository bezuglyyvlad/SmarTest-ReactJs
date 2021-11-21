import { memo } from 'react'
import MaterialTable from 'material-table'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { changePerPage } from '../../../../redux/appReducer'
import { appSelectors } from '../../../../redux/selectors/appSelectors'
import { materialTableLocalization } from '../../../../utils/localization'
import { expertPanelTestCatalogSelectors } from '../../../../redux/selectors/expertPanelTestCatalogSelectors'
import { maxLengthCreator, required } from '../../../../utils/validators'
import {
  addExpertTestExpertPanel,
  deleteExpertTestExpertPanel,
  updateExpertTestExpertPanel
} from '../../../../redux/expertPanelTestCatalogReducer'
import BarChartIcon from '@material-ui/icons/BarChart'

const ExpertPanelExpertTestsTable = memo(({
                                            perPage,
                                            changePerPage,
                                            rowClick,
                                            expertTests,
                                            showError,
                                            test_category_id,
                                            addTest,
                                            updateTest,
                                            deleteTest,
                                            history
                                          }) => {
  const columns = [
    {
      title: '№',
      field: 'tableData.id',
      editable: 'never',
      render: rowData => rowData.tableData.id + 1
    },
    {
      title: 'Назва*',
      field: 'title',
      validate: ({ title }) => required(title) || maxLengthCreator(255)(title) || true
    },
    {
      title: 'Доступ*',
      field: 'is_published',
      lookup: { null: 'Закритий', 0: 'Закритий', 1: 'Відкритий' },
      editable: 'onUpdate',
      initialEditValue: 0
    },
  ]

  function setPerPage (perPage) {
    changePerPage(perPage)
  }

  return (
    <MaterialTable
      title='Тести'
      columns={columns}
      data={expertTests}
      options={{ sorting: true, pageSize: +perPage }}
      localization={materialTableLocalization}
      onChangeRowsPerPage={setPerPage}
      onRowClick={rowClick}
      editable={{
        onRowAdd: newData =>
          new Promise(async (resolve, reject) => {
            const { title } = newData
            const apiErrors = await addTest({ title, test_category_id })
            if (apiErrors) {
              showError(apiErrors)
              reject()
            }
            resolve()
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(async (resolve, reject) => {
            let myOldData = { ...oldData }
            delete myOldData.tableData
            if (JSON.stringify(newData) !== JSON.stringify(myOldData)) {
              const { id, title, is_published } = newData
              const apiErrors = await updateTest(id, title, is_published)
              if (apiErrors) {
                showError(apiErrors)
                reject()
              }
            }
            resolve()
          }),
        onRowDelete: oldData =>
          new Promise(async (resolve, reject) => {
            await deleteTest(oldData.id)
            resolve()
          })
      }}
      actions={
        [
          {
            icon: () => <BarChartIcon />,
            tooltip: 'Статистика',
            onClick: (event, rowData) =>
              history.push(`/expertPanel/${test_category_id}/${rowData.id}/statistics`)
          }

        ]
      }
    />
  )
})

const mapStateToProps = (state) => ({
  expertTests: expertPanelTestCatalogSelectors.getExpertTests(state),
  perPage: appSelectors.getPerPage(state),
})

export default compose(connect(mapStateToProps, {
  changePerPage,
  addTest: addExpertTestExpertPanel,
  updateTest: updateExpertTestExpertPanel,
  deleteTest: deleteExpertTestExpertPanel
}))(ExpertPanelExpertTestsTable)
