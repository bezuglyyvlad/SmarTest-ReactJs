import { memo, useState, useEffect } from 'react';
import {makeStyles} from '@mui/styles';
import {compose} from "redux";
import List from "@mui/material/List";
import TestCategoriesListItem from "./TestCategoriesListItem/TestCategoriesListItem";
import {getTestCategories} from "../../../redux/testCategoriesReducer";
import {connect} from "react-redux";
import {testCategoriesSelectors} from "../../../redux/selectors/testCategoriesSelectors";
import {ListCreator} from "../../common/UIElements";
import {Preloader} from "../../common/Preloader";
import Typography from "@mui/material/Typography";
import {getDoublePaginationsUrlParams} from "../../../utils/utils";
import Paper from "@mui/material/Paper";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(1),
        marginTop: theme.spacing(2)
    }
}));

const TestCategories = memo(({
                                       getTestCategories,
                                       testCategories,
                                       pagination,
                                       test_category_page,
                                       expert_test_page,
                                       test_category_id,
                                       locationPathname,
                                       locationSearch
                                   }) => {
    const classes = useStyles();
    const [dense, setDense] = useState(false);
    const [showPreloader, setShowPreloader] = useState(true);

    useEffect(() => {
        let mounted = true; // exclude memory leak
        (async () => {
            setShowPreloader(true);
            await getTestCategories(test_category_id, test_category_page);
            mounted && setShowPreloader(false);
        })();
        return () => mounted = false;
    }, [test_category_page, getTestCategories, test_category_id]);

    if (showPreloader) {
        return <Preloader/>
    }

    const {mainPath, linkPageName} = getDoublePaginationsUrlParams(
        'test_category_page',
        expert_test_page,
        'expert_test_page',
        locationPathname,
        locationSearch
    );

    return (
        <Paper className={classes.paper}>
            {
                testCategories.length !== 0 &&
                <>
                    <Typography variant="h5" align='left' component='h2'>
                        {test_category_id ? 'Підкатегорії' : 'Категорії'}
                    </Typography>
                    <ListCreator pagination={pagination} dense={dense} setDense={setDense} mainPath={mainPath}
                                 linkPageName={linkPageName}>
                        <List dense={dense}>
                            {
                                testCategories.map(value => (
                                    <TestCategoriesListItem key={value.id} value={value}/>))
                            }
                        </List>
                    </ListCreator>
                </>
            }
        </Paper>
    );
});

const mapStateToProps = (state) => ({
    testCategories: testCategoriesSelectors.getTestCategories(state),
    pagination: testCategoriesSelectors.getPagination(state),
});

export default compose(connect(mapStateToProps, {getTestCategories}))(TestCategories);