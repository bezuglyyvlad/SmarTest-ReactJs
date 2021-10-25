import { memo } from 'react';
import {makeStyles} from '@mui/styles';
import Container from '@mui/material/Container';
import {compose} from "redux";
import {withUnAuthRedirect} from "../../hoc/withUnAuthRedirect";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ProfileForm from "./ProfileForm/ProfileForm";
import {userSelectors} from "../../redux/selectors/userSelectors";
import {connect} from "react-redux";
import {getAvatarName} from "../../utils/utils";
import Grid from "@mui/material/Grid";
import {deleteUser, updateUser} from "../../redux/userReducer";
import DeleteAccount from "./DeleteAccount/DeleteAccount";
import Box from "@mui/material/Box";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        fontSize: '80px',
        width: theme.spacing(25),
        height: theme.spacing(25),
    },
    deleteAccount: {
        marginTop: theme.spacing(15),
        marginBottom: theme.spacing(5),
    }
}));

const Profile = memo(({userId, name, email, updateUser, deleteUser}) => {

    const classes = useStyles();

    const onSubmit = ({name, email, password, password_confirmation}) => {
        updateUser(userId, name, email, password, password_confirmation);
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box className={classes.paper}>
                <Avatar className={classes.avatar}>
                    {getAvatarName(name)}
                </Avatar>
                <Typography component="h1" variant="h5">
                    Профіль
                </Typography>
                <ProfileForm onSubmit={onSubmit} initialValues={{name, email}}/>
                <Grid container className={classes.deleteAccount} justifyContent='center'>
                    <Grid item>
                        <DeleteAccount deleteUser={deleteUser} userId={userId}/>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
});

const mapStateToProps = (state) => ({
    userId: userSelectors.getUserId(state),
    name: userSelectors.getName(state),
    email: userSelectors.getEmail(state),
})

export default compose(withUnAuthRedirect, connect(mapStateToProps, {updateUser, deleteUser}))(Profile);