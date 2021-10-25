import { memo } from 'react';
import {makeStyles} from '@mui/styles';
import Container from '@mui/material/Container';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
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

const SignUp = memo(({signUp}) => {
    const classes = useStyles();

    const onSubmit = ({name, email, password, password_confirmation}) => {
        signUp(name, email, password, password_confirmation);
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Реєстрація
                </Typography>
                <SignUpForm onSubmit={onSubmit}/>
            </div>
        </Container>
    );
})

export default compose(
    connect(null, {signUp}),
    withAuthRedirect)(SignUp);