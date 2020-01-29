import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {compose} from "redux";
import {withUnAuthRedirect} from "../../hoc/withUnAuthRedirect";
import {withErrorHandling} from "../../hoc/withErrorHandling";

const useStyles = makeStyles(theme => ({
    root: {
        fontSize: '50px',
        textAlign: 'center'
    },
}));

const Statistics = React.memo(({signIn, isAuth}) => {

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs" className={classes.root}>
            Statistics
        </Container>
    );
});

export default compose(withUnAuthRedirect, withErrorHandling)(Statistics);