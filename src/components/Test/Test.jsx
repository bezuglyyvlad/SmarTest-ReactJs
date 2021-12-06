import { memo, useState, useEffect, useRef, useCallback } from 'react'
import { compose } from 'redux'
import { withUnAuthRedirect } from '../../hoc/withUnAuthRedirect'
import { connect } from 'react-redux'
import { testSelectors } from '../../redux/selectors/testSelectors'
import { Redirect, withRouter } from 'react-router'
import { Preloader } from '../common/Preloader'
import { getTest, nextQuestion, setTestIsFinished } from '../../redux/testReducer'
import TestForm from './TestForm/TestForm'
import TestInfo from './TestInfo/TestInfo'
import { getTimer } from '../../utils/utils'
import ImageBox from '../common/UIElements'
import { Container, makeStyles, Paper, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2)
  },
  question: {
    marginTop: theme.spacing(1),
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1, 1, 0),
  }
}))

const Test = memo(({
                     testInfo,
                     question,
                     answers,
                     match,
                     getTest,
                     nextQuestion,
                     setTestIsFinished,
                     testIsFinished
                   }) => {
  const classes = useStyles()
  const [showPreloader, setShowPreloader] = useState(true)
  const [timer, setTimer] = useState()
  const isMounted = useRef(true)
  const onSubmit = useCallback(async ({ answer }, setSubmitting, resetForm, formIsMounted) => {
    setSubmitting(true)
    answer = Array.isArray(answer) ? answer.map(Number) : [Number(answer)]
    await nextQuestion(testInfo.id, answer)
    formIsMounted.current && resetForm()
    formIsMounted.current && setSubmitting(false)
  }, [nextQuestion, testInfo])

  const test_id = match.params.test_id

  // exclude memory leak
  useEffect(() => {
    return () => {
      isMounted.current = false;
    }
  }, []);

  useEffect(() => {
    (async () => {
      setShowPreloader(true)
      await getTest(test_id)
      isMounted.current && setShowPreloader(false)
    })()
  }, [getTest, test_id])

  // set up initial timer time
  useEffect(() => {
    if (testInfo) {
      const initialTimer = getTimer(testInfo.finish_date);
      isMounted.current && setTimer(initialTimer)
    }
  }, [testInfo])

  // timer tick
  useEffect(() => {
    let timerInterval = null
    let testIsFinishedInterval = null

    if (timer !== undefined) {
      timerInterval = setInterval(() => {
        isMounted.current && setTimer(timer => timer - 1000)
      }, 1000)

      if (timer <= 1000) {
        testIsFinishedInterval = setInterval(() => {
          isMounted.current && setTestIsFinished(true)
        }, 100)
      }
    }

    return () => {
      clearInterval(timerInterval)
      clearInterval(testIsFinishedInterval)
    }
  }, [setTestIsFinished, timer])

  if (showPreloader) return <Preloader />

  if (testIsFinished) return <Redirect to={`/test/${testInfo.id}/result`} />

  return (
    <Container component='main' maxWidth='lg' className={classes.root}>
      <Typography component='h1' variant='h5' className={classes.title}>
        Тест
      </Typography>
      <Paper className={classes.paper}>
        <TestInfo expert_test_name={testInfo.expert_test.title}
                  test_category_name={testInfo.test_category.title}
                  timer={timer} />
        <Typography component='h2' className={classes.question} variant='h6'>
          {`${question.serial_number}. ${question.question.text}`}
        </Typography>
        {
          question.question &&
          question.question.image &&
          <ImageBox imageSrc={question.question.image} />
        }
        <TestForm onSubmit={onSubmit} answers={answers} type={question.question.type} />
      </Paper>
    </Container>
  )
})

const mapStateToProps = (state) => ({
  testInfo: testSelectors.getTestInfo(state),
  question: testSelectors.getQuestion(state),
  answers: testSelectors.getAnswers(state),
  testIsFinished: testSelectors.getTestIsFinished(state),
})

export default compose(
  withUnAuthRedirect,
  withRouter,
  connect(mapStateToProps, { getTest, nextQuestion, setTestIsFinished })
)(Test)
