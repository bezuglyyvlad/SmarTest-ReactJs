import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {compose} from "redux";
import {withUnAuthRedirect} from "../../hoc/withUnAuthRedirect";
import List from "@material-ui/core/List";
import CategoriesListItem from "./CategoriesListItem/CategoriesListItem";
import {withRouter} from "react-router";
import queryString from 'query-string'
import {getCategories} from "../../redux/categoriesReducer";
import {connect} from "react-redux";
import {categoriesSelectors} from "../../redux/selectors/categoriesSelectors";
import {ListCreator} from "../common/UIElements";
import {Preloader} from "../common/Preloader";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(5),
    },
    title: {
        margin: theme.spacing(2, 0),
    },
}));

const Categories = React.memo(({location, getCategories, categories, pagination}) => {
    const classes = useStyles();
    const [dense, setDense] = React.useState(false);
    const [showPreloader, setShowPreloader] = React.useState(true);

    const page = +queryString.parse(location.search).page || 1;

    useEffect(() => {
        (async () => {
            setShowPreloader(true);
            await getCategories(page);
            setShowPreloader(false);
        })();
    }, [page, getCategories]);

    if (showPreloader) {
        return <Preloader/>
    }

    return (
        <Container component="main" maxWidth="md" className={classes.root}>
            {categories.length === 0 ?
                <Typography variant="h5" align='center' className={classes.title} component='h1'>
                    <p>Категорії на жаль відсутні</p>
                </Typography> :
                <>
                    <Typography variant="h5" align='center' className={classes.title} component='h1'>
                        Категорії
                    </Typography>
                    <ListCreator pagination={pagination} dense={dense} setDense={setDense} mainPath='/category'>
                        <List dense={dense}>
                            {categories.map(value => (
                                <CategoriesListItem key={value.category_id} value={value}/>))}
                        </List>
                    </ListCreator>
                </>
            }
        </Container>
    );
});

const mapStateToProps = (state) => ({
    categories: categoriesSelectors.getCategories(state),
    pagination: categoriesSelectors.getPagination(state),
});

export default compose(withUnAuthRedirect, withRouter, connect(mapStateToProps, {getCategories}))(Categories);