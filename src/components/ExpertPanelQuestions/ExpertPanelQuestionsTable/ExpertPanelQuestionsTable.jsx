import React, { memo, useState } from 'react'
import MaterialTable, { MTableAction } from 'material-table'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { changePerPage } from '../../../redux/appReducer'
import { appSelectors } from '../../../redux/selectors/appSelectors'
import { materialTableLocalization } from '../../../utils/localization'
import { expertPanelQuestionsSelectors } from '../../../redux/selectors/expertPanelQuestionsSelectors'
import { deleteQuestion, importQuestions } from '../../../redux/expertPanelQuestionsReducer'
import { Box, IconButton, makeStyles, Tooltip } from '@material-ui/core'
import { getFormData, importAcceptTypes, validationErrorHandler } from '../../../utils/utils'
import { importQuestionsValidate } from '../../../utils/validators'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import InfoIcon from '@material-ui/icons/Info'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

const useStyles = makeStyles(theme => ({
  input: {
    display: 'none'
  },
  importButton: {
    color: 'inherit',
  }
}))

const ExpertPanelQuestionsTable = memo(({
                                          perPage, changePerPage,
                                          questions, history, test_category_id, expert_test_id,
                                          deleteQuestion, showError, importQuestions,
                                          exportQuestionsAction, disableExport
                                        }) => {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)

  const columns = [
    {
      title: '№',
      field: 'tableData.id',
      editable: 'never',
      render: rowData => rowData.tableData.id + 1
    },
    { title: 'Ідентифікатор', field: 'id' },
    { title: 'Текст', field: 'text' },
    { title: 'Складність', field: 'condComplexity', lookup: { 1: 'Низька', 2: 'Середня', 3: 'Висока' } },
    { title: 'Тип', field: 'type', lookup: { 1: 'Одиночний', 2: 'Множинний' } },
    { title: 'Опис', field: 'description' },
  ]

  function setPerPage (perPage) {
    changePerPage(perPage)
  }

  const onUploadChange = async (e) => {
    const files = e.target.files
    if (files.length && importQuestionsValidate(files[0], showError)) {
      const formData = new FormData()
      getFormData(formData, { 'importFile': files[0], expert_test_id })
      setLoading(true)
      await importQuestions(formData, expert_test_id)
        .catch((e) => {
          const errors = validationErrorHandler(e)
          showError(errors)
        })
      setLoading(false)
    }
  }

  return (
    <Box>
      <MaterialTable
        title='Питання'
        columns={columns}
        data={questions}
        options={{ sorting: true, pageSize: +perPage }}
        localization={materialTableLocalization}
        onChangeRowsPerPage={setPerPage}
        isLoading={loading}
        editable={{
          onRowDelete: oldData =>
            new Promise(async (resolve, reject) => {
              await deleteQuestion(oldData.id)
                .catch((e) => {
                  const errors = validationErrorHandler(e)
                  showError(errors)
                })
              resolve()
            })
        }}
        actions={[
          {
            icon: 'add',
            tooltip: 'Додати',
            isFreeAction: true,
            onClick: event => history.push(`/expertPanel/${test_category_id}/${expert_test_id}/add`)
          },
          {
            icon: 'edit',
            tooltip: 'Редагувати',
            onClick: (event, rowData) =>
              history.push(`/expertPanel/${test_category_id}/${expert_test_id}/edit/${rowData.id}`)
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
            icon: () => <CloudDownloadIcon />,
            tooltip: 'Експорт',
            isFreeAction: true,
            disabled: disableExport,
            hidden: questions.length === 0,
            onClick: event => {
              exportQuestionsAction()
            }
          },
          {
            icon: () => <InfoIcon />,
            tooltip: 'Документація для створення XML-файла',
            isFreeAction: true,
            onClick: event => history.push(`/documentation/xml`)
          },
        ]}
        components={{
          Action: props => {
            if (props.action.tooltip === 'Імпорт') {
              return <label htmlFor='import'>
                <Tooltip title={props.action.tooltip}>
                  <IconButton aria-label='upload image' component='span'
                              classes={{ root: classes.importButton }}>
                    <CloudUploadIcon />
                  </IconButton>
                </Tooltip>
              </label>
            } else {
              return <MTableAction {...props} />
            }
          }
        }}
      />
      <input accept={importAcceptTypes} className={classes.input} id='import' type='file'
             onChange={onUploadChange} />
    </Box>
  )
})

const mapStateToProps = (state) => ({
  questions: expertPanelQuestionsSelectors.getQuestions(state),
  perPage: appSelectors.getPerPage(state),
})

export default compose(connect(mapStateToProps, {
  changePerPage,
  deleteQuestion,
  importQuestions,
}))(ExpertPanelQuestionsTable)
