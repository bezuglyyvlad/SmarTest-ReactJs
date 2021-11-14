import { memo, useState, useEffect } from 'react'
import { Box, Breadcrumbs, Container, Link, makeStyles, Typography } from "@material-ui/core"
import { compose } from "redux"
import { withUnAuthRedirect } from "../../hoc/withUnAuthRedirect"
import { connect } from "react-redux"
import { Preloader } from "../common/Preloader"
import { withNotExpertRedirect } from "../../hoc/withNotExpertRedirect"
import { NavLink } from "react-router-dom"
import { withRouter } from "react-router"
import { testCategorySelectors } from "../../redux/selectors/testCategorySelectors"
import { expertTestSelectors } from "../../redux/selectors/expertTestSelectors"
import { getTestCategory } from "../../redux/testCategoryReducer"
import { getExpertTest } from "../../redux/expertTestReducer"
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
import { getFormData } from "../../utils/utils"
import ImageBox, { UploadBox } from "../common/UIElements"
import { useSnackbar } from "notistack"

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
                                        match, getTestCategory, getExpertTest,
                                        testCategoryName, expertTestName, getExpertQuestion, question, editQuestion,
                                        getExpertAnswers, uploadQuestionImage, deleteQuestionImage
                                      }) => {
  const classes = useStyles()
  const [showPreloader, setShowPreloader] = useState(true)
  const { enqueueSnackbar } = useSnackbar()

  const test_category_id = match.params.test_category_id
  const expert_test_id = match.params.expert_test_id
  const question_id = match.params.question_id

  useEffect(() => {
    let mounted = true; // exclude memory leak
    (async () => {
      setShowPreloader(true)
      await getTestCategory(test_category_id)
      await getExpertTest(expert_test_id)
      await getExpertQuestion(question_id)
      await getExpertAnswers(question_id)
      mounted && setShowPreloader(false)
    })()
    return () => mounted = false
  }, [test_category_id, getTestCategory, getExpertAnswers, getExpertQuestion, getExpertTest, question_id, expert_test_id])

  if (showPreloader) {
    return <Preloader />
  }

  function showError (array) {
    array.forEach(item => {
      enqueueSnackbar(item, { variant: "error" })
    })
  }

  const onSubmit = (data) => {
    editQuestion(data, question_id)
  }

  const onUploadChange = (e) => {
    const files = e.target.files
    if (files.length && uploadImageQuestionValidate(files[0], showError)) {
      const formData = new FormData()
      getFormData(formData, { image: files[0] })
      uploadQuestionImage(formData, question_id)
    }
  }

  return (
    <Container component="main" maxWidth="lg" className={classes.root}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" component={NavLink} to='/expertPanel'>
          Expert панель
        </Link>
        <Link color="inherit" component={NavLink} to={`/expertPanel/${test_category_id}`}>
          {testCategoryName}
        </Link>
        <Link color="inherit" component={NavLink} to={`/expertPanel/${test_category_id}/${expert_test_id}`}>
          {expertTestName}
        </Link>
        <Typography color="textPrimary">Редагування питання</Typography>
      </Breadcrumbs>
      <Container component='main'>
        {question.image &&
        <ImageBox imageSrc={question.image} />}
        <UploadBox onUploadChange={onUploadChange} image={false} setImage={() => {
        }} visibleDelete={!!question.image} deleteAction={() => {
          deleteQuestionImage(question_id)
        }} />
        <ExpertQuestionForm onSubmit={onSubmit}
                            initialValues={{
                              text: question.text,
                              description: question.description,
                              lvl: question.lvl,
                              type: question.type
                            }} />
        <Box className={classes.table}>
          <ExpertAnswersTable showError={showError} question_id={question_id} />
        </Box>
      </Container>
    </Container>
  )
})

const mapStateToProps = (state) => ({
  testCategoryName: testCategorySelectors.getName(state),
  expertTestName: expertTestSelectors.getName(state),
  question: expertPanelQuestionEditSelectors.getQuestion(state),
})

export default compose(withUnAuthRedirect, withNotExpertRedirect, withRouter, connect(mapStateToProps, {
  getTestCategory,
  getExpertTest,
  getExpertQuestion,
  uploadQuestionImage,
  deleteQuestionImage,
  editQuestion,
  getExpertAnswers,
}))(ExpertPanelQuestionEdit)
