import React from 'react';
import MaterialTable from 'material-table';
import {email, maxLengthCreator, required} from "../../../utils/validators";
import {compose} from "redux";
import {connect} from "react-redux";
import {addCategory, deleteCategory, updateCategory} from "../../../redux/adminPanelReducer";
import {changePerPage} from "../../../redux/appReducer";
import {adminPanelSelectors} from "../../../redux/selectors/adminPanelSelectors";
import {appSelectors} from "../../../redux/selectors/appSelectors";
import {materialTableLocalization} from "../../../utils/localization";

const AdminTable = React.memo(({
                                   showError, categories, addCategory, updateCategory,
                                   deleteCategory, perPage, changePerPage
                               }) => {
    const columns = [
        {title: 'Id', field: 'category_id', editable: 'never'},
        {title: 'Назва*', field: 'name'},
        {title: 'Електронна пошта (Експерта)', field: 'user.email'},
    ];

    function validate(data) {
        let errors = [];
        required(data.name) && errors.push('Назва є обов`язковим для заповнення');
        const maxLengthName = 255;
        maxLengthCreator(maxLengthName)(data.name) && errors.push(`Назва задовга (максимум ${maxLengthName})`);
        const validateEmail = data.user && email(data.user.email);
        validateEmail && errors.push(validateEmail);
        showError(errors);
        return errors.length === 0;
    }

    function setPerPage(perPage) {
        changePerPage(perPage);
    }

    return (
        <MaterialTable
            title="Категорії"
            columns={columns}
            data={categories}
            options={{sorting: true, pageSize: +perPage}}
            localization={materialTableLocalization}
            onChangeRowsPerPage={setPerPage}
            editable={{
                onRowAdd: newData =>
                    new Promise(async (resolve, reject) => {
                        if (!validate(newData)) {
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
                        if (!validate(newData)) {
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