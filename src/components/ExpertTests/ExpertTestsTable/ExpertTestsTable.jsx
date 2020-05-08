import React from 'react';
import MaterialTable from 'material-table';
import {compose} from "redux";
import {connect} from "react-redux";
import {changePerPage} from "../../../redux/appReducer";
import {appSelectors} from "../../../redux/selectors/appSelectors";
import {materialTableLocalization} from "../../../utils/localization";
import {expertCategoriesSelectors} from "../../../redux/selectors/expertTestsSelectors";
import {
    maxLengthCreator,
    maxNumberCreator,
    minNumberCreator,
    required
} from "../../../utils/validators";
import {addTest, deleteTest, updateTest} from "../../../redux/expertTestsReducer";

const ExpertTestsTable = React.memo(({
                                         perPage, changePerPage, rowClick,
                                         tests, showError, category_id, addTest, updateTest, deleteTest
                                     }) => {
    const columns = [
        {title: 'Id', field: 'subcategory_id', editable: 'never'},
        {title: 'Назва*', field: 'name'},
        {title: 'Час* (в хвилинах)', field: 'time', type: 'numeric'},
        {title: 'Кількість питань*', field: 'count_of_questions', type: 'numeric'},
        {title: 'Доступ*', field: 'is_open', lookup: {0: 'Закритий', 1: 'Відкритий'}, initialEditValue: 0},
    ];

    function validate(data) {
        let errors = [];
        required(data.name) && errors.push('Назва є обов`язковим для заповнення');
        required(data.time) && errors.push('Час є обов`язковим для заповнення');
        required(data.count_of_questions) && errors.push('Кількість питань є обов`язковим для заповнення');
        const maxLengthName = 255;
        const minLenghtTime = 1;
        const maxLenghtTime = 1440;
        const minLenghtQues = 5;
        const maxLenghtQues = 500;
        maxLengthCreator(maxLengthName)(data.name) && errors.push(`Назва задовга (максимум ${maxLengthName})`);
        minNumberCreator(minLenghtTime)(data.time) && errors.push(`Час може бути мінімум ${minLenghtTime}`);
        maxNumberCreator(maxLenghtTime)(data.time) && errors.push(`Час може бути максимум ${maxLenghtTime}`);
        minNumberCreator(minLenghtQues)(data.count_of_questions) && errors.push(`Кількість питань може бути мінімум ${minLenghtQues}`);
        maxNumberCreator(maxLenghtQues)(data.count_of_questions) && errors.push(`Кількість питань може бути максимум ${maxLenghtQues}`);
        showError(errors);
        return errors.length === 0;
    }

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
                        if (!validate(newData)) {
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
                        if (!validate(newData)) {
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
    tests: expertCategoriesSelectors.getTests(state),
    perPage: appSelectors.getPerPage(state),
})

export default compose(connect(mapStateToProps, {changePerPage, addTest, updateTest, deleteTest}))(ExpertTestsTable);