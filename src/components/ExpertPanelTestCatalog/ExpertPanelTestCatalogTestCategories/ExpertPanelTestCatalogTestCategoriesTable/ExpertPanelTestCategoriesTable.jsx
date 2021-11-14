import { memo } from 'react'
import { email, maxLengthCreator, required } from "../../../../utils/validators"
import { compose } from "redux"
import { connect } from "react-redux"
import { changePerPage } from "../../../../redux/appReducer"
import { appSelectors } from "../../../../redux/selectors/appSelectors"
import { materialTableLocalization } from "../../../../utils/localization"
import MaterialTable from "material-table"
import { expertPanelTestCatalogSelectors } from "../../../../redux/selectors/expertPanelTestCatalogSelectors"
import {
  addTestCategoryExpertPanel, deleteTestCategoryExpertPanel,
  updateTestCategoryExpertPanel
} from "../../../../redux/expertPanelTestCatalogReducer"

const ExpertPanelTestCategoriesTable = memo(({
                                               showError,
                                               testCategories,
                                               parentSelect,
                                               addTestCategory,
                                               updateTestCategory,
                                               deleteTestCategory,
                                               perPage,
                                               changePerPage,
                                               rowClick,
                                               test_category_id
                                             }) => {
  const columns = [
    {
      title: '№',
      field: 'tableData.id',
      editable: 'never',
      emptyValue: null,
      render: rowData => rowData.tableData.id + 1
    },
    {
      title: 'Назва*',
      field: 'title',
      validate: ({ title }) => required(title) || maxLengthCreator(255)(title) || true
    },
    {
      title: 'Батьківська категорія*',
      field: 'parent_id',
      lookup: parentSelect,
      initialEditValue: test_category_id
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
      title="Категорії"
      columns={columns}
      data={testCategories}
      options={{ sorting: true, pageSize: +perPage }}
      localization={materialTableLocalization}
      onChangeRowsPerPage={setPerPage}
      onRowClick={rowClick}
      editable={{
        onRowAdd: newData =>
          new Promise(async (resolve, reject) => {
            const { title, parent_id, userEmail } = {
              title: newData.title,
              parent_id: newData.parent_id,
              userEmail: newData.user ? newData.user.email : null,
            }
            const apiErrors = await addTestCategory(title, parent_id, userEmail, test_category_id)
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
              const { id, title, parent_id, userEmail } = {
                id: newData.id,
                title: newData.title,
                parent_id: newData.parent_id,
                userEmail: newData.user ? newData.user.email : null,
              }
              const apiErrors = await updateTestCategory(id, title, parent_id, userEmail, test_category_id)
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
  testCategories: expertPanelTestCatalogSelectors.getTestCategories(state),
  parentSelect: expertPanelTestCatalogSelectors.getParentSelect(state),
  perPage: appSelectors.getPerPage(state),
})

export default compose(connect(mapStateToProps, {
  updateTestCategory: updateTestCategoryExpertPanel,
  addTestCategory: addTestCategoryExpertPanel,
  deleteTestCategory: deleteTestCategoryExpertPanel,
  changePerPage,
}))(ExpertPanelTestCategoriesTable)