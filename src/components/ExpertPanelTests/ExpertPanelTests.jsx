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
import {getTestCategory} from "../../redux/testCategoryReducer";
import {testCategorySelectors} from "../../redux/selectors/testCategorySelectors";
import ExpertTestsTable from "./ExpertPanelTestsTable/ExpertPanelTestsTable";
import {getExpertPanelTests} from "../../redux/expertPanelTestsReducer";
import {useSnackbar} from "notistack";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(2),
    },
    table: {
        marginTop: theme.spacing(2),
    },
}));

const ExpertPanelTests = React.memo(({history, match, getCategory, categoryName, getExpertTests}) => {
    const classes = useStyles();
    const [showPreloader, setShowPreloader] = React.useState(true);
    const {enqueueSnackbar} = useSnackbar();

    const category_id = match.params.category_id;

    useEffect(() => {
        let mounted = true; // exclude memory leak
        (async () => {
            setShowPreloader(true);
            await getCategory(category_id);
            await getExpertTests(category_id);
            mounted && setShowPreloader(false);
        })();
        return () => mounted = false;
    }, [category_id, getCategory, getExpertTests]);

    if (showPreloader) {
        return <Preloader/>
    }

    function showError(array) {
        array.forEach(item => {
            enqueueSnackbar(item, {variant: "error"})
        });
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
                <ExpertTestsTable rowClick={rowClick} showError={showError} category_id={category_id}
                                  history={history}/>
            </Box>
        </Container>
    );
});

const mapStateToProps = (state) => ({
    categoryName: testCategorySelectors.getName(state),
});

export default compose(withUnAuthRedirect, withNotExpertRedirect, withRouter, connect(mapStateToProps, {
    getTestCategory,
    getExpertPanelTests
}))(ExpertPanelTests);