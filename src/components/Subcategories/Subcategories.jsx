import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {compose} from "redux";
import {withUnAuthRedirect} from "../../hoc/withUnAuthRedirect";
import {Redirect, withRouter} from "react-router";
import {connect} from "react-redux";
import {ListCreator} from "../common/UIElements";
import List from "@material-ui/core/List";
import SubcategoriesListItem from "./SubcategoriesListItem/SubcategoriesListItem";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import {NavLink} from "react-router-dom";
import {Preloader} from "../common/Preloader";
import {getSubcategories} from "../../redux/subcategoriesReducer";
import queryString from 'query-string'
import {subcategoriesSelectors} from "../../redux/selectors/subcategoriesSelectors";
import {getCategory} from "../../redux/categoryReducer";
import {categorySelectors} from "../../redux/selectors/categorySelectors";
import {createTest} from "../../redux/testReducer";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(5),
    },
    title: {
        margin: theme.spacing(2, 0),
    },
}));

const Subcategories = React.memo(({
                                      getSubcategories, match, location, subcategories,
                                      pagination, getCategory, categoryName, createTest
                                  }) => {
    const classes = useStyles();
    const [dense, setDense] = React.useState(false);
    const [showPreloader, setShowPreloader] = React.useState(true);
    const [testCreatedId, setTestCreated] = React.useState(false);

    const page = +queryString.parse(location.search).page || 1;
    const category_id = match.params.category_id;

    useEffect(() => {
        let mounted = true; // exclude memory leak
        (async () => {
            setShowPreloader(true);
            await getCategory(category_id);
            await getSubcategories(category_id, page);
            mounted && setShowPreloader(false);
        })();
        return () => mounted = false;
    }, [category_id, page, getSubcategories, getCategory]);

    const startTest = async (subcategory_id) => {
        setShowPreloader(true);
        const test_id = await createTest(subcategory_id);
        setTestCreated(test_id);
    };

    if (testCreatedId) return <Redirect to={`/test/${testCreatedId}`}/>;

    if (showPreloader) return <Preloader/>;

    return (
        <Container component="main" maxWidth="md" className={classes.root}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" component={NavLink} to='/category'>
                    Категорії
                </Link>
                <Typography color="textPrimary">{categoryName}</Typography>
            </Breadcrumbs>
            <Typography variant="h5" align='center' className={classes.title} component='h1'>
                {categoryName} {subcategories.length === 0 &&
            <p>(на жаль в даній категорії немає тестів)</p>}
            </Typography>
            {subcategories.length !== 0 && <ListCreator pagination={pagination} dense={dense} setDense={setDense}
                                                        mainPath={'/category/' + category_id}>
                <List dense={dense}>
                    {subcategories.map(value => (
                        <SubcategoriesListItem key={value.subcategory_id} value={value} startTest={startTest}/>))}
                </List>
            </ListCreator>}
        </Container>
    );
});

const mapStateToProps = (state) => ({
    subcategories: subcategoriesSelectors.getSubcategories(state),
    pagination: subcategoriesSelectors.getPagination(state),
    categoryName: categorySelectors.getName(state),
});

export default compose(withUnAuthRedirect, withRouter, connect(mapStateToProps, {
    getSubcategories,
    getCategory,
    createTest,
}))(Subcategories);