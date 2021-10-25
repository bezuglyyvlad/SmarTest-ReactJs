import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {compose} from "redux";
import List from "@material-ui/core/List";
import TestCategoriesListItem from "./TestCategoriesListItem/TestCategoriesListItem";
import {getTestCategories} from "../../../redux/testCategoriesReducer";
import {connect} from "react-redux";
import {testCategoriesSelectors} from "../../../redux/selectors/testCategoriesSelectors";
import {ListCreator} from "../../common/UIElements";
import {Preloader} from "../../common/Preloader";
import Typography from "@material-ui/core/Typography";
import {getDoublePaginationsUrlParams} from "../../../utils/utils";

const useStyles = makeStyles(theme => ({
    title: {
        margin: theme.spacing(2, 0),
    },
}));

const TestCategories = React.memo(({
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
    const [dense, setDense] = React.useState(false);
    const [showPreloader, setShowPreloader] = React.useState(true);

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
        <>
            {
                testCategories.length !== 0 &&
                <>
                    <Typography variant="h5" align='left' className={classes.title} component='h2'>
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
        </>
    );
});

const mapStateToProps = (state) => ({
    testCategories: testCategoriesSelectors.getTestCategories(state),
    pagination: testCategoriesSelectors.getPagination(state),
});

export default compose(connect(mapStateToProps, {getTestCategories}))(TestCategories);