import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {reduxForm} from "redux-form";
import {FormHelperText} from "@material-ui/core";
import {
    EmailField, PasswordFirld, SubmitButton, UsernameField,
} from "../../common/FormElements";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ProfileForm = React.memo(({handleSubmit, pristine, submitting, error, ...props}) => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        setOpen(!submitting && !props.submitFailed && props.submitSucceeded);
    }, [submitting, props.submitFailed, props.submitSucceeded])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <>
            <form className={classes.form} onSubmit={handleSubmit}>
                <UsernameField/>
                <EmailField/>
                <PasswordFirld/>
                {error && <FormHelperText error={!!error}>{error}</FormHelperText>}
                <SubmitButton textButton='Изменить' disabled={pristine || submitting}/>
            </form>

            {open && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Профиль успешно обновлен!
                </Alert>
            </Snackbar>}
        </>
    )
})

export default reduxForm({
    form: 'profile',
})(ProfileForm);