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
import Box from "@material-ui/core/Box";
import {getCategory} from "../../redux/categoryReducer";
import {categorySelectors} from "../../redux/selectors/categorySelectors";
import ExpertTestsTable from "./ExpertTestsTable/ExpertTestsTable";
import {getExpertTests} from "../../redux/expertTestsReducer";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(5),
    },
    title: {
        margin: theme.spacing(2, 0),
    },
    table: {
        margin: theme.spacing(2, 0),
    },
}));

const ExpertTests = React.memo(({history, match, getCategory, categoryName, getExpertTests}) => {
    const classes = useStyles();
    const [showPreloader, setShowPreloader] = React.useState(true);
    const [errors, setErrors] = React.useState([]);
    const [open, setOpen] = React.useState(false);

    const category_id = match.params.category_id;

    useEffect(() => {
        (async () => {
            setShowPreloader(true);
            await getCategory(category_id);
            await getExpertTests(category_id);
            setShowPreloader(false);
        })();
    }, [category_id, getCategory, getExpertTests]);

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

    const rowClick = (event, rowData) => {
        history.push(`/expertPanel/${category_id}/${rowData.subcategory_id}`);
    }

    return (
        <Container component="main" maxWidth="md" className={classes.root}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" component={NavLink} to='/expertPanel'>
                    Expert панель
                </Link>
                <Typography color="textPrimary">{categoryName}</Typography>
            </Breadcrumbs>
            <Box className={classes.table}>
                <ExpertTestsTable rowClick={rowClick} showError={showError} category_id={category_id}/>
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
});

export default compose(withUnAuthRedirect, withNotExpertRedirect, withRouter, connect(mapStateToProps, {getCategory, getExpertTests}))(ExpertTests);