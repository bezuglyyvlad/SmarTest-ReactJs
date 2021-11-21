import { memo } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  addTestCategoryAdminPanel,
  deleteTestCategoryAdminPanel,
  updateTestCategoryAdminPanel
} from '../../../redux/adminPanelReducer'
import { changePerPage } from '../../../redux/appReducer'
import { adminPanelSelectors } from '../../../redux/selectors/adminPanelSelectors'
import { appSelectors } from '../../../redux/selectors/appSelectors'
import { materialTableLocalization } from '../../../utils/localization'
import MaterialTable from 'material-table'
import { email, maxLengthCreator, required } from '../../../utils/validators'

const AdminPanelTable = memo(({
                                showError, testCategories, addTestCategory, updateTestCategory,
                                deleteTestCategory, perPage, changePerPage
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
      title: 'Електронна пошта (Експерта)',
      field: 'user.email',
      validate: ({ user }) => (user && email(user.email)) || true
    },
  ]

  function setPerPage (perPage) {
    changePerPage(perPage)
  }

  return (
    <MaterialTable
      title='Категорії'
      columns={columns}
      data={testCategories}
      options={{ sorting: true, pageSize: +perPage }}
      localization={materialTableLocalization}
      onChangeRowsPerPage={setPerPage}
      editable={{
        onRowAdd: newData =>
          new Promise(async (resolve, reject) => {
            const { title, userEmail } = {
              title: newData.title,
              userEmail: newData.user ? newData.user.email : null,
            }
            const apiErrors = await addTestCategory(title, userEmail)
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
              const { id, title, userEmail } = {
                id: newData.id,
                title: newData.title,
                userEmail: newData.user ? newData.user.email : null,
              }
              const apiErrors = await updateTestCategory(id, title, userEmail)
              if (apiErrors) {
                showError(apiErrors)
                reject()
              }
            }
            resolve()
          }),
        onRowDelete: oldData =>
          new Promise(async (resolve, reject) => {
            await deleteTestCategory(oldData.id)
            resolve()
          })
      }}
    />
  )
})

const mapStateToProps = (state) => ({
  testCategories: adminPanelSelectors.getCategories(state),
  perPage: appSelectors.getPerPage(state),
})

export default compose(connect(mapStateToProps, {
  updateTestCategory: updateTestCategoryAdminPanel,
  addTestCategory: addTestCategoryAdminPanel,
  deleteTestCategory: deleteTestCategoryAdminPanel,
  changePerPage,
}))(AdminPanelTable)
