import { memo } from 'react'
import MaterialTable from 'material-table'
import { materialTableLocalization } from '../../../utils/localization'
import { compose } from 'redux'
import { connect } from "react-redux"
import { expertPanelQuestionEditSelectors } from "../../../redux/selectors/expertPanelQuestionEditSelectors"
import { addAnswer, deleteAnswer, updateAnswer } from "../../../redux/expertPanelQuestionEditReducer"
import { answerValidation } from "../../../utils/validators";
import { validationErrorHandler } from "../../../utils/utils";

const ExpertPanelAnswersTable = memo(({ answers, showError, addAnswer, question_id, updateAnswer, deleteAnswer }) => {
  const columns = [
    { title: 'Текст*', field: 'text' },
    { title: 'Є вірною*', field: 'is_correct', lookup: { 0: 'Ні', 1: 'Так' }, initialEditValue: 0 },
  ]

  const validate = (answers) => {
    let errors = []
    errors = answerValidation(answers, errors)
    showError(errors)
    return errors.length === 0
  }

  return (
    <MaterialTable
      title="Відповіді"
      columns={columns}
      data={answers}
      options={{ sorting: true, paging: false }}
      localization={materialTableLocalization}
      editable={{
        onRowAdd: (newData) =>
          new Promise(async (resolve, reject) => {
            const resultData = [...answers, newData]

            if (!validate(resultData)) {
              reject()
            } else {
              await addAnswer({ ...newData, question_id })
                .then(() => {
                  resolve()
                })
                .catch((e) => {
                  const errors = validationErrorHandler(e)
                  showError(errors)
                  reject()
                })
            }
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(async (resolve, reject) => {
            const resultData = [...answers]
            resultData[resultData.indexOf(oldData)] = newData

            if (!validate(resultData)) {
              reject()
            } else {
              let myOldData = { ...oldData }
              delete myOldData.tableData
              if (JSON.stringify(newData) !== JSON.stringify(myOldData)) {
                await updateAnswer(newData)
                  .catch((e) => {
                    const errors = validationErrorHandler(e)
                    showError(errors)
                    reject()
                  })
              }
              resolve()
            }
          }),
        onRowDelete: (oldData) =>
          new Promise(async (resolve, reject) => {
            const resultData = [...answers]
            resultData.splice(resultData.indexOf(oldData), 1)

            if (!validate(resultData)) {
              reject()
            } else {
              await deleteAnswer(oldData.id)
                .catch((e) => {
                  const errors = validationErrorHandler(e)
                  showError(errors)
                })
              resolve()
            }
          }),
      }}
    />
  )
})

const mapStateToProps = (state) => ({
  answers: expertPanelQuestionEditSelectors.getAnswers(state),
})

export default compose(connect(mapStateToProps, { addAnswer, updateAnswer, deleteAnswer }))(ExpertPanelAnswersTable)
