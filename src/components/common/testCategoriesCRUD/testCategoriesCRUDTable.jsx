import { memo } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  addTestCategory,
  deleteTestCategory,
  updateTestCategory
} from '../../../redux/testCategoriesCRUDReducer'
import { changePerPage } from '../../../redux/appReducer'
import { testCategoriesCRUDSelectors } from '../../../redux/selectors/testCategoriesCRUDSelectors'
import { appSelectors } from '../../../redux/selectors/appSelectors'
import { materialTableLocalization } from '../../../utils/localization'
import MaterialTable from 'material-table'
import { email, maxLengthCreator, required } from '../../../utils/validators'
import { validationErrorHandler } from "../../../utils/utils";

const TestCategoriesCRUDTable = memo(({
                                showError, testCategories, addTestCategory, updateTestCategory,
                                deleteTestCategory, perPage, changePerPage, rowClick, test_category_id
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
      onRowClick={rowClick}
      editable={{
        onRowAdd: newData =>
          new Promise(async (resolve, reject) => {
            const { title, userEmail } = {
              title: newData.title,
              userEmail: newData.user ? newData.user.email : null,
            }
            await addTestCategory(title, userEmail, test_category_id)
              .then(() => {
                resolve()
              })
              .catch((e) => {
                const errors = validationErrorHandler(e)
                showError(errors)
                reject()
              })
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
              await updateTestCategory(id, title, userEmail)
                .catch((e) => {
                  const errors = validationErrorHandler(e)
                  showError(errors)
                  reject()
                })
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
  testCategories: testCategoriesCRUDSelectors.getCategories(state),
  perPage: appSelectors.getPerPage(state),
})

export default compose(connect(mapStateToProps, {
  updateTestCategory,
  addTestCategory,
  deleteTestCategory,
  changePerPage
}))(TestCategoriesCRUDTable)
