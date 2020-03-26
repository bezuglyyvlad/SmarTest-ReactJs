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

const TestResult = React.memo(({match, getTestResult, test, questions}) => {
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
        {title: 'Название', value: test.subcategory_name},
        {title: 'Категория', value: test.category_name},
        {title: 'Начало теста', value: (new Date(test.date_start)).toLocaleString()},
        {title: 'Завершение теста', value: (new Date(test.date_finish)).toLocaleString()},
        {title: 'Правильных ответов', value: `${test.count_of_right_answers} из ${test.count_of_questions}`},
        {title: 'Результат', value: test.score},
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
                Результат теста {!test.subcategory_id && '(тест был удален)'}
            </Typography>
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
            {questions.map(q => (
                <Question key={q.test_question_id} q={q} points={points}/>
            ))}
        </Container>
    );
});

const mapStateToProps = (state) => ({
    test: testResultSelectors.getTest(state),
    questions: testResultSelectors.getQuestions(state),
})

export default compose(withUnAuthRedirect, withRouter, connect(mapStateToProps, {getTestResult}))(TestResult);