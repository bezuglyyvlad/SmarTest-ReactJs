import { memo } from 'react';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {makeStyles} from '@mui/styles';
import Container from '@mui/material/Container';
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

const SignIn = memo(({signIn}) => {

    const classes = useStyles();

    const onSubmit = ({email, password}) => {
        signIn(email, password);
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Вхід
                </Typography>
                <SignInForm onSubmit={onSubmit}/>
            </div>
        </Container>
    );
});

export default compose(
    connect(null, {signIn}),
    withAuthRedirect)(SignIn);