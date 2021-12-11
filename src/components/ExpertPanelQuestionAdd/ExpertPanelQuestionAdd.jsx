import React, { memo, useState, useEffect, useRef } from 'react'
import { Box, Container, Link, makeStyles, Typography } from "@material-ui/core"
import { compose } from "redux"
import { withUnAuthRedirect } from "../../hoc/withUnAuthRedirect"
import { connect } from "react-redux"
import { Preloader } from "../common/Preloader"
import { withNotExpertRedirect } from "../../hoc/withNotExpertRedirect"
import { NavLink, Redirect } from "react-router-dom"
import { withRouter } from "react-router"
import ExpertPanelAnswerAddTable from "./ExpertPanelAnswerAddTable/ExpertPanelAnswerAddTable"
import { addQuestion } from "../../redux/expertPanelQuestionsReducer"
import ExpertQuestionForm from "../common/ExpertQuestionForm/ExpertQuestionForm"
import { answerValidation, uploadImageQuestionValidate } from "../../utils/validators"
import { getFormData, validationErrorHandler } from "../../utils/utils"
import { UploadBox } from "../common/UIElements"
import { useSnackbar } from "notistack"
import { expertPanelBreadcrumbsSelectors } from "../../redux/selectors/expertPanelBreadcrumbsSelectors";
import { getExpertPanelBreadcrumbs } from "../../redux/expertPanelBreadcrumbsReducer";
import ExpertPanelTestCategoryBreadcrumbs from "../common/ExpertPanel/ExpertPanelTestCategoryBreadcrumbs";

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
                                       match,
                                       breadcrumbs,
                                       expertTestName,
                                       getExpertPanelBreadcrumbs,
                                       addQuestion
                                     }) => {
  const classes = useStyles()
  const [showPreloader, setShowPreloader] = useState(true)
  const [answers, setAnswers] = useState([])
  const [image, setImage] = useState('')
  const { enqueueSnackbar } = useSnackbar()
  const [added, setAdded] = useState(false)
  const isMounted = useRef(true)

  const test_category_id = match.params.test_category_id
  const expert_test_id = match.params.expert_test_id

  // exclude memory leak
  useEffect(() => {
    return () => {
      isMounted.current = false;
    }
  }, []);

  useEffect(() => {
    (async () => {
      setShowPreloader(true)
      await getExpertPanelBreadcrumbs(test_category_id, expert_test_id)
      isMounted.current && setShowPreloader(false)
    })()
  }, [test_category_id, expert_test_id, getExpertPanelBreadcrumbs])

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

  const onSubmit = async (formikData, setSubmitting, resetForm, formIsMounted) => {
    let errors = []
    errors = answerValidation(answers, errors)
    if (errors.length !== 0) {
      showError(errors)
    } else {
      answers.map(i => (delete i.tableData))
      const dataObject = { ...formikData, image, expert_test_id, answers }
      const formData = new FormData()
      getFormData(formData, dataObject)
      setSubmitting(true)
      await addQuestion(formData)
        .then(() => {
          formIsMounted.current && resetForm({ values: formikData })
          isMounted.current && setAdded(true)
        })
        .catch((e) => {
          formIsMounted.current && setSubmitting(false)
          const errors = validationErrorHandler(e)
          showError(errors)
        })
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
      {
        breadcrumbs &&
        <ExpertPanelTestCategoryBreadcrumbs breadcrumbs={breadcrumbs}>
          <Link color='inherit' component={NavLink}
                to={`/expertPanel/${test_category_id}/${expert_test_id}`}>
            {expertTestName}
          </Link>
          <Typography color="textPrimary">Створення питання</Typography>
        </ExpertPanelTestCategoryBreadcrumbs>
      }
      <Container component='main'>
        <UploadBox onUploadChange={onUploadChange} image={image} setImage={setImage} />
        <ExpertQuestionForm onSubmit={onSubmit} />
        <Box className={classes.table}>
          <ExpertPanelAnswerAddTable answers={answers} setAnswers={setAnswers} />
        </Box>
      </Container>
    </Container>
  )
})

const mapStateToProps = (state) => ({
  breadcrumbs: expertPanelBreadcrumbsSelectors.getBreadcrumbs(state),
  expertTestName: expertPanelBreadcrumbsSelectors.getExpertTestName(state),
})

export default compose(withUnAuthRedirect, withNotExpertRedirect, withRouter, connect(mapStateToProps, {
  getExpertPanelBreadcrumbs,
  addQuestion
}))(ExpertPanelQuestionAdd)
