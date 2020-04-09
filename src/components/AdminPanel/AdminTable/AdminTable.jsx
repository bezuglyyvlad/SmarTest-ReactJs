import React from 'react';
import MaterialTable from 'material-table';
import {required} from "../../../utils/validators";
import {compose} from "redux";
import {connect} from "react-redux";
import {addCategory, deleteCategory, updateCategory} from "../../../redux/adminPanelReducer";
import {changePerPage} from "../../../redux/appReducer";
import {adminPanelSelectors} from "../../../redux/selectors/adminPanelSelectors";
import {appSelectors} from "../../../redux/selectors/appSelectors";

const AdminTable = React.memo(({
                                   showError, categories, addCategory, updateCategory,
                                   deleteCategory, perPage, changePerPage
                               }) => {
    const columns = [
        {title: 'Id', field: 'category_id', editable: 'never'},
        {title: 'Название*', field: 'name'},
        {title: 'Электронная почта (Эксперта)', field: 'user.email'},
    ];

    function validateName(name) {
        const requiredError = required(name);
        if (requiredError) {
            showError(["Название обязательно для заполнения."]);
            return false;
        }
        return true;
    }

    function setPerPage(perPage) {
        changePerPage(perPage);
    }

    return (
        <MaterialTable
            title="Категории"
            columns={columns}
            data={categories.categories}
            options={{sorting: true, pageSize: +perPage}}
            onChangeRowsPerPage={setPerPage}
            editable={{
                onRowAdd: newData =>
                    new Promise(async (resolve, reject) => {
                        if (!validateName(newData.name)) {
                            reject();
                        } else {
                            const {name, userEmail} = {
                                name: newData.name,
                                userEmail: newData.user ? newData.user.email : null,
                            };
                            const apiErrors = await addCategory(name, userEmail);
                            if (apiErrors) {
                                showError(apiErrors);
                                reject();
                            }
                        }
                        resolve();
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(async (resolve, reject) => {
                        if (!validateName(newData.name)) {
                            reject();
                        } else {
                            let myOldData = {...oldData};
                            delete myOldData.tableData;
                            if (JSON.stringify(newData) !== JSON.stringify(myOldData)) {
                                const {category_id, name, userEmail} = {
                                    category_id: newData.category_id,
                                    name: newData.name,
                                    userEmail: newData.user ? newData.user.email : null,
                                };
                                const apiErrors = await updateCategory(category_id, name, userEmail);
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
                        await deleteCategory(oldData.category_id);
                        resolve();
                    })
            }}
        />
    );
});

const mapStateToProps = (state) => ({
    categories: adminPanelSelectors.getCategories(state),
    perPage: appSelectors.getPerPage(state),
})

export default compose(connect(mapStateToProps, {
    updateCategory,
    addCategory,
    deleteCategory,
    changePerPage,
}))(AdminTable);