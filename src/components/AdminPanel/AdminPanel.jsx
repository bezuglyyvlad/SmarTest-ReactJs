import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {compose} from "redux";
import {withUnAuthRedirect} from "../../hoc/withUnAuthRedirect";
import Typography from "@material-ui/core/Typography";
import {connect} from "react-redux";
import {withNotAdminRedirect} from "../../hoc/withNotAdminRedirect";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(5),
    },
}));

const AdminPanel = React.memo(() => {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="md" className={classes.root}>
            <Typography component="h1" variant="h5" align='center'>
                Admin Panel
            </Typography>
        </Container>
    );
});

// const mapStateToProps = (state) => ({
//     perPage: appSelectors.getPerPage(state),
//     ratingInfo: statisticsSelectors.getRating(state),
//     tests: statisticsSelectors.getTests(state),
//     pagination: statisticsSelectors.getPagination(state),
// })

export default compose(withUnAuthRedirect, withNotAdminRedirect, connect(null, {}))(AdminPanel);