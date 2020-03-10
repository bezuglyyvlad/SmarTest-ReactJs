import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {compose} from "redux";
import {withUnAuthRedirect} from "../../hoc/withUnAuthRedirect";
import {connect} from "react-redux";
import {testSelectors} from "../../redux/selectors/testSelectors";
import {withRouter} from "react-router";
import {Preloader} from "../common/Preloader";
import {getTest} from "../../redux/testReducer";
import Typography from "@material-ui/core/Typography";
import TestForm from "./TestForm/TestForm";
import TestProgress from "./TestProgress/TestProgress";
import TestInfo from "./TestInfo/TestInfo";
import {getTimer} from "../../utils/utils";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(5),
    },
    question: {
        fontSize: '20px',
        marginTop: theme.spacing(1),
    },
    title: {
        textAlign: 'center',
        marginBottom: theme.spacing(3),
    }
}));

const Test = React.memo(({testInfo, question, answers, match, getTest}) => {
    const classes = useStyles();
    const [showPreloader, setShowPreloader] = React.useState(true);
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
        if (testInfo) {
            interval = setInterval(() => {
                setTimer(getTimer(testInfo.date_finish));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer, testInfo]);

    if (showPreloader) return <Preloader/>;

    const onSubmit = (answer) => {
        console.log(answer);
    }

    return (
        <Container component="main" maxWidth="md" className={classes.root}>
            <Typography component='h1' variant='h5' className={classes.title}>
                Тест
            </Typography>
            <TestInfo subcategory_name={testInfo.subcategory_name} category_name={testInfo.category_name}
                      timer={timer}/>
            <TestProgress number_question={question.number_question} count_of_question={testInfo.count_of_question}/>
            <Typography className={classes.question}>
                {question.text}
            </Typography>
            <TestForm onSubmit={onSubmit} data={answers} type={question.type}/>
        </Container>
    );
});

const mapStateToProps = (state) => ({
    testInfo: testSelectors.getTestInfo(state),
    question: testSelectors.getQuestion(state),
    answers: testSelectors.getAnswers(state),
})

export default compose(withUnAuthRedirect, withRouter, connect(mapStateToProps, {getTest}))(Test);