import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {compose} from "redux";
import {Redirect} from "react-router";
import {connect} from "react-redux";
import {ListCreator} from "../../common/UIElements";
import List from "@material-ui/core/List";
import ExpertTestsListItem from "./ExpertTestsListItem/ExpertTestsListItem";
import Typography from "@material-ui/core/Typography";
import {Preloader} from "../../common/Preloader";
import {createTest, getExpertTests} from "../../../redux/expertTestsReducer";
import {expertTestsSelectors} from "../../../redux/selectors/expertTestsSelectors";
import {getDoublePaginationsUrlParams} from "../../../utils/utils";

const useStyles = makeStyles(theme => ({
    title: {
        margin: theme.spacing(2, 0),
    },
}));

const ExpertTests = React.memo(({
                                    getExpertTests, expert_test_page, test_category_page, test_category_id, expertTests,
                                    pagination, createTest, testCreatedId, locationPathname, locationSearch
                                }) => {
    const classes = useStyles();
    const [dense, setDense] = React.useState(false);
    const [showPreloader, setShowPreloader] = React.useState(true);

    useEffect(() => {
        let mounted = true; // exclude memory leak
        (async () => {
            setShowPreloader(true);
            await getExpertTests(test_category_id, expert_test_page);
            mounted && setShowPreloader(false);
        })();
        return () => mounted = false;
    }, [expert_test_page, getExpertTests, test_category_id]);

    const startTest = (expert_test_id) => {
        console.log('start test ' + expert_test_id)
        // setShowPreloader(true);
        // createTest(expert_test_id);
    };

    if (showPreloader) return <Preloader/>;

    if (testCreatedId) return <Redirect to={`/test/${testCreatedId}`}/>;

    const {mainPath, linkPageName} = getDoublePaginationsUrlParams(
        'expert_test_page',
        test_category_page,
        'test_category_page',
        locationPathname,
        locationSearch
    );

    return (
        <>
            <Typography variant="h5" align='left' className={classes.title} component='h2'>
                {'Тести'} {
                expertTests.length === 0 &&
                <p>(на жаль в даній категорії немає тестів)</p>
            }
            </Typography>
            {
                expertTests.length !== 0 &&
                <ListCreator pagination={pagination} dense={dense} setDense={setDense}
                             mainPath={mainPath}
                             linkPageName={linkPageName}>
                    <List dense={dense}>
                        {
                            expertTests.map(value => (
                                <ExpertTestsListItem key={value.id} value={value} startTest={startTest}/>))
                        }
                    </List>
                </ListCreator>
            }
        </>
    );
});

const mapStateToProps = (state) => ({
    expertTests: expertTestsSelectors.getExpertTests(state),
    pagination: expertTestsSelectors.getPagination(state),
    testCreatedId: expertTestsSelectors.getTestCreatedId(state),
});

export default compose(connect(mapStateToProps, {
    getExpertTests,
    createTest,
}))(ExpertTests);