import { memo } from 'react';
import {adminPanelValidate} from "../../../utils/validators";
import {compose} from "redux";
import {connect} from "react-redux";
import {addTestCategory, deleteTestCategory, updateTestCategory} from "../../../redux/adminPanelReducer";
import {changePerPage} from "../../../redux/appReducer";
import {adminPanelSelectors} from "../../../redux/selectors/adminPanelSelectors";
import {appSelectors} from "../../../redux/selectors/appSelectors";
import {materialTableLocalization} from "../../../utils/localization";
import MaterialTable from "material-table";

const AdminPanelTable = memo(({
                                   showError, testCategories, addTestCategory, updateTestCategory,
                                   deleteTestCategory, perPage, changePerPage
                               }) => {
    const columns = [
        {
            title: '№',
            field: 'tableData.id',
            editable: 'never',
            emptyValue: null,
            render: rowData => rowData.tableData.id + 1
        },
        {title: 'Назва*', field: 'title'},
        {title: 'Електронна пошта (Експерта)', field: 'user.email'},
    ];

    function setPerPage(perPage) {
        changePerPage(perPage);
    }

    return (
        <MaterialTable
            title="Категорії"
            columns={columns}
            data={testCategories}
            options={{sorting: true, pageSize: +perPage}}
            localization={materialTableLocalization}
            onChangeRowsPerPage={setPerPage}
            editable={{
                onRowAdd: newData =>
                    new Promise(async (resolve, reject) => {
                        if (!adminPanelValidate(newData, showError)) {
                            reject();
                        } else {
                            const {name, userEmail} = {
                                name: newData.name,
                                userEmail: newData.user ? newData.user.email : null,
                            };
                            const apiErrors = await addTestCategory(name, userEmail);
                            if (apiErrors) {
                                showError(apiErrors);
                                reject();
                            }
                        }
                        resolve();
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(async (resolve, reject) => {
                        if (!adminPanelValidate(newData, showError)) {
                            reject();
                        } else {
                            let myOldData = {...oldData};
                            delete myOldData.tableData;
                            if (JSON.stringify(newData) !== JSON.stringify(myOldData)) {
                                const {test_category_id, name, userEmail} = {
                                    test_category_id: newData.category_id,
                                    name: newData.name,
                                    userEmail: newData.user ? newData.user.email : null,
                                };
                                const apiErrors = await updateTestCategory(test_category_id, name, userEmail);
                                if (apiErrors) {
                                    showError(apiErrors);
                                    reject();
                                }
                            }
                        }
                        resolve();
                    }),
                onRowDelete: oldData =>
                    new Promise(async (resolve, reject) => {
                        await deleteTestCategory(oldData.test_category_id);
                        resolve();
                    })
            }}
        />
    );
});

const mapStateToProps = (state) => ({
    testCategories: adminPanelSelectors.getCategories(state),
    perPage: appSelectors.getPerPage(state),
})

export default compose(connect(mapStateToProps, {
    updateTestCategory,
    addTestCategory,
    deleteTestCategory,
    changePerPage,
}))(AdminPanelTable);