import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

const useStyles = makeStyles(theme => ({
    root: {
        fontSize: '50px',
        textAlign: 'center'
    },
}));

const SignUp = React.memo(({login, isAuth}) => {

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs" className={classes.root}>
            Sign Up
        </Container>
    );
});

export default compose(withAuthRedirect)(SignUp);