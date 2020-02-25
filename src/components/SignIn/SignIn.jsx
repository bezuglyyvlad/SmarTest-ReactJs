import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SignInForm from "./SignInForm/SignInForm";
import {connect} from "react-redux";
import {signIn} from "../../redux/userReducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
}));

const SignIn = React.memo(({signIn}) => {

    const classes = useStyles();

    const onSubmit = ({email, password}) => {
        signIn(email, password);
    }

    return (
        <Container component="main" maxWidth="xs">
            {/*<CssBaseline/>*/}
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Вход
                </Typography>
                <SignInForm onSubmit={onSubmit}/>
            </div>
        </Container>
    );
});

export default compose(
    connect(null, {signIn}),
    withAuthRedirect)(SignIn);