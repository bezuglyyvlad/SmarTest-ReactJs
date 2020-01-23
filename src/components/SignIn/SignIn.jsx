import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SignInForm from "./SignInForm/SignInForm";
import {Redirect} from "react-router";
import {connect} from "react-redux";
import {login} from "../../redux/userReducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {getIsAuth} from "../../redux/selectors/userSelectors";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignIn = React.memo(({login, isAuth}) => {

    const classes = useStyles();

    const onSubmit = ({email, password}) => {
        login(email, password);
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <SignInForm onSubmit={onSubmit}/>
            </div>
        </Container>
    );
});

const mapStateToProps = (state) => ({
    isAuth: getIsAuth(state),
})

export default compose(
    connect(mapStateToProps, {login}),
    withAuthRedirect)(SignIn);