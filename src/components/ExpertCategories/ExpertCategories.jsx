import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {compose} from "redux";
import {withUnAuthRedirect} from "../../hoc/withUnAuthRedirect";
import Typography from "@material-ui/core/Typography";
import {connect} from "react-redux";
import {Preloader} from "../common/Preloader";
import {withNotExpertRedirect} from "../../hoc/withNotExpertRedirect";
import List from "@material-ui/core/List";
import {ListCreator} from "../common/UIElements";
import ExpertCategoriesListItem from "./ExpertCategoriesListItem/ExpertCategoriesListItem";
import {getExpertCategories} from "../../redux/expertCategoriesReducer";
import {expertCategoriesSelectors} from "../../redux/selectors/expertCategoriesSelectors";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(5),
    },
    title: {
        margin: theme.spacing(2, 0),
    },
}));

const ExpertCategories = React.memo(({categories, getExpertCategories}) => {
    const classes = useStyles();
    const [showPreloader, setShowPreloader] = React.useState(true);
    const [dense, setDense] = React.useState(false);

    useEffect(() => {
        (async () => {
            setShowPreloader(true);
            await getExpertCategories();
            setShowPreloader(false);
        })();
    }, [getExpertCategories]);

    if (showPreloader) {
        return <Preloader/>
    }

    return (
        <Container component="main" maxWidth="md" className={classes.root}>
            <Typography component="h1" variant="h5" align='center' className={classes.title}>
                Expert панель {categories.length === 0 && '(на жаль категорій немає)'}
            </Typography>
            {categories.length !== 0 &&
            <ListCreator dense={dense} setDense={setDense}>
                <List dense={dense}>
                    {categories.map(value => (
                        <ExpertCategoriesListItem key={value.category_id} value={value}/>))}
                </List>
            </ListCreator>}
        </Container>
    );
});

const mapStateToProps = (state) => ({
    categories: expertCategoriesSelectors.getCategories(state),
})

export default compose(withUnAuthRedirect, withNotExpertRedirect,
    connect(mapStateToProps, {getExpertCategories}))(ExpertCategories);