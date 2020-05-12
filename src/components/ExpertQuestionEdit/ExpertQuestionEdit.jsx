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
import {categorySelectors} from "../../redux/selectors/categorySelectors";
import {subcategorySelectors} from "../../redux/selectors/subcategorySelectors";
import {getCategory} from "../../redux/categoryReducer";
import {getSubcategory} from "../../redux/subcategoryReducer";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(5),
    },
    table: {
        margin: theme.spacing(2, 0),
    },
}));

const ExpertQuestionEdit = React.memo(({match, getCategory, getSubcategory,
                                        categoryName, subcategoryName, getExpertQuestions, history}) => {
    const classes = useStyles();
    const [showPreloader, setShowPreloader] = React.useState(true);

    const category_id = match.params.category_id;
    const subcategory_id = match.params.subcategory_id;

    useEffect(() => {
        (async () => {
            setShowPreloader(true);
            await getCategory(category_id);
            await getSubcategory(subcategory_id);
            // await getExpertQuestions(subcategory_id);
            setShowPreloader(false);
        })();
    }, [category_id, getCategory, getExpertQuestions, getSubcategory, subcategory_id]);

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
                <Typography color="textPrimary">Редагування питання</Typography>
            </Breadcrumbs>
            {/*<Box className={classes.table}>*/}
            {/*    <ExpertQuestionsTable history={history} category_id={category_id} subcategory_id={subcategory_id}/>*/}
            {/*</Box>*/}
        </Container>
    );
});

const mapStateToProps = (state) => ({
    categoryName: categorySelectors.getName(state),
    subcategoryName: subcategorySelectors.getName(state),
});

export default compose(withUnAuthRedirect, withNotExpertRedirect, withRouter, connect(mapStateToProps, {
    getCategory,
    getSubcategory,
    // getExpertQuestions
}))(ExpertQuestionEdit);