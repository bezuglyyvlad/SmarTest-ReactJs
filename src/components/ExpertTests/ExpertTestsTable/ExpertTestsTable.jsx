import React from 'react';
import MaterialTable from 'material-table';
import {compose} from "redux";
import {connect} from "react-redux";
import {changePerPage} from "../../../redux/appReducer";
import {appSelectors} from "../../../redux/selectors/appSelectors";
import {materialTableLocalization} from "../../../utils/localization";
import {expertCategoriesSelectors} from "../../../redux/selectors/expertTestsSelectors";

const ExpertTestsTable = React.memo(({perPage, changePerPage, rowClick, tests}) => {
    const columns = [
        {title: 'Id', field: 'subcategory_id', editable: 'never'},
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
                        //request
                        console.log('Add');
                        resolve();
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(async (resolve, reject) => {
                        //request
                        console.log('Update');
                        resolve();
                    }),
                onRowDelete: oldData =>
                    new Promise(async (resolve, reject) => {
                        //request
                        console.log('Delete');
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

export default compose(connect(mapStateToProps, {changePerPage}))(ExpertTestsTable);