import React from 'react';
import MaterialTable from 'material-table';
import {compose} from "redux";
import {connect} from "react-redux";
import {changePerPage} from "../../../redux/appReducer";
import {appSelectors} from "../../../redux/selectors/appSelectors";
import {materialTableLocalization} from "../../../utils/localization";
import {expertPanelTestStatisticsSelectors} from "../../../redux/selectors/expertPanelTestStatisticsSelectors";

const ExpertPanelTestStatisticsTable = React.memo(({
                                                  perPage, changePerPage, tests,
                                              }) => {
    const columns = [
        {
            title: '№',
            field: 'tableData.id',
            editable: 'never',
            emptyValue: null,
            render: rowData => rowData.tableData.id + 1
        },
        {title: "Ім'я користувача", field: 'user.name'},
        {title: 'Електронна пошта', field: 'user.email'},
        {
            title: 'Початок тесту',
            field: 'date_start',
            render: rowData => (new Date(rowData.date_start)).toLocaleString()
        },
        {
            title: 'Завершення тесту',
            field: 'date_finish',
            render: rowData => (new Date(rowData.date_finish)).toLocaleString()
        },
        {title: 'Бали', field: 'score'}
    ];

    function setPerPage(perPage) {
        changePerPage(perPage);
    }

    return (
        <MaterialTable
            title="Результати"
            columns={columns}
            data={tests}
            options={{sorting: true, pageSize: +perPage}}
            localization={materialTableLocalization}
            onChangeRowsPerPage={setPerPage}
        />
    );
});

const mapStateToProps = (state) => ({
    tests: expertPanelTestStatisticsSelectors.getTests(state),
    perPage: appSelectors.getPerPage(state),
})

export default compose(connect(mapStateToProps, {changePerPage}))(ExpertPanelTestStatisticsTable);