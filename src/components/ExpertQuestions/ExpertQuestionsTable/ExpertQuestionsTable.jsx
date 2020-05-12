import React from 'react';
import MaterialTable from 'material-table';
import {compose} from "redux";
import {connect} from "react-redux";
import {changePerPage} from "../../../redux/appReducer";
import {appSelectors} from "../../../redux/selectors/appSelectors";
import {materialTableLocalization} from "../../../utils/localization";
import {expertQuestionsSelectors} from "../../../redux/selectors/expertQuestionsSelectors";
import {deleteQuestion} from "../../../redux/expertQuestionsReducer";

const ExpertQuestionsTable = React.memo(({
                                             perPage, changePerPage,
                                             questions, history, category_id, subcategory_id, deleteQuestion
                                         }) => {
    const columns = [
        {title: 'Id', field: 'question_id', editable: 'never'},
        {title: 'Текст', field: 'text'},
        {title: 'Складність', field: 'lvl', lookup: {1: 'Легкий', 2: 'Середній', 3: 'Складний'}},
        {title: 'Кількість відповідей', field: 'type', lookup: {1: 'Одна', 2: 'Декілька'}},
        {title: 'Опис', field: 'description'},
    ];

    function setPerPage(perPage) {
        changePerPage(perPage);
    }

    return (
        <MaterialTable
            title="Питання"
            columns={columns}
            data={questions}
            options={{sorting: true, pageSize: +perPage}}
            localization={materialTableLocalization}
            onChangeRowsPerPage={setPerPage}
            editable={{
                onRowDelete: oldData =>
                    new Promise(async (resolve, reject) => {
                        await deleteQuestion(oldData.question_id, subcategory_id);
                        resolve();
                    })
            }}
            actions={[
                {
                    icon: 'add',
                    tooltip: 'Додати',
                    isFreeAction: true,
                    onClick: event => history.push(`/expertPanel/${category_id}/${subcategory_id}/add`)
                },
                {
                    icon: 'edit',
                    tooltip: 'Редагувати',
                    onClick: (event, rowData) =>
                        history.push(`/expertPanel/${category_id}/${subcategory_id}/edit/${rowData.question_id}`)
                }
            ]}
        />
    );
});

const mapStateToProps = (state) => ({
    questions: expertQuestionsSelectors.getTests(state),
    perPage: appSelectors.getPerPage(state),
})

export default compose(connect(mapStateToProps, {changePerPage, deleteQuestion}))(ExpertQuestionsTable);