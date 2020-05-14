import React from 'react';
import MaterialTable from 'material-table';
import {materialTableLocalization} from "../../../utils/localization";

const ExpertAnswerAddTable = React.memo(({answers, setAnswers}) => {
    const columns = [
        {title: 'Текст', field: 'text'},
        {title: 'Є вірною', field: 'is_right', lookup: {0: 'Ні', 1: 'Так'}, initialEditValue: 0},
    ];

    return (
        <MaterialTable
            title="Відповіді"
            columns={columns}
            data={answers}
            options={{sorting: true, paging: false}}
            localization={materialTableLocalization}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setAnswers((prevState) => {
                                return [...prevState, newData];
                            });
                        }, 100);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setAnswers((prevState) => {
                                    const data = [...prevState];
                                    data[data.indexOf(oldData)] = newData;
                                    return data;
                                });
                            }
                        }, 100);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setAnswers((prevState) => {
                                const data = [...prevState];
                                data.splice(data.indexOf(oldData), 1);
                                return data;
                            });
                        }, 100);
                    }),
            }}
        />
    );
});

export default ExpertAnswerAddTable;