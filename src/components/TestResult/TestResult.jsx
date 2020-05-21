import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {compose} from "redux";
import {withUnAuthRedirect} from "../../hoc/withUnAuthRedirect";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {Preloader} from "../common/Preloader";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import {NavLink} from "react-router-dom";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {getTestResult} from "../../redux/testResultReducer";
import {testResultSelectors} from "../../redux/selectors/testResultSelectors";
import Question from "./Question/Question";
import {TableContainer} from "@material-ui/core";

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

const TestResult = React.memo(({match, getTestResult, test, questions, answers, complexity}) => {
    const classes = useStyles();
    const [showPreloader, setShowPreloader] = React.useState(true);

    const test_id = match.params.test_id;

    useEffect(() => {
        (async () => {
            setShowPreloader(true);
            await getTestResult(test_id);
            setShowPreloader(false);
        })();
    }, [getTestResult, test_id]);

    if (showPreloader) return <Preloader/>;

    const points = 100 / test.count_of_questions;

    const rows = [
        {title: 'Назва', value: test.subcategory_name},
        {title: 'Категорія', value: test.category_name},
        {title: 'Початок тесту', value: (new Date(test.date_start)).toLocaleString()},
        {title: 'Завершення тесту', value: (new Date(test.date_finish)).toLocaleString()},
        {title: 'Співвідношення складності питань (легкі/середні/складні)', value: complexity},
        {title: 'Правильних відповідей', value: `${test.count_of_right_answers} з ${test.count_of_questions}`},
        {title: 'Балів', value: test.score},
    ];

    return (
        <Container component="main" maxWidth="md" className={classes.root}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" component={NavLink} to='/statistics'>
                    Статистика
                </Link>
                <Typography color="textPrimary">{test.subcategory_name}</Typography>
            </Breadcrumbs>
            <Typography component="h1" variant="h5" align='center' className={classes.title}>
                Результат тесту {!test.subcategory_id && '(тест був видалений)'}
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
                <Question key={q.test_question_id} q={q} answers={answers[q.test_question_id]} points={points}/>
            ))}
        </Container>
    );
});

const mapStateToProps = (state) => ({
    test: testResultSelectors.getTest(state),
    questions: testResultSelectors.getQuestions(state),
    answers: testResultSelectors.getAnswers(state),
    complexity: testResultSelectors.getComplexity(state),
})

export default compose(withUnAuthRedirect, withRouter, connect(mapStateToProps, {getTestResult}))(TestResult);