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
import {NavLink} from "react-router-dom";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import {withRouter} from "react-router";
import {categorySelectors} from "../../redux/selectors/categorySelectors";
import {subcategorySelectors} from "../../redux/selectors/subcategorySelectors";
import {getCategory} from "../../redux/categoryReducer";
import {getSubcategory} from "../../redux/subcategoryReducer";
import ExpertQuestionForm from "../common/ExpertQuestionForm/ExpertQuestionForm";
import Box from "@material-ui/core/Box";
import {editQuestion, getExpertAnswers, getExpertQuestion} from "../../redux/expertQuestionEditReducer";
import {expertQuestionEditSelectors} from "../../redux/selectors/expertQuestionEditSelectors";
import ExpertAnswersTable from "./ExpertAnswersTable/ExpertAnswersTable";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(5),
    },
    table: {
        margin: theme.spacing(2, 0),
    },
}));

const ExpertQuestionEdit = React.memo(({
                                           match, getCategory, getSubcategory,
                                           categoryName, subcategoryName, getExpertQuestion, question, editQuestion,
                                           getExpertAnswers
                                       }) => {
    const classes = useStyles();
    const [showPreloader, setShowPreloader] = React.useState(true);
    const [errors, setErrors] = React.useState([]);
    const [open, setOpen] = React.useState(false);

    const category_id = match.params.category_id;
    const subcategory_id = match.params.subcategory_id;
    const question_id = match.params.question_id;

    useEffect(() => {
        (async () => {
            setShowPreloader(true);
            await getCategory(category_id);
            await getSubcategory(subcategory_id);
            await getExpertQuestion(question_id);
            await getExpertAnswers(question_id);
            setShowPreloader(false);
        })();
    }, [category_id, getCategory, getExpertAnswers, getExpertQuestion, getSubcategory, question_id, subcategory_id]);

    if (showPreloader) {
        return <Preloader/>
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
        editQuestion(data);
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
                <Typography color="textPrimary">Редагування питання</Typography>
            </Breadcrumbs>
            <Container component='main'>
                <ExpertQuestionForm onSubmit={onSubmit}
                                    initialValues={{
                                        text: question.text,
                                        description: question.description,
                                        lvl: question.lvl,
                                        type: question.type
                                    }}/>
                <Box className={classes.table}>
                    <ExpertAnswersTable showError={showError} question_id={question_id}/>
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
    question: expertQuestionEditSelectors.getQuestion(state),
});

export default compose(withUnAuthRedirect, withNotExpertRedirect, withRouter, connect(mapStateToProps, {
    getCategory,
    getSubcategory,
    getExpertQuestion,
    editQuestion,
    getExpertAnswers
}))(ExpertQuestionEdit);