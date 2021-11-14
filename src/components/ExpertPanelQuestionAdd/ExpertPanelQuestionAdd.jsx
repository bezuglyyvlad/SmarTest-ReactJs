import { memo, useState, useEffect } from 'react'
import { Box, Breadcrumbs, Container, Link, makeStyles, Typography } from "@material-ui/core"
import { compose } from "redux"
import { withUnAuthRedirect } from "../../hoc/withUnAuthRedirect"
import { connect } from "react-redux"
import { Preloader } from "../common/Preloader"
import { withNotExpertRedirect } from "../../hoc/withNotExpertRedirect"
import { NavLink, Redirect } from "react-router-dom"
import { withRouter } from "react-router"
import { testCategorySelectors } from "../../redux/selectors/testCategorySelectors"
import { expertTestSelectors } from "../../redux/selectors/expertTestSelectors"
import { getTestCategory } from "../../redux/testCategoryReducer"
import { getExpertTest } from "../../redux/expertTestReducer"
import ExpertPanelAnswerAddTable from "./ExpertPanelAnswerAddTable/ExpertPanelAnswerAddTable"
import { addQuestion } from "../../redux/expertPanelQuestionsReducer"
import ExpertQuestionForm from "../common/ExpertQuestionForm/ExpertQuestionForm"
import { uploadImageQuestionValidate } from "../../utils/validators"
import { getFormData } from "../../utils/utils"
import { UploadBox } from "../common/UIElements"
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

const ExpertPanelQuestionAdd = memo(({
                                       match, getTestCategory, getExpertTest,
                                       testCategoryName, expertTestName, addQuestion
                                     }) => {
  const classes = useStyles()
  const [showPreloader, setShowPreloader] = useState(true)
  const [answers, setAnswers] = useState([])
  const [image, setImage] = useState('')
  const { enqueueSnackbar } = useSnackbar()
  const [added, setAdded] = useState(false)

  const test_category_id = match.params.test_category_id
  const expert_test_id = match.params.expert_test_id

  useEffect(() => {
    let mounted = true; // exclude memory leak
    (async () => {
      setShowPreloader(true)
      await getTestCategory(test_category_id)
      await getExpertTest(expert_test_id)
      mounted && setShowPreloader(false)
    })()
    return () => mounted = false
  }, [test_category_id, getTestCategory, getExpertTest, expert_test_id])

  if (showPreloader) {
    return <Preloader />
  }

  if (added) {
    return <Redirect to={`/expertPanel/${test_category_id}/${expert_test_id}`} />
  }

  function showError (array) {
    array.forEach(item => {
      enqueueSnackbar(item, { variant: "error" })
    })
  }

  const onSubmit = (data) => {
    let errors = []
    answers.length < 2 && errors.push('Кількість відповідей не може бути менше 2.')
    answers.filter(i => i.is_right === '1').length === 0 && errors.push('Хоча б одна відповідь повинна бути вірною.')
    if (errors.length !== 0) {
      showError(errors)
    } else {
      answers.map(i => (delete i.tableData))
      const dataObject = { ...data, image, expert_test_id, answers }
      const formData = new FormData()
      getFormData(formData, dataObject)
      addQuestion(formData)
      setAdded(true)
    }
  }

  const onUploadChange = (e) => {
    const files = e.target.files
    if (files.length && uploadImageQuestionValidate(files[0], showError)) {
      setImage(files[0])
    }
  }

  return (
    <Container component="main" maxWidth="lg" className={classes.root}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" component={NavLink} to='/expertPanel'>
          Expert панель
        </Link>
        <Link color="inherit" component={NavLink} to={`/expertPanel/${expert_test_id}`}>
          {testCategoryName}
        </Link>
        <Link color="inherit" component={NavLink} to={`/expertPanel/${test_category_id}/${expert_test_id}`}>
          {expertTestName}
        </Link>
        <Typography color="textPrimary">Створення питання</Typography>
      </Breadcrumbs>
      <Container component='main'>
        <UploadBox onUploadChange={onUploadChange} image={image} setImage={setImage} />
        <ExpertQuestionForm onSubmit={onSubmit} initialValues={{ lvl: 1, type: 1 }} />
        <Box className={classes.table}>
          <ExpertPanelAnswerAddTable answers={answers} setAnswers={setAnswers} />
        </Box>
      </Container>
    </Container>
  )
})

const mapStateToProps = (state) => ({
  categoryName: testCategorySelectors.getName(state),
  subcategoryName: expertTestSelectors.getName(state),
})

export default compose(withUnAuthRedirect, withNotExpertRedirect, withRouter, connect(mapStateToProps, {
  getTestCategory,
  getExpertTest,
  addQuestion
}))(ExpertPanelQuestionAdd)
