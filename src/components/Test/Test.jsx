import {memo, useState, useEffect} from 'react';
import {makeStyles} from '@mui/styles';
import Container from '@mui/material/Container';
import {compose} from "redux";
import {withUnAuthRedirect} from "../../hoc/withUnAuthRedirect";
import {connect} from "react-redux";
import {testSelectors} from "../../redux/selectors/testSelectors";
import {Redirect, withRouter} from "react-router";
import {Preloader} from "../common/Preloader";
import {getTest, nextQuestion, setTestIsFinished} from "../../redux/testReducer";
import Typography from "@mui/material/Typography";
import TestForm from "./TestForm/TestForm";
import TestInfo from "./TestInfo/TestInfo";
import {getTimer} from "../../utils/utils";
import ImageBox from "../common/UIElements";
import Paper from "@mui/material/Paper";

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
}));

const Test = memo(({testInfo, question, answers, match, getTest, nextQuestion, setTestIsFinished, testIsFinished}) => {
    const classes = useStyles();
    const [showPreloader, setShowPreloader] = useState(true);
    const [timer, setTimer] = useState('0');

    const test_id = match.params.test_id;

    useEffect(() => {
        let mounted = true; // exclude memory leak
        (async () => {
            setShowPreloader(true);
            await getTest(test_id);
            mounted && setShowPreloader(false);
        })();
        return () => mounted = false;
    }, [getTest, test_id]);

    useEffect(() => {
        let interval = null;
        const delay = timer === '0' ? null : 1000; //for delete begin delay
        if (testInfo) {
            interval = setInterval(() => {
                setTimer(getTimer(testInfo.finish_date));
            }, delay);
            if ((new Date()) >= (new Date(testInfo.finish_date))) {
                setTestIsFinished(true);
            }
        }
        return () => clearInterval(interval);
    }, [timer, testInfo, setTestIsFinished]);

    const onSubmit = async ({answer}) => {
        //swap array [0: '', ..., 85(answer_id): true]; to array [85]
        if (Array.isArray(answer)) {
            const answerObject = {...answer};
            answer = Object.keys(
                Object.fromEntries(Object.entries(answerObject).filter(([key, val]) => val === true))
            ).map(key => parseInt(key))
        } else {
            answer = [parseInt(answer)];
        }
        setShowPreloader(true);
        await nextQuestion(testInfo.id, answer);
        setShowPreloader(false);
    }

    if (testIsFinished) return <Redirect
        to={`/test/${testInfo.id}/result`}/>;

    if (showPreloader) return <Preloader/>;

    return (
        <Container component="main" maxWidth="lg" className={classes.root}>
            <Typography component='h1' variant='h5' className={classes.title}>
                Тест
            </Typography>
            <Paper className={classes.paper}>
                <TestInfo expert_test_name={testInfo.expert_test.title}
                          test_category_name={testInfo.expert_test.test_category.title}
                          timer={timer}/>
                <Typography component='h2' className={classes.question} variant='h6'>
                    {`${question.serial_number}. ${question.question.text}`}
                </Typography>
                {question.image && <ImageBox imageSrc={question.question.image}/>}
                <TestForm onSubmit={onSubmit} answers={answers} type={question.question.type}/>
            </Paper>
        </Container>
    );
});

const mapStateToProps = (state) => ({
    testInfo: testSelectors.getTestInfo(state),
    question: testSelectors.getQuestion(state),
    answers: testSelectors.getAnswers(state),
    testIsFinished: testSelectors.getTestIsFinished(state),
})

export default compose(
    withUnAuthRedirect,
    withRouter,
    connect(mapStateToProps, {getTest, nextQuestion, setTestIsFinished})
)(Test);