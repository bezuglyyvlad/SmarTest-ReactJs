import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {connect} from "react-redux";
import SignUpForm from "./SignUpForm/SignUpForm";
import {signUp} from "../../redux/userReducer";

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

const SignUp = React.memo(({signUp}) => {
    const classes = useStyles();

    const onSubmit = ({username, email, password}) => {
        signUp(username, email, password);
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Регистрация
                </Typography>
                <SignUpForm onSubmit={onSubmit}/>
            </div>
        </Container>
    );
})

export default compose(
    connect(null, {signUp}),
    withAuthRedirect)(SignUp);