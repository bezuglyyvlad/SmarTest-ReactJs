import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {compose} from "redux";
import {withUnAuthRedirect} from "../../hoc/withUnAuthRedirect";
import Typography from "@material-ui/core/Typography";
import {connect} from "react-redux";
import {Preloader} from "../common/Preloader";
import {withNotExpertRedirect} from "../../hoc/withNotExpertRedirect";
import Link from "@material-ui/core/Link";
import {NavLink, Redirect} from "react-router-dom";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import {withRouter} from "react-router";
import {categorySelectors} from "../../redux/selectors/categorySelectors";
import {subcategorySelectors} from "../../redux/selectors/subcategorySelectors";
import {getCategory} from "../../redux/categoryReducer";
import {getSubcategory} from "../../redux/subcategoryReducer";
import QuestionAddForm from "./QuestionAddForm/QuestionAddForm";
import Box from "@material-ui/core/Box";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import ExpertQuestionAddTable from "./ExpertQuestionAddTable/ExpertQuestionAddTable";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(5),
    },
    table: {
        margin: theme.spacing(2, 0),
    },
}));

const ExpertQuestionAdd = React.memo(({
                                          match, getCategory, getSubcategory,
                                          categoryName, subcategoryName, getExpertQuestions, history
                                      }) => {
    const classes = useStyles();
    const [showPreloader, setShowPreloader] = React.useState(true);
    const [answers, setAnswers] = React.useState([
        {text: "answers1", is_right: 0},
        {text: "answers2", is_right: 1},
    ]);
    const [errors, setErrors] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [added, setAdded] = React.useState(false);

    const category_id = match.params.category_id;
    const subcategory_id = match.params.subcategory_id;

    useEffect(() => {
        (async () => {
            setShowPreloader(true);
            await getCategory(category_id);
            await getSubcategory(subcategory_id);
            setShowPreloader(false);
        })();
    }, [category_id, getCategory, getExpertQuestions, getSubcategory, subcategory_id]);

    if (showPreloader) {
        return <Preloader/>
    }

    if (added) {
        return <Redirect to={`/expertPanel/${category_id}/${subcategory_id}`}/>
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    function showError(array) {
        setErrors(array);
        setOpen(true);
    }

    const onSubmit = (data) => {
        let errors = [];
        answers.length < 2 && errors.push('Кількість відповідей не може бути менше 2.');
        answers.filter(i => i.is_right === 1).length === 0 && errors.push('Хоча б одна відповідь повинна бути вірною.');
        if (errors.length !== 0) {
            showError(errors);
        } else {
            console.log({...data, subcategory_id, answers});
            setAdded(true);
        }
    }

    return (
        <Container component="main" maxWidth="md" className={classes.root}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" component={NavLink} to='/expertPanel'>
                    Expert панель
                </Link>
                <Link color="inherit" component={NavLink} to={`/expertPanel/${category_id}`}>
                    {categoryName}
                </Link>
                <Link color="inherit" component={NavLink} to={`/expertPanel/${category_id}/${subcategory_id}`}>
                    {subcategoryName}
                </Link>
                <Typography color="textPrimary">Створення питання</Typography>
            </Breadcrumbs>
            <Container component='main'>
                <QuestionAddForm onSubmit={onSubmit} initialValues={{lvl: 1, type: 1}}/>
                <Box className={classes.table}>
                    <ExpertQuestionAddTable answers={answers} setAnswers={setAnswers}/>
                </Box>
            </Container>
            {open && errors &&
            errors.map((e, key) => (
                <Snackbar key={key} open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        {e}
                    </Alert>
                </Snackbar>
            ))}
        </Container>
    );
});

const mapStateToProps = (state) => ({
    categoryName: categorySelectors.getName(state),
    subcategoryName: subcategorySelectors.getName(state),
});

export default compose(withUnAuthRedirect, withNotExpertRedirect, withRouter, connect(mapStateToProps, {
    getCategory,
    getSubcategory,
}))(ExpertQuestionAdd);