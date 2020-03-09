import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {compose} from "redux";
import {withUnAuthRedirect} from "../../hoc/withUnAuthRedirect";
import {withRouter} from "react-router";
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

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
        marginTop: theme.spacing(5),
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
}));

const Subcategories = React.memo(({
                                      getSubcategories, match, location, subcategories,
                                      pagination, getCategory, categoryName
                                  }) => {
    const classes = useStyles();
    const [dense, setDense] = React.useState(false);
    const [showPreloader, setShowPreloader] = React.useState(true);

    const page = +queryString.parse(location.search).page || 1;
    const category_id = match.params.category_id;

    useEffect(() => {
        (async () => {
            setShowPreloader(true);
            await getCategory(category_id);
            await getSubcategories(category_id, page);
            setShowPreloader(false);
        })();
    }, [category_id, page, getSubcategories, getCategory]);

    if (showPreloader) {
        return <Preloader/>
    }

    return (
        <Container component="main" className={classes.root}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" component={NavLink} to='/category'>
                    Категории
                </Link>
                <Typography color="textPrimary">{categoryName}</Typography>
            </Breadcrumbs>
            <Typography variant="h5" align='center' className={classes.title}>
                {categoryName} {subcategories.length === 0 &&
            <p><strong>(к сожалению в данной категории нет тестов)</strong></p>}
            </Typography>
            {subcategories.length !== 0 && <ListCreator pagination={pagination} dense={dense} setDense={setDense}
                                                        mainPath={'/category/' + category_id}>
                <List dense={dense}>
                    {subcategories.map(value => (
                        <SubcategoriesListItem key={value.subcategory_id} value={value}/>))}
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
}))(Subcategories);