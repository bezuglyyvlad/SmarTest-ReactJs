import React from 'react';
import MaterialTable from 'material-table';
import {materialTableLocalization} from "../../../utils/localization";
import {compose} from "redux";
import {connect} from "react-redux";
import {expertQuestionEditSelectors} from "../../../redux/selectors/expertQuestionEditSelectors";
import {addAnswer, deleteAnswer, updateAnswer} from "../../../redux/expertQuestionEditReducer";

const ExpertAnswersTable = React.memo(({answers, showError, addAnswer, question_id, updateAnswer, deleteAnswer}) => {
    const columns = [
        {title: 'Текст', field: 'text'},
        {title: 'Є вірною', field: 'is_right', lookup: {0: 'Ні', 1: 'Так'}, initialEditValue: 0},
    ];

    const validate = (answers) => {
        let errors = [];
        answers.length < 2 && errors.push('Кількість відповідей не може бути менше 2.');
        answers.filter(i => i.is_right === '1' || i.is_right === 1).length === 0 && errors.push('Хоча б одна відповідь повинна бути вірною.');
        showError(errors);
        return errors.length === 0;
    }

    return (
        <MaterialTable
            title="Відповіді"
            columns={columns}
            data={answers}
            options={{sorting: true, paging: false}}
            localization={materialTableLocalization}
            editable={{
                onRowAdd: (newData) =>
                    new Promise(async (resolve, reject) => {
                        const resultData = [...answers, newData];

                        if (!validate(resultData)) {
                            reject();
                        } else {
                            await addAnswer({...newData, question_id});
                            resolve();
                        }
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(async (resolve, reject) => {
                        const resultData = [...answers];
                        resultData[resultData.indexOf(oldData)] = newData;

                        if (!validate(resultData)) {
                            reject();
                        } else {
                            let myOldData = {...oldData};
                            delete myOldData.tableData;
                            if (JSON.stringify(newData) !== JSON.stringify(myOldData)) {
                                await updateAnswer(newData);
                            }
                            resolve();
                        }
                    }),
                onRowDelete: (oldData) =>
                    new Promise(async (resolve, reject) => {
                        const resultData = [...answers];
                        resultData.splice(resultData.indexOf(oldData), 1);

                        if (!validate(resultData)) {
                            reject();
                        } else {
                            await deleteAnswer(oldData.answer_id, oldData.question_id);
                            resolve();
                        }
                    }),
            }}
        />
    );
});

const mapStateToProps = (state) => ({
    answers: expertQuestionEditSelectors.getAnswers(state),
})

export default compose(connect(mapStateToProps, {addAnswer, updateAnswer, deleteAnswer}))(ExpertAnswersTable);