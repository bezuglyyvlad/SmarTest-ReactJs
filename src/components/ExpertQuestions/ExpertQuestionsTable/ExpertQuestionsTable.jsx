import React from 'react';
import MaterialTable, {MTableAction} from 'material-table';
import {compose} from "redux";
import {connect} from "react-redux";
import {changePerPage} from "../../../redux/appReducer";
import {appSelectors} from "../../../redux/selectors/appSelectors";
import {materialTableLocalization} from "../../../utils/localization";
import {expertQuestionsSelectors} from "../../../redux/selectors/expertQuestionsSelectors";
import {deleteQuestion, importQuestions} from "../../../redux/expertQuestionsReducer";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {Box, Tooltip} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import {getFormData, importAcceptTypes} from "../../../utils/utils";
import {importQuestionsValidate} from "../../../utils/validators";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles(theme => ({
    input: {
        display: 'none'
    },
    importButton: {
        color: 'inherit',
    }
}));

const ExpertQuestionsTable = React.memo(({
                                             perPage, changePerPage,
                                             questions, history, category_id, subcategory_id,
                                             deleteQuestion, showError, importQuestions,
                                             exportQuestionsAction, disableExport
                                         }) => {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);

    const columns = [
        {title: '№', field: 'tableData.id', editable: 'never', render: rowData => rowData.tableData.id + 1},
        {title: 'Текст', field: 'text'},
        {title: 'Складність', field: 'lvl', lookup: {1: 'Легкий', 2: 'Середній', 3: 'Складний'}},
        {title: 'Тип', field: 'type', lookup: {1: 'Одиночний', 2: 'Множинний'}},
        {title: 'Опис', field: 'description'},
    ];

    function setPerPage(perPage) {
        changePerPage(perPage);
    }

    const onUploadChange = async (e) => {
        const files = e.target.files;
        if (files.length && importQuestionsValidate(files[0], showError)) {
            const formData = new FormData();
            getFormData(formData, {'import': files[0], subcategory_id});
            setLoading(true);
            await importQuestions(formData, subcategory_id);
            setLoading(false);
        }
    }

    return (
        <Box>
            <MaterialTable
                title="Питання"
                columns={columns}
                data={questions}
                options={{sorting: true, pageSize: +perPage}}
                localization={materialTableLocalization}
                onChangeRowsPerPage={setPerPage}
                isLoading={loading}
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
                    },
                    {
                        icon: () => {
                        },
                        tooltip: 'Імпорт',
                        isFreeAction: true,
                        onClick: event => {
                        }
                    },
                    {
                        icon: () => <CloudDownloadIcon/>,
                        tooltip: 'Експорт',
                        isFreeAction: true,
                        disabled: disableExport,
                        hidden: questions.length === 0,
                        onClick: event => {
                            exportQuestionsAction()
                        }
                    },
                    {
                        icon: () => <InfoIcon/>,
                        tooltip: 'Документація для створення XML-файла',
                        isFreeAction: true,
                        onClick: event => history.push(`/documentation/xml`)
                    },
                ]}
                components={{
                    Action: props => {
                        if (props.action.tooltip === 'Імпорт') {
                            return <label htmlFor="import">
                                <Tooltip title={props.action.tooltip}>
                                    <IconButton aria-label="upload image" component="span"
                                                classes={{root: classes.importButton}}>
                                        <CloudUploadIcon/>
                                    </IconButton>
                                </Tooltip>
                            </label>;
                        } else {
                            return <MTableAction {...props}/>
                        }
                    }
                }}
            />
            <input accept={importAcceptTypes} className={classes.input} id="import" type="file"
                   onChange={onUploadChange}/>
        </Box>
    );
});

const mapStateToProps = (state) => ({
    questions: expertQuestionsSelectors.getQuestions(state),
    perPage: appSelectors.getPerPage(state),
})

export default compose(connect(mapStateToProps, {
    changePerPage,
    deleteQuestion,
    importQuestions,
}))(ExpertQuestionsTable);