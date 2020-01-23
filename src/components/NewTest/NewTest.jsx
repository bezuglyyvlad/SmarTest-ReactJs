import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {compose} from "redux";
import {withUnAuthRedirect} from "../../hoc/withUnAuthRedirect";

const useStyles = makeStyles(theme => ({
    root: {
        fontSize: '50px',
        textAlign: 'center'
    },
}));

const NewTest = React.memo(({login, isAuth}) => {

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs" className={classes.root}>
            New Test
        </Container>
    );
});

export default compose(withUnAuthRedirect)(NewTest);