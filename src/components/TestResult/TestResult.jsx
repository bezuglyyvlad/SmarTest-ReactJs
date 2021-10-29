import {memo, useState, useEffect} from 'react';
import {makeStyles} from '@mui/styles';
import Container from '@mui/material/Container';
import {compose} from "redux";
import {withUnAuthRedirect} from "../../hoc/withUnAuthRedirect";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {Preloader} from "../common/Preloader";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import {NavLink} from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {getTestResult} from "../../redux/testResultReducer";
import {testResultSelectors} from "../../redux/selectors/testResultSelectors";
import Question from "./Question/Question";
import {TableContainer} from "@mui/material";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(5),
    },
    title: {
        margin: theme.spacing(2, 0),
    },
    table: {
        marginBottom: theme.spacing(5),
    },
}));

const TestResult = memo(({
                             match,
                             getTestResult,
                             test,
                             questions,
                             answers,
                             count_of_right_answers,
                             basicPoints,
                             correctionCoef
                         }) => {
    const classes = useStyles();
    const [showPreloader, setShowPreloader] = useState(true);

    const test_id = match.params.test_id;

    useEffect(() => {
        let mounted = true; // exclude memory leak
        (async () => {
            setShowPreloader(true);
            await getTestResult(test_id);
            mounted && setShowPreloader(false);
        })();
        return () => mounted = false;
    }, [getTestResult, test_id]);

    if (showPreloader) return <Preloader/>;

    const rows = [
        {title: 'Назва', value: test.expert_test.title},
        {title: 'Категорія', value: test.expert_test.test_category.title},
        {title: 'Початок тесту', value: (new Date(test.start_date)).toLocaleString()},
        {title: 'Завершення тесту', value: (new Date(test.finish_date)).toLocaleString()},
        // {title: 'Співвідношення складності питань (легкі/середні/складні)', value: complexity},
        {title: 'Правильних відповідей', value: count_of_right_answers},
        {title: 'Балів', value: test.score},
    ];

    return (
        <Container component="main" maxWidth="lg" className={classes.root}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" component={NavLink} to='/statistics'>
                    Статистика
                </Link>
                <Typography color="textPrimary">{test.expert_test.title}</Typography>
            </Breadcrumbs>
            <Typography component="h1" variant="h5" align='center' className={classes.title}>
                Результат тесту {test.expert_test.active_record === 0 && '(тест був видалений)'}
            </Typography>
            <TableContainer>
                <Table aria-label="simple table" className={classes.table}>
                    <TableBody>
                        {rows.map((row, key) => (
                            <TableRow key={key}>
                                <TableCell component="th" scope="row">{row.title}</TableCell>
                                <TableCell align="right">{row.value}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {questions.map(q => (
                <Question key={q.id}
                          q={q}
                          answers={answers[q.question.id]}
                          points={basicPoints}
                          correctionCoef={correctionCoef}/>
            ))}
        </Container>
    );
});

const mapStateToProps = (state) => ({
    test: testResultSelectors.getTest(state),
    questions: testResultSelectors.getQuestions(state),
    answers: testResultSelectors.getAnswers(state),
    basicPoints: testResultSelectors.getBasicPoints(state),
    correctionCoef: testResultSelectors.getCorrectionCoef(state),
    count_of_right_answers: testResultSelectors.getCountOfCorrectAnswers(state)
})

export default compose(withUnAuthRedirect, withRouter, connect(mapStateToProps, {getTestResult}))(TestResult);