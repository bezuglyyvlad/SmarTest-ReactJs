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
import {getTestCategory} from "../../redux/testCategoryReducer";
import {testCategorySelectors} from "../../redux/selectors/testCategorySelectors";
import {getExpertTest} from "../../redux/expertTestReducer";
import {expertTestSelectors} from "../../redux/selectors/expertTestSelectors";
import {exportQuestions, getExpertQuestions} from "../../redux/expertPanelQuestionsReducer";
import Box from "@material-ui/core/Box";
import ExpertQuestionsTable from "./ExpertPanelQuestionsTable/ExpertPanelQuestionsTable";
import {useSnackbar} from "notistack";
import {expertPanelQuestionsSelectors} from "../../redux/selectors/expertPanelQuestionsSelectors";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(2),
    },
    table: {
        marginTop: theme.spacing(2),
    },
}));

const ExpertPanelQuestions = React.memo(({
                                        match, getCategory, getSubcategory, categoryName, subcategoryName,
                                        getExpertQuestions, history, exportQuestions, serverErrors
                                    }) => {
    const classes = useStyles();
    const [showPreloader, setShowPreloader] = React.useState(true);
    const [disableExport, setDisableExport] = React.useState(false);
    const {enqueueSnackbar} = useSnackbar();

    const category_id = match.params.category_id;
    const subcategory_id = match.params.subcategory_id;

    useEffect(() => {
        let mounted = true; // exclude memory leak
        (async () => {
            setShowPreloader(true);
            await getCategory(category_id);
            await getSubcategory(subcategory_id);
            await getExpertQuestions(subcategory_id);
            mounted && setShowPreloader(false);
        })();
        return () => mounted = false;
    }, [category_id, getCategory, getExpertQuestions, getSubcategory, subcategory_id]);

    useEffect(() => {
        serverErrors && showError(serverErrors);
    })

    if (showPreloader) {
        return <Preloader/>
    }

    function showError(array) {
        array.forEach(item => {
            enqueueSnackbar(item, {variant: "error"})
        });
    }

    async function exportQuestionsAction() {
        setDisableExport(true);
        await exportQuestions(subcategory_id, categoryName, subcategoryName);
        setDisableExport(false);
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
                                      showError={showError} exportQuestionsAction={exportQuestionsAction}
                                      disableExport={disableExport}/>
            </Box>
        </Container>
    );
});

const mapStateToProps = (state) => ({
    categoryName: testCategorySelectors.getName(state),
    subcategoryName: expertTestSelectors.getName(state),
    serverErrors: expertPanelQuestionsSelectors.getServerErrors(state)
});

export default compose(withUnAuthRedirect, withNotExpertRedirect, withRouter, connect(mapStateToProps, {
    getTestCategory,
    getExpertTest,
    getExpertQuestions,
    exportQuestions
}))(ExpertPanelQuestions);