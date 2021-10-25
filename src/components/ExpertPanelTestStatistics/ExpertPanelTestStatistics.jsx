import { memo, useState, useEffect } from 'react';
import {makeStyles} from '@mui/styles';
import Container from '@mui/material/Container';
import {compose} from "redux";
import {withUnAuthRedirect} from "../../hoc/withUnAuthRedirect";
import Typography from "@mui/material/Typography";
import {connect} from "react-redux";
import {Preloader} from "../common/Preloader";
import {withNotExpertRedirect} from "../../hoc/withNotExpertRedirect";
import Link from "@mui/material/Link";
import {NavLink} from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import {withRouter} from "react-router";
import {getTestCategory} from "../../redux/testCategoryReducer";
import {testCategorySelectors} from "../../redux/selectors/testCategorySelectors";
import {expertTestSelectors} from "../../redux/selectors/expertTestSelectors";
import {getExpertTest} from "../../redux/expertTestReducer";
import {getExpertTestStatistics} from "../../redux/expertPanelTestStatisticsReducer";
import Box from "@mui/material/Box";
import ExpertTestStatisticsTable from "./ExpertPanelTestStatisticsTable/ExpertPanelTestStatisticsTable";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(2),
    },
    table: {
        marginTop: theme.spacing(2),
    },
}));

const ExpertPanelTestStatistics = memo(({match, getCategory, getSubcategory,
                                             categoryName, subcategoryName, getExpertTestStatistics}) => {
    const classes = useStyles();
    const [showPreloader, setShowPreloader] = useState(true);

    const category_id = match.params.category_id;
    const subcategory_id = match.params.subcategory_id;

    useEffect(() => {
        let mounted = true; // exclude memory leak
        (async () => {
            setShowPreloader(true);
            await getCategory(category_id);
            await getSubcategory(subcategory_id);
            await getExpertTestStatistics(subcategory_id);
            mounted && setShowPreloader(false);
        })();
        return () => mounted = false;
    }, [category_id, getCategory, getExpertTestStatistics, getSubcategory, subcategory_id]);

    if (showPreloader) {
        return <Preloader/>
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
                <Typography color="textPrimary">Статистика</Typography>
            </Breadcrumbs>
            <Box className={classes.table}>
                <ExpertTestStatisticsTable/>
            </Box>
        </Container>
    );
});

const mapStateToProps = (state) => ({
    categoryName: testCategorySelectors.getName(state),
    subcategoryName: expertTestSelectors.getName(state),
});

export default compose(withUnAuthRedirect, withNotExpertRedirect, withRouter, connect(mapStateToProps, {
    getTestCategory,
    getExpertTest,
    getExpertTestStatistics
}))(ExpertPanelTestStatistics);