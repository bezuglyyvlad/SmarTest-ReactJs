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
import {getCategory} from "../../redux/categoryReducer";
import {categorySelectors} from "../../redux/selectors/categorySelectors";
import {getSubcategory} from "../../redux/subcategoryReducer";
import {subcategorySelectors} from "../../redux/selectors/subcategorySelectors";
import {exportQuestions, getExpertQuestions} from "../../redux/expertQuestionsReducer";
import Box from "@material-ui/core/Box";
import ExpertQuestionsTable from "./ExpertQuestionsTable/ExpertQuestionsTable";
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

const ExpertQuestions = React.memo(({
                                        match, getCategory, getSubcategory,
                                        categoryName, subcategoryName, getExpertQuestions, history, exportQuestions
                                    }) => {
    const classes = useStyles();
    const [showPreloader, setShowPreloader] = React.useState(true);
    const [errors, setErrors] = React.useState([]);
    const [open, setOpen] = React.useState(false);

    const category_id = match.params.category_id;
    const subcategory_id = match.params.subcategory_id;

    useEffect(() => {
        (async () => {
            setShowPreloader(true);
            await getCategory(category_id);
            await getSubcategory(subcategory_id);
            await getExpertQuestions(subcategory_id);
            setShowPreloader(false);
        })();
    }, [category_id, getCategory, getExpertQuestions, getSubcategory, subcategory_id]);

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

    function exportQuestionsAction() {
        exportQuestions(subcategory_id, categoryName, subcategoryName);
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
                <Typography color="textPrimary">{subcategoryName}</Typography>
            </Breadcrumbs>
            <Box className={classes.table}>
                <ExpertQuestionsTable history={history} category_id={category_id} subcategory_id={subcategory_id}
                                      showError={showError} exportQuestionsAction={exportQuestionsAction}/>
            </Box>
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
    getExpertQuestions,
    exportQuestions
}))(ExpertQuestions);