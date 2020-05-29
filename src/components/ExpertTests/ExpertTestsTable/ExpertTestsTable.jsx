import React from 'react';
import MaterialTable from 'material-table';
import {compose} from "redux";
import {connect} from "react-redux";
import {changePerPage} from "../../../redux/appReducer";
import {appSelectors} from "../../../redux/selectors/appSelectors";
import {materialTableLocalization} from "../../../utils/localization";
import {expertTestsSelectors} from "../../../redux/selectors/expertTestsSelectors";
import {expertTestsValidate} from "../../../utils/validators";
import {addTest, deleteTest, updateTest} from "../../../redux/expertTestsReducer";

const ExpertTestsTable = React.memo(({
                                         perPage, changePerPage, rowClick,
                                         tests, showError, category_id, addTest, updateTest, deleteTest
                                     }) => {
    const columns = [
        {title: '№', field: 'tableData.id', editable: 'never', render: rowData => rowData.tableData.id + 1},
        {title: 'Назва*', field: 'name'},
        {title: 'Час* (в хвилинах)', field: 'time', type: 'numeric'},
        {title: 'Кількість питань*', field: 'count_of_questions', type: 'numeric'},
        {title: 'Доступ*', field: 'is_open', lookup: {0: 'Закритий', 1: 'Відкритий'}, initialEditValue: 0},
    ];

    function setPerPage(perPage) {
        changePerPage(perPage);
    }

    return (
        <MaterialTable
            title="Тести"
            columns={columns}
            data={tests}
            options={{sorting: true, pageSize: +perPage}}
            localization={materialTableLocalization}
            onChangeRowsPerPage={setPerPage}
            onRowClick={rowClick}
            editable={{
                onRowAdd: newData =>
                    new Promise(async (resolve, reject) => {
                        if (!expertTestsValidate(newData, showError)) {
                            reject();
                        } else {
                            const apiErrors = await addTest({category_id, ...newData});
                            if (apiErrors) {
                                showError(apiErrors);
                                reject();
                            }
                        }
                        resolve();
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(async (resolve, reject) => {
                        if (!expertTestsValidate(newData, showError)) {
                            reject();
                        } else {
                            let myOldData = {...oldData};
                            delete myOldData.tableData;
                            if (JSON.stringify(newData) !== JSON.stringify(myOldData)) {
                                const apiErrors = await updateTest(newData);
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
                        await deleteTest(oldData.subcategory_id, oldData.category_id);
                        resolve();
                    })
            }}
        />
    );
});

const mapStateToProps = (state) => ({
    tests: expertTestsSelectors.getTests(state),
    perPage: appSelectors.getPerPage(state),
})

export default compose(connect(mapStateToProps, {changePerPage, addTest, updateTest, deleteTest}))(ExpertTestsTable);