import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {compose} from "redux";
import {withUnAuthRedirect} from "../../hoc/withUnAuthRedirect";
import {connect} from "react-redux";
import {testSelectors} from "../../redux/selectors/testSelectors";
import {Redirect, withRouter} from "react-router";
import {Preloader} from "../common/Preloader";
import {getTest, nextQuestion} from "../../redux/testReducer";
import Typography from "@material-ui/core/Typography";
import TestForm from "./TestForm/TestForm";
import TestProgress from "./TestProgress/TestProgress";
import TestInfo from "./TestInfo/TestInfo";
import {getTimer} from "../../utils/utils";
import ImageBox from "../common/UIElements";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(5),
    },
    question: {
        marginTop: theme.spacing(1),
    },
    title: {
        textAlign: 'center',
        marginBottom: theme.spacing(3),
    }
}));

const Test = React.memo(({testInfo, question, answers, match, getTest, nextQuestion}) => {
    const classes = useStyles();
    const [showPreloader, setShowPreloader] = React.useState(true);
    const [testFinished, setTestFinished] = React.useState(false);
    const [timer, setTimer] = React.useState('0');

    const test_id = match.params.test_id;

    useEffect(() => {
        (async () => {
            setShowPreloader(true);
            await getTest(test_id);
            setShowPreloader(false);
        })();
    }, [getTest, test_id]);

    useEffect(() => {
        let interval = null;
        const delay = timer === '0' ? null : 1000;
        if (testInfo) {
            interval = setInterval(() => {
                setTimer(getTimer(testInfo.date_finish));
            }, delay);
            if ((new Date()) >= (new Date(testInfo.date_finish))) {
                setTestFinished(true);
            }
        }
        return () => clearInterval(interval);
    }, [timer, testInfo]);

    const onSubmit = async ({answer}) => {
        if (Array.isArray(answer)) {
            answer = {...answer};
        }
        //const isLastQuestion = question.number_question === testInfo.count_of_questions;
        await nextQuestion(testInfo.test_id, answer);
    }

    if (question === undefined || (testFinished && testInfo)) return <Redirect
        to={`/test/${testInfo.test_id}/result`}/>;

    if (showPreloader) return <Preloader/>;

    return (
        <Container component="main" maxWidth="md" className={classes.root}>
            <Typography component='h1' variant='h5' className={classes.title}>
                Тест
            </Typography>
            <TestInfo subcategory_name={testInfo.subcategory_name} category_name={testInfo.category_name}
                      timer={timer}/>
            <TestProgress number_question={question.number_question} count_of_questions={testInfo.count_of_questions}/>
            <Typography className={classes.question} variant='h6'>
                {question.text}
            </Typography>
            {question.image && <ImageBox imageSrc={question.image}/>}
            <TestForm onSubmit={onSubmit} data={answers} type={question.type}/>
        </Container>
    );
});

const mapStateToProps = (state) => ({
    testInfo: testSelectors.getTestInfo(state),
    question: testSelectors.getQuestion(state),
    answers: testSelectors.getAnswers(state),
})

export default compose(withUnAuthRedirect, withRouter, connect(mapStateToProps, {getTest, nextQuestion}))(Test);