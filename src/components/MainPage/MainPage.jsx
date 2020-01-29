import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {withErrorHandling} from "../../hoc/withErrorHandling";
import {compose} from "redux";

const useStyles = makeStyles(theme => ({
    root: {
        fontSize: '50px',
        textAlign: 'center'
    },
}));

const MainPage = React.memo(({signIn, isAuth}) => {

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs" className={classes.root}>
            Main Page
        </Container>
    );
});

export default compose(withErrorHandling)(MainPage);