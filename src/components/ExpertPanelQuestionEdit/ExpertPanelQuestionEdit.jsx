import { memo, useState, useEffect } from 'react'
import { Box, Container, Link, makeStyles, Typography } from "@material-ui/core"
import { compose } from "redux"
import { withUnAuthRedirect } from "../../hoc/withUnAuthRedirect"
import { connect } from "react-redux"
import { Preloader } from "../common/Preloader"
import { withNotExpertRedirect } from "../../hoc/withNotExpertRedirect"
import { NavLink } from "react-router-dom"
import { withRouter } from "react-router"
import ExpertQuestionForm from "../common/ExpertQuestionForm/ExpertQuestionForm"
import {
  deleteQuestionImage,
  editQuestion,
  getExpertAnswers,
  getExpertQuestion,
  uploadQuestionImage
} from "../../redux/expertPanelQuestionEditReducer"
import { expertPanelQuestionEditSelectors } from "../../redux/selectors/expertPanelQuestionEditSelectors"
import ExpertAnswersTable from "./ExpertPanelAnswersTable/ExpertPanelAnswersTable"
import { uploadImageQuestionValidate } from "../../utils/validators"
import { getFormData, validationErrorHandler } from "../../utils/utils"
import ImageBox, { UploadBox } from "../common/UIElements"
import { useSnackbar } from "notistack"
import { getExpertPanelBreadcrumbs } from "../../redux/expertPanelBreadcrumbsReducer";
import ExpertPanelTestCategoryBreadcrumbs from "../common/ExpertPanel/ExpertPanelTestCategoryBreadcrumbs";
import { expertPanelBreadcrumbsSelectors } from "../../redux/selectors/expertPanelBreadcrumbsSelectors";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
  },
  table: {
    marginTop: theme.spacing(2),
  },
}))

const ExpertPanelQuestionEdit = memo(({
                                        match,
                                        history,
                                        location,
                                        breadcrumbs,
                                        expertTestName,
                                        question,
                                        getExpertPanelBreadcrumbs,
                                        getExpertQuestion,
                                        getExpertAnswers,
                                        uploadQuestionImage,
                                        deleteQuestionImage,
                                        editQuestion
                                      }) => {
  const classes = useStyles()
  const [showPreloader, setShowPreloader] = useState(true)
  const [questionId, setQuestionId] = useState(match.params.question_id)
  const [initialQuestionId] = useState(match.params.question_id)
  const { enqueueSnackbar } = useSnackbar()

  const test_category_id = match.params.test_category_id
  const expert_test_id = match.params.expert_test_id

  useEffect(() => {
    let mounted = true; // exclude memory leak
    (async () => {
      setShowPreloader(true)
      await getExpertPanelBreadcrumbs(test_category_id, expert_test_id)
      await getExpertQuestion(initialQuestionId)
      await getExpertAnswers(initialQuestionId)
      mounted && setShowPreloader(false)
    })()
    return () => mounted = false
  }, [expert_test_id, getExpertAnswers, getExpertPanelBreadcrumbs, getExpertQuestion, initialQuestionId, test_category_id])

  useEffect(() => {
    let mounted = true; // exclude memory leak
    if (question && question.id !== +questionId) {
      const pathNameParts = location.pathname.split('/')
      pathNameParts[pathNameParts.length - 1] = question.id
      const newPathname = pathNameParts.join('/')
      history.push(newPathname)
      mounted && setQuestionId(question.id)
    }
    return () => mounted = false
  }, [history, location.pathname, question, questionId])

  if (showPreloader) {
    return <Preloader />
  }

  function showError (array) {
    array.forEach(item => {
      enqueueSnackbar(item, { variant: "error" })
    })
  }

  const onSubmit = async (formikData, setSubmitting, formIsMounted) => {
    setSubmitting(true)
    await editQuestion(formikData, questionId)
      .catch((e) => {
        const errors = validationErrorHandler(e)
        showError(errors)
      })
    formIsMounted.current && setSubmitting(false)
  }

  const onUploadChange = (e) => {
    const files = e.target.files
    if (files.length && uploadImageQuestionValidate(files[0], showError)) {
      const formData = new FormData()
      getFormData(formData, { image: files[0] })
      uploadQuestionImage(formData, questionId)
        .catch((e) => {
          const errors = validationErrorHandler(e)
          showError(errors)
        })
    }
  }

  return (
    <Container component="main" maxWidth="lg" className={classes.root}>
      {
        breadcrumbs &&
        <ExpertPanelTestCategoryBreadcrumbs breadcrumbs={breadcrumbs}>
          <Link color='inherit' component={NavLink}
                to={`/expertPanel/${test_category_id}/${expert_test_id}`}>
            {expertTestName}
          </Link>
          <Typography color="textPrimary">Редагування питання</Typography>
        </ExpertPanelTestCategoryBreadcrumbs>
      }
      <Container component='main'>
        {question.image &&
        <ImageBox imageSrc={question.image} />}
        <UploadBox onUploadChange={onUploadChange} image={false} setImage={() => {
        }} visibleDelete={!!question.image} deleteAction={() => {
          deleteQuestionImage(questionId)
            .catch((e) => {
              const errors = validationErrorHandler(e)
              showError(errors)
            })
        }} />
        <ExpertQuestionForm onSubmit={onSubmit} initialValues={{
          text: question.text,
          description: question.description ?? '',
          complexity: question.complexity,
          significance: question.significance,
          relevance: question.relevance,
          type: question.type
        }} />
        <Box className={classes.table}>
          <ExpertAnswersTable showError={showError} question_id={questionId} />
        </Box>
      </Container>
    </Container>
  )
})

const mapStateToProps = (state) => ({
  breadcrumbs: expertPanelBreadcrumbsSelectors.getBreadcrumbs(state),
  expertTestName: expertPanelBreadcrumbsSelectors.getExpertTestName(state),
  question: expertPanelQuestionEditSelectors.getQuestion(state),
})

export default compose(withUnAuthRedirect, withNotExpertRedirect, withRouter, connect(mapStateToProps, {
  getExpertPanelBreadcrumbs,
  getExpertQuestion,
  getExpertAnswers,
  uploadQuestionImage,
  deleteQuestionImage,
  editQuestion,
}))(ExpertPanelQuestionEdit)
